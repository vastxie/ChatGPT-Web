import { AutoComplete, Button, Input, Modal, message } from 'antd'
import styles from './index.module.less'
import { ClearOutlined, CloudDownloadOutlined, SyncOutlined } from '@ant-design/icons'
import { useMemo, useState } from 'react'
import { promptStore } from '@/store'
import html2canvas from 'html2canvas'
import useDocumentResize from '@/hooks/useDocumentResize'

type Props = {
  onSend: (value: string) => void
  disabled?: boolean
  clearMessage?: () => void
  onStopFetch?: () => void
}

function AllInput(props: Props) {
  const [prompt, setPrompt] = useState('')
  const { localPrompt } = promptStore()

  const bodyResize = useDocumentResize()

  const [downloadModal, setDownloadModal] = useState({
    open: false,
    loading: false
  })

  const searchOptions = useMemo(() => {
    if (prompt.startsWith('/')) {
      return localPrompt
        .filter((item: { key: string }) =>
          item.key.toLowerCase().includes(prompt.substring(1).toLowerCase())
        )
        .map((obj) => {
          return {
            label: obj.key,
            value: obj.value
          }
        })
    } else {
      return []
    }
  }, [prompt])

  // 保存聊天记录到图片
  async function downloadChatRecords() {
    try {
      setDownloadModal((d) => ({ ...d, loading: true }))
      const ele = document.getElementById('image-wrapper')
      const canvas = await html2canvas(ele as HTMLDivElement, {
        useCORS: true
      })
      const imgUrl = canvas.toDataURL('image/png')
      const tempLink = document.createElement('a')
      tempLink.style.display = 'none'
      tempLink.href = imgUrl
      tempLink.setAttribute('download', 'chat-shot.png')
      if (typeof tempLink.download === 'undefined') tempLink.setAttribute('target', '_blank')
      document.body.appendChild(tempLink)
      tempLink.click()
      document.body.removeChild(tempLink)
      window.URL.revokeObjectURL(imgUrl)
      setDownloadModal(() => ({ open: false, loading: false }))
      Promise.resolve()
    } catch (error: any) {
      message.error('下载聊天记录失败')
      Promise.reject()
    } finally {
      setDownloadModal((d) => ({ ...d, loading: false }))
    }
  }

  return (
    <div className={styles.allInput}>
      {bodyResize.width > 800 && (
        <div
          className={styles.allInput_icon}
          onClick={() => {
            setDownloadModal((d) => ({ ...d, open: true }))
          }}
        >
          <CloudDownloadOutlined />
        </div>
      )}
      {/*<div
        className={styles.allInput_icon}
        onClick={() => {
          props?.clearMessage?.()
        }}
      >
        <ClearOutlined />
      </div>*/
      }
      <AutoComplete
        value={prompt}
        options={searchOptions}
        style={{
          width: '100%',
          maxWidth: 800
        }}
        onSelect={(value) => {
          // 这里选择后直接发送
          //   props?.onSend?.(value)
          // 并且将输入框清空
          // 修改为选中放置在输入框内
          setPrompt(value)
        }}
      >
        <Input.TextArea
          value={prompt}
          // showCount
          size="large"
          placeholder="问点什么吧..."
          // (Shift + Enter = 换行)
          autoSize={{
            maxRows: 4
          }}
          onPressEnter={(e) => {
            if (e.key === 'Enter' && e.keyCode === 13 && e.shiftKey) {
              // === 无操作 ===
            } else if (e.key === 'Enter' && e.keyCode === 13) {
              if (!props.disabled) {
                props?.onSend?.(prompt)
                setPrompt('')
              }
              e.preventDefault() //禁止回车的默认换行
            }
          }}
          onChange={(e) => {
            setPrompt(e.target.value)
          }}
        />
      </AutoComplete>
      {props.disabled ? (
        <Button
          className={styles.allInput_button}
          type="primary"
          size="large"
          ghost
          danger
          disabled={!props.disabled}
          onClick={() => {
            props.onStopFetch?.()
          }}
        >
          <SyncOutlined spin /> 停止回答
        </Button>
      ) : (
        <Button
          className={styles.allInput_button}
          type="primary"
          size="large"
          disabled={!prompt || props.disabled}
          onClick={() => {
            props?.onSend?.(prompt)
            setPrompt('')
          }}
        >
          发送
        </Button>
      )}

      <Modal
        title="保存当前对话记录"
        open={downloadModal.open}
        onOk={() => {
          downloadChatRecords()
        }}
        confirmLoading={downloadModal.loading}
        onCancel={() => {
          setDownloadModal({ open: false, loading: false })
        }}
      >
        <p>是否将当前对话记录保存为图片？</p>
      </Modal>
    </div>
  )
}

export default AllInput
