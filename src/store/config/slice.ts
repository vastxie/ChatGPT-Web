import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { ChatGptConfig } from '@/types'
import { NotificationInfo } from '@/types/admin'

export interface ConfigState {
  // 配置信息
  config: ChatGptConfig
  // 模型
  models: Array<{
    label: string
    value: string
  }>
  // 配置弹窗开关
  configModal: boolean
  // 修改配置弹窗
  setConfigModal: (value: boolean) => void
  // 修改配置
  changeConfig: (config: ChatGptConfig) => void
  notifications: Array<NotificationInfo>
  shop_introduce: string
  user_introduce: string
  replaceData: (data: { [key: string]: any }) => void
}

const configStore = create<ConfigState>()(
  persist(
    (set, get) => ({
      configModal: false,
      notifications: [],
      shop_introduce: '',
      user_introduce: '',
      models: [
        // 初始模型数据
        {
          label: '默认',
          value: 'gpt-3.5-turbo'
        },
        {
          label: '高级',
          value: 'gpt-4'
        }
      ],
      config: {
        model: 'gpt-3.5-turbo',
        temperature: 0,
        presence_penalty: 0,
        frequency_penalty: 0,
        max_tokens: 2000
      },
      setConfigModal: (value) => set({ configModal: value }),
      changeConfig: (config) =>
        set((state: ConfigState) => ({
          config: { ...state.config, ...config }
        })),
      replaceData: (data) => {
        set((state: ConfigState) => {
          if (data.ai_models) {
            // 将JSON字符串解析为对象数组
            const aiModelsParsed = JSON.parse(data.ai_models);

            // 使用解析后的数据更新models
            const newModels = aiModelsParsed.map((model: { name: any; param: any }) => ({
              label: model.name,
              value: model.param
            }));

            return { ...state, models: newModels };
          } else {
            // 如果没有ai_models或无法解析，保持原来的状态
            return { ...state, ...data };
          }
        });
      }
    }),
    {
      name: 'config_storage', // 存储项的名称（必须唯一）
      storage: createJSONStorage(() => localStorage) // 使用localStorage作为存储介质
    }
  )
)

export default configStore
