import useDocumentResize from '@/hooks/useDocumentResize';
import styles from './index.module.less';
import robot from '@/assets/robot.png';


function Reminder() {
    useDocumentResize()

    return (
        <div className={styles.reminder}>
            <h2 className={styles.reminder_title}><img src={robot} alt="" />欢迎来到 ChatWeb</h2>
            <p className={styles.reminder_message}>与<span>AI 助手</span>聊天，畅想无限可能！基于先进的 AI 模型，让你的交流更加智能、高效、便捷！</p>
            <p className={styles.reminder_message}>使用<span>AI 绘画</span>一句话为你的想象添彩，将创意转化为视觉艺术。</p>
        </div>
    );
}

export default Reminder;
