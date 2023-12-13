import { AutoComplete, Button, Input } from 'antd'
import styles from './index.module.less'
import { PauseCircleOutlined, SendOutlined } from '@ant-design/icons'
import { useMemo, useState } from 'react'
import { promptStore } from '@/store'

type Props = {
  onSend: (value: string) => void
  disabled?: boolean
  clearMessage?: () => void
  onStopFetch?: () => void
}

function AllInput(props: Props) {
  const [prompt, setPrompt] = useState('')
  const { localPrompt } = promptStore()

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

  return (
    <div className="allInput">
      <div style={{ position: 'relative', width: '100%' }}>
        <AutoComplete
          //className={styles.allInput_input}
          value={prompt}
          options={searchOptions}
          //allowClear
          autoFocus
          style={{
            width: '100%',
            maxWidth: '100%',
          }}
          onSelect={(value) => {
            setPrompt(value);
          }}
        >
          <Input.TextArea
            value={prompt}
            size="large"
            placeholder='请输入问题或者"/"获取模板，Shift + Enter 换行'
            autoSize={{
              maxRows: 4
            }}
            style={{
              paddingRight: '50px', // 留出足够空间放置按钮
            }}
            onPressEnter={(e) => {
              if (e.key === 'Enter' && e.keyCode === 13 && e.shiftKey) {
                // === 无操作 ===
              } else if (e.key === 'Enter' && e.keyCode === 13) {
                if (!props.disabled) {
                  props?.onSend?.(prompt);
                  setPrompt('');
                }
                e.preventDefault(); // 禁止回车的默认换行
              }
            }}
            onChange={(e) => {
              setPrompt(e.target.value);
            }}
          />
        </AutoComplete>
        <Button
          className={styles.allInput_button}
          style={{
            position: 'absolute',
            top: '50%',
            right: '10px',
            transform: 'translateY(-50%)',
            zIndex: 1,
          }}
          type="text"
          shape="circle"
          icon={props.disabled ? <PauseCircleOutlined /> : <SendOutlined />}
          disabled={props.disabled ? false : !prompt}
          onClick={() => {
            if (props.disabled) {
              // 当处于等待状态时，点击停止处理
              props.onStopFetch?.();
            } else {
              // 否则发送消息
              props.onSend?.(prompt);
              setPrompt('');
            }
          }}
        />
      </div>
    </div>
  )
}

export default AllInput
