import React, { useEffect, useRef } from 'react';
import { Space, Popconfirm, message, Image, Avatar, Spin } from 'antd';
import { DeleteOutlined, LoadingOutlined, UserOutlined } from '@ant-design/icons';
import { copyToClipboard, joinTrim } from '@/utils';
import styles from './index.module.less';
import MarkdownIt from 'markdown-it';
import mdKatex from '@traptitech/markdown-it-katex';
import mila from 'markdown-it-link-attributes';
import hljs from 'highlight.js';

function ChatMessage({
  position,
  content,
  status,
  time,
  model,
  isImage,
  imageUrl,
  uploadedImageUrl,
  onDelChatMessage
}: {
  position: 'left' | 'right',
  content?: string,
  status: 'pass' | 'loading' | 'error' | string,
  time: string,
  model?: string,
  isImage?: boolean,
  imageUrl?: string,
  uploadedImageUrl?: string,
  onDelChatMessage?: () => void
}) {
  const copyMessageKey = 'copyMessageKey';
  const markdownBodyRef = useRef<HTMLDivElement>(null);

  const mdi = new MarkdownIt({
    html: true,
    linkify: true,
    highlight(code, language) {
      const validLang = !!(language && hljs.getLanguage(language));
      if (validLang) {
        const lang = language ?? '';
        return highlightBlock(hljs.highlight(code, { language: lang }).value, lang, code);
      }
      return highlightBlock(hljs.highlightAuto(code).value, '', code);
    }
  });

  mdi.use(mila, { attrs: { target: '_blank', rel: 'noopener' } });
  mdi.use(mdKatex, { blockClass: 'katex-block', errorColor: ' #cc0000', output: 'mathml' });

  useEffect(() => {
    addCopyEvents();
    return () => {
      removeCopyEvents();
    };
  }, [markdownBodyRef.current]);

  function highlightBlock(str: string, lang: string, code: string) {
    return `<pre class="code-block-wrapper"><div class="code-block-header"><span class="code-block-header__lang">${lang}</span><span class="code-block-header__copy">复制代码</span></div><code class="hljs code-block-body ${lang}">${str}</code></pre>`;
  }

  function addCopyEvents() {
    if (markdownBodyRef.current) {
      const copyBtn = markdownBodyRef.current.querySelectorAll('.code-block-header__copy');
      copyBtn.forEach((btn) => {
        btn.addEventListener('click', () => {
          const code = btn.parentElement?.nextElementSibling?.textContent;
          if (code) {
            copyToClipboard(code)
              .then(() => {
                message.open({
                  key: copyMessageKey,
                  type: 'success',
                  content: '复制成功'
                });
              })
              .catch(() => {
                message.open({
                  key: copyMessageKey,
                  type: 'error',
                  content: '复制失败'
                });
              });
          }
        });
      });
    }
  }

  function renderLoadingText() {
    if (model === 'dall-e-3') {
      return '绘制中，请稍候...';
    }
    return 'AI 思考中...';
  }

  function removeCopyEvents() {
    if (markdownBodyRef.current) {
      const copyBtn = markdownBodyRef.current.querySelectorAll('.code-block-header__copy');
      copyBtn.forEach((btn) => {
        btn.removeEventListener('click', () => {
          // 移除监听器
        });
      });
    }
  }

  function renderContent() {
    console.log('Rendering content, isImage:', isImage, 'imageUrl:', imageUrl);

    // 如果有 AI 生成的图片，则直接返回该图片
    if (isImage && imageUrl) {
      return <Image src={imageUrl} alt="Generated Content" style={{ maxHeight: '40vh' }} />;
    }

    // 如果有上传的图片 URL，则准备图片元素
    const imageElement = uploadedImageUrl ? <Image src={uploadedImageUrl} alt="Uploaded Content" style={{ maxHeight: '40vh' }} /> : null;

    // 如果有文本内容，则准备文本元素
    const textElement = content ? <div ref={markdownBodyRef} className={'markdown-body'} dangerouslySetInnerHTML={{ __html: mdi.render(content) }} /> : null;

    // 返回图片和文本的组合
    return (
      <>
        {imageElement}
        {textElement}
      </>
    );
  }


  function chatAvatar({ text, style }: { text: string; style?: React.CSSProperties }) {
    let avatarContent;
    let backgroundColor = '';

    if (text === 'AI') {
      backgroundColor = '#AB68FF'; // AI的背景颜色
      avatarContent = <span>{text}</span>;
    } else if (text === 'YOU') {
      backgroundColor = '#19c37d'; // ME的背景颜色
      avatarContent = <UserOutlined />; // 使用图标代替文本
    }

    return (
      <Space direction="vertical" style={{ textAlign: 'center', ...style }}>
        <Avatar shape="circle" style={{ backgroundColor }}>{avatarContent}</Avatar>
        {status === 'error' && (
          <Popconfirm
            title="删除此条消息"
            description="此条消息为发送失败消息，是否要删除?"
            onConfirm={() => {
              onDelChatMessage?.();
            }}
            onCancel={() => {
              // === 无操作 ===
            }}
            okText="是"
            cancelText="否"
          >
            <DeleteOutlined style={{ color: 'red' }} />
          </Popconfirm>
        )}
      </Space>
    );
  }

  return (
    <div
      className={styles.chatMessage}
      style={{
        justifyContent: position === 'right' ? 'flex-end' : 'flex-start'
      }}
    >
      {position === 'left' && chatAvatar({ style: { marginRight: 8 }, text: 'AI', })}
      <div className={styles.chatMessage_content}>
        <span className={styles.chatMessage_content_time} style={{ textAlign: position === 'right' ? 'right' : 'left' }}>
          {time}
        </span>
        <div className={joinTrim([styles.chatMessage_content_text, position === 'right' ? styles.right : styles.left])}>
          {status === 'loading' ? (
            <div>
              <div>
                <LoadingOutlined />
                <span> {renderLoadingText()}</span>
              </div>
            </div>
          ) : (
            renderContent()
          )}
        </div>
      </div>
      {position === 'right' && chatAvatar({ style: { marginLeft: 8 }, text: 'YOU', })}
    </div>
  );
}

export default ChatMessage;
