import { CommentOutlined, DeleteOutlined } from '@ant-design/icons'
import { Button, Modal, Popconfirm, Space, Tabs, Select, message } from 'antd'
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import styles from './index.module.less'
import { chatStore, configStore, userStore } from '@/store'
//import RoleNetwork from './components/RoleNetwork'
//import RoleLocal from './components/RoleLocal'
import AllInput from './components/AllInput'
import ChatMessage from './components/ChatMessage'
import { RequestChatOptions } from '@/types'
import { postChatCompletions } from '@/request/api'
import Reminder from '@/components/Reminder'
import { filterObjectNull, formatTime, generateUUID, handleChatData } from '@/utils'
import { useScroll } from '@/hooks/useScroll'
import useDocumentResize from '@/hooks/useDocumentResize'
import Layout from '@/components/Layout'
import { postImagesGenerations } from '@/request/api'

function ChatPage() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const { scrollToBottomIfAtBottom, scrollToBottom } = useScroll(scrollRef.current)
  const { token, setLoginModal } = userStore()
  const { config, models, changeConfig, setConfigModal } = configStore()
  useEffect(() => {
    // 当models数组有数据且config.model为空或不在models中时，设置默认值
    if (models.length > 0 && (!config.model || !models.some(m => m.value === config.model))) {
      changeConfig({
        ...config,
        model: models[0].value
      });
    }
  }, [models, config, changeConfig]);
  const {
    chats,
    addChat,
    delChat,
    clearChats,
    selectChatId,
    changeSelectChatId,
    setChatInfo,
    setChatDataInfo,
    clearChatMessage,
    delChatMessage
  } = chatStore()

  const bodyResize = useDocumentResize()

  // 角色预设
  //const [roleConfigModal, setRoleConfigModal] = useState({
  //open: false
  //})

  useLayoutEffect(() => {
    if (scrollRef) {
      scrollToBottom()
    }
  }, [scrollRef.current, selectChatId, chats])

  // 当前聊天记录
  const chatMessages = useMemo(() => {
    const chatList = chats.filter((c) => c.id === selectChatId)
    if (chatList.length <= 0) {
      return []
    }
    return chatList[0].data
  }, [selectChatId, chats])

  // 创建对话按钮
  const CreateChat = () => {
    return (
      <Button
        block
        type="dashed"
        style={{
          marginBottom: 6,
          marginLeft: 0,
          marginRight: 0
        }}
        onClick={() => {
          // if (!token) {
          //   setLoginOptions({
          //     open: true
          //   })
          //   return
          // }
          addChat()
        }}
      >
        新建对话
      </Button>
    )
  }

  // 对接服务端方法
  async function serverChatCompletions({
    requestOptions,
    signal,
    userMessageId,
    assistantMessageId
  }: {
    userMessageId: string
    signal: AbortSignal
    requestOptions: RequestChatOptions
    assistantMessageId: string
  }) {
    const response = await postChatCompletions(requestOptions, {
      options: {
        signal
      }
    })
      .then((res) => {
        return res
      })
      .catch((error) => {
        // 终止： AbortError
        console.log(error.name)
      })

    if (!(response instanceof Response)) {
      // 这里返回是错误 ...
      setChatDataInfo(selectChatId, userMessageId, {
        status: 'error'
      })
      setChatDataInfo(selectChatId, assistantMessageId, {
        status: 'error',
        text: `\`\`\`json
${JSON.stringify(response, null, 4)}
\`\`\`
`
      })
      fetchController?.abort()
      setFetchController(null)
      message.error('请求失败')
      return
    }
    const reader = response.body?.getReader?.()
    let allContent = ''
    while (true) {
      const { done, value } = (await reader?.read()) || {}
      if (done) {
        fetchController?.abort()
        setFetchController(null)
        break
      }
      // 将获取到的数据片段显示在屏幕上
      const text = new TextDecoder('utf-8').decode(value)
      const texts = handleChatData(text)
      for (let i = 0; i < texts.length; i++) {
        const { dateTime, role, content, segment } = texts[i]
        allContent += content ? content : ''
        if (segment === 'stop') {
          setFetchController(null)
          setChatDataInfo(selectChatId, userMessageId, {
            status: 'pass'
          })
          setChatDataInfo(selectChatId, assistantMessageId, {
            text: allContent,
            dateTime,
            status: 'pass'
          })
          break
        }

        if (segment === 'start') {
          setChatDataInfo(selectChatId, userMessageId, {
            status: 'pass'
          })
          setChatDataInfo(selectChatId, assistantMessageId, {
            text: allContent,
            dateTime,
            status: 'loading',
            role,
            requestOptions
          })
        }
        if (segment === 'text') {
          setChatDataInfo(selectChatId, assistantMessageId, {
            text: allContent,
            dateTime,
            status: 'pass'
          })
        }
      }
      scrollToBottomIfAtBottom()
    }
  }

  const [fetchController, setFetchController] = useState<AbortController | null>(null)

  // 对话
  async function sendChatCompletions(vaule: string) {
    if (!token) {
      setLoginModal(true)
      return
    }
    const parentMessageId = chats.filter((c) => c.id === selectChatId)[0].id
    const userMessageId = generateUUID()
    const requestOptions = {
      prompt: vaule,
      parentMessageId,
      options: filterObjectNull({
        ...config
      })
    }
    setChatInfo(selectChatId, {
      id: userMessageId,
      text: vaule,
      dateTime: formatTime(),
      status: 'pass',
      role: 'user',
      requestOptions
    })
    const assistantMessageId = generateUUID()
    setChatInfo(selectChatId, {
      id: assistantMessageId,
      text: '',
      dateTime: formatTime(),
      status: 'loading',
      role: 'assistant',
      requestOptions
    })
    const controller = new AbortController()
    const signal = controller.signal
    setFetchController(controller)
    if (config.model === 'dall-e-3') {
      // 调用绘画API
      postImagesGenerations(requestOptions, {}, { timeout: 0 })
        .then((res) => {
          // 处理绘画API的响应
          if (res.code === 0 && res.data && res.data.length > 0) {
            const imageUrl = res.data[0].url; // 假设返回的是一个包含URL的数组
            setChatDataInfo(selectChatId, userMessageId, { status: 'pass' });
            setChatDataInfo(selectChatId, assistantMessageId, {
              text: `<img src="${imageUrl}" alt="Generated Image" style="height: 40vh;" />`, // 将图片嵌入到对话框中，高度为视窗的40%
              dateTime: formatTime(),
              status: 'pass',

            });
          } else {
            // 处理错误或空响应
            setChatDataInfo(selectChatId, assistantMessageId, {
              text: '绘画失败或未返回图片',
              dateTime: formatTime(),
              status: 'error',

            });
          }
        })
        .finally(() => {
          setFetchController(null);
        });
    } else {
      // 调用标准聊天API
      serverChatCompletions({
        requestOptions,
        signal,
        userMessageId,
        assistantMessageId
      });
    }
  }

  return (
    <div className={styles.chatPage}>
      <Layout
        menuExtraRender={() => <CreateChat />}
        route={{
          path: '/',
          routes: chats
        }}
        menuDataRender={(item) => {
          return item
        }}
        menuItemRender={(item, dom) => {
          const className =
            item.id === selectChatId
              ? `${styles.menuItem} ${styles.menuItem_action}`
              : styles.menuItem
          return (
            <div className={className}>
              <span className={styles.menuItem_icon}>
                <CommentOutlined />
              </span>
              <span className={styles.menuItem_name}>{item.name}</span>
              <div className={styles.menuItem_options}>
                <Popconfirm
                  title="删除会话"
                  description="是否确定删除会话？"
                  onConfirm={() => {
                    delChat(item.id)
                  }}
                  onCancel={() => {
                    // ==== 无操作 ====
                  }}
                  okText="是"
                  cancelText="否"
                >
                  <DeleteOutlined />
                </Popconfirm>
              </div>
            </div>
          )
        }}
        menuFooterRender={(props) => {
          //   if (props?.collapsed) return undefined;
          return (
            <Space direction="vertical" style={{ width: '100%' }}>
              <Select
                size="middle"
                style={{ width: '100%' }}
                value={config.model}
                options={models.map((m) => ({ ...m, label: 'AI模型: ' + m.label }))}
                onChange={(e) => {
                  changeConfig({
                    ...config,
                    model: e.toString()
                  })
                }}
              />
              {/*
              <Button
                block
                onClick={() => {
                  setRoleConfigModal({ open: true })
                }}
              >
                角色预设
              </Button>
              <Button
                block
                onClick={() => {
                  setConfigModal(true)
                  // chatGptConfigform.setFieldsValue({
                  //   ...config
                  // })
                  // setChatConfigModal({ open: true })
                }}
              >
                系统配置
              </Button>
              */}
              <Popconfirm
                title="删除全部对话"
                description="您确定删除全部会话对吗? "
                onConfirm={() => {
                  clearChats()
                }}
                onCancel={() => {
                  // ==== 无操作 ====
                }}
                okText="是"
                cancelText="否"
              >
                <Button block danger type="dashed" ghost>
                  清除所有对话
                </Button>
              </Popconfirm>
            </Space>
          )
        }}
        menuProps={{
          onClick: (r) => {
            const id = r.key.replace('/', '')
            if (selectChatId !== id) {
              changeSelectChatId(id)
            }
          }
        }}
      >
        <div className={styles.chatPage_container}>
          <div ref={scrollRef} className={styles.chatPage_container_one}>
            <div id="image-wrapper">
              {chatMessages.map((item) => {
                return (
                  <ChatMessage
                    key={item.id}
                    position={item.role === 'user' ? 'right' : 'left'}
                    status={item.status}
                    content={item.text}
                    time={item.dateTime}
                    model={item.requestOptions.options?.model}
                    onDelChatMessage={() => {
                      delChatMessage(selectChatId, item.id)
                    }}
                  />
                )
              })}
              {chatMessages.length <= 0 && <Reminder />}
            </div>
          </div>
          <div className={styles.chatPage_container_two}>
            <AllInput
              disabled={!!fetchController}
              onSend={(value) => {
                if (value.startsWith('/')) return
                sendChatCompletions(value)
                scrollToBottomIfAtBottom()
              }}
              clearMessage={() => {
                clearChatMessage(selectChatId)
              }}
              onStopFetch={() => {
                // 结束
                setFetchController((c) => {
                  c?.abort()
                  return null
                })
              }}
            />
          </div>
        </div>
      </Layout>

      {/* AI角色预设 
      <Modal
        title="AI角色预设"
        open={roleConfigModal.open}
        footer={null}
        destroyOnClose
        onCancel={() => setRoleConfigModal({ open: false })}
        width={800}
        style={{
          top: 50
        }}
      >*
      <RoleLocal />
      /}
      {/* <Tabs
          tabPosition={bodyResize.width <= 600 ? 'top' : 'left'}
          items={[
            {
              key: 'roleLocal',
              label: '本地数据',
              children: <RoleLocal />
            },
            {
              key: 'roleNetwork',
              label: '网络数据',
              children: <RoleNetwork />
            }
          ]}
        /> 
    </Modal>*/}
    </div>
  )
}
export default ChatPage
