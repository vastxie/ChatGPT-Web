import { getProduct } from '@/request/api'
import shopStore from './slice'
import wxpay from '@/assets/wxpay.png';
import zfbpay from '@/assets/zfbpay.png';
import qqpay from '@/assets/qqpay.png';


async function fetchProduct() {
	const res = await getProduct()
	if (!res.code) {
		shopStore.getState().changeGoodsList([...res.data.products])
		const payTyps = res.data.pay_types.map((type) => {
			const types: { [key: string]: any } = {
				wxpay: {
					icon: wxpay,
					title: '微信支付',
					key: 'wxpay'
				},
				alipay: {
					icon: zfbpay,
					title: '支付宝',
					key: 'alipay'
				},
				qqpay: {
					icon: qqpay,
					title: 'QQ支付',
					key: 'qqpay'
				},
			}
			return types[type]
		})
		await shopStore.getState().changePayTypes([...payTyps])
	}
	return res
}

export default {
	fetchProduct
}
