/** 商品分类 */
export type CategoryKey = 'tops' | 'pants' | 'coats' | 'accessories'

export interface Category {
  key: CategoryKey
  label: string
}

/** 商品（模拟数据结构，后续可直接映射后台接口字段） */
export interface Goods {
  id: string
  name: string
  category: CategoryKey
  /** 现价（元） */
  price: number
  /** 原价（元），可为空 */
  originalPrice?: number
  /** 列表主图 */
  image: string
  /** 详情轮播图 */
  images: string[]
  /** 可选颜色（与商品图一致） */
  colors: string[]
  /** 可选尺码 */
  sizes: string[]
  /** 描述 */
  description: string
  /** 材质 */
  material: string
  /** 是否新品 */
  isNew?: boolean
}

/** 购物车条目（本地持久化） */
export interface CartItem {
  goodsId: string
  color: string
  size: string
  count: number
  checked: boolean
}

/** 收货地址（本地持久化） */
export interface Address {
  id: string
  name: string
  phone: string
  region: string
  detail: string
  isDefault: boolean
}

/** 订单商品行 */
export interface OrderItem {
  goodsId: string
  name: string
  image: string
  color: string
  size: string
  count: number
  price: number
}

export type OrderStatus = '模拟订单 · 待支付' | '模拟订单 · 已支付'

/** 订单（本地持久化，模拟下单） */
export interface Order {
  id: string
  items: OrderItem[]
  total: number
  address: Address
  createdAt: number
  status: OrderStatus
  /** 明确标注：模拟数据 */
  mock: true
}
