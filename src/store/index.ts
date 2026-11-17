import { computed, reactive, watch } from 'vue'
import type { Address, CartItem, Goods, Order } from '../data/types'
import { getGoodsById } from '../data/goods'

/**
 * 全局状态：购物车 / 地址 / 订单
 * 全部持久化到本地存储（uni.setStorageSync，同时兼容 H5 与小程序）。
 */

const CART_KEY = 'xubai_cart'
const ADDRESS_KEY = 'xubai_address'
const ORDER_KEY = 'xubai_order'

function load<T>(key: string, fallback: T): T {
  try {
    const raw = uni.getStorageSync(key)
    if (raw) return JSON.parse(raw) as T
  } catch (e) {
    console.warn('读取本地存储失败', key, e)
  }
  return fallback
}

function save(key: string, value: unknown) {
  try {
    uni.setStorageSync(key, JSON.stringify(value))
  } catch (e) {
    console.warn('写入本地存储失败', key, e)
  }
}

/* ---------------- 购物车 ---------------- */

export const cartStore = reactive<{ items: CartItem[] }>({
  items: load<CartItem[]>(CART_KEY, [])
})

watch(
  () => cartStore.items,
  (v) => save(CART_KEY, v),
  { deep: true }
)

/** 加入购物车（同款同色同尺码合并数量） */
export function addToCart(goods: Goods, color: string, size: string, count: number) {
  const found = cartStore.items.find(
    (i) => i.goodsId === goods.id && i.color === color && i.size === size
  )
  if (found) {
    found.count += count
    found.checked = true
  } else {
    cartStore.items.push({ goodsId: goods.id, color, size, count, checked: true })
  }
}

export function removeFromCart(index: number) {
  cartStore.items.splice(index, 1)
}

export function updateCartCount(index: number, count: number) {
  if (count < 1) return
  cartStore.items[index].count = count
}

export function toggleChecked(index: number, checked: boolean) {
  cartStore.items[index].checked = checked
}

export function toggleAllChecked(checked: boolean) {
  cartStore.items.forEach((i) => (i.checked = checked))
}

export function removeCheckedItems() {
  cartStore.items = cartStore.items.filter((i) => !i.checked)
}

/** 已勾选条目合计金额 */
export const checkedTotal = computed(() =>
  cartStore.items.reduce((sum, i) => {
    if (!i.checked) return sum
    const g = getGoodsById(i.goodsId)
    return g ? sum + g.price * i.count : sum
  }, 0)
)

/** 已勾选条目总数 */
export const checkedCount = computed(() =>
  cartStore.items.reduce((n, i) => (i.checked ? n + i.count : n), 0)
)

/** 购物车总数量（tab 提示） */
export const cartTotalCount = computed(() =>
  cartStore.items.reduce((n, i) => n + i.count, 0)
)

/* ---------------- 地址 ---------------- */

export const addressStore = reactive<{ list: Address[] }>({
  list: load<Address[]>(ADDRESS_KEY, [])
})

watch(
  () => addressStore.list,
  (v) => save(ADDRESS_KEY, v),
  { deep: true }
)

export function defaultAddress(): Address | undefined {
  return addressStore.list.find((a) => a.isDefault) || addressStore.list[0]
}

/** 下单页临时选中的地址 id（跨页面选择地址时使用） */
export let pickedAddressId: string | null = null

export function setPickedAddress(id: string | null) {
  pickedAddressId = id
}

export function saveAddress(addr: Address) {
  const idx = addressStore.list.findIndex((a) => a.id === addr.id)
  if (addr.isDefault) {
    addressStore.list.forEach((a) => (a.isDefault = false))
  }
  if (idx >= 0) {
    addressStore.list[idx] = addr
  } else {
    addressStore.list.push(addr)
  }
  // 若没有默认地址，把第一条设为默认
  if (!addressStore.list.some((a) => a.isDefault) && addressStore.list.length) {
    addressStore.list[0].isDefault = true
  }
}

export function deleteAddress(id: string) {
  addressStore.list = addressStore.list.filter((a) => a.id !== id)
}

export function genId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
}

/* ---------------- 订单 ---------------- */

export const orderStore = reactive<{ list: Order[] }>({
  list: load<Order[]>(ORDER_KEY, [])
})

watch(
  () => orderStore.list,
  (v) => save(ORDER_KEY, v),
  { deep: true }
)

/**
 * 提交订单，创建「待付款」订单。
 * 当前版本数据保存在本地；接入真实后端时，将此函数替换为创建订单接口调用。
 */
export function submitOrder(items: Order['items'], total: number, address: Address): Order {
  const order: Order = {
    id: 'XB' + Date.now(),
    items,
    total,
    address,
    createdAt: Date.now(),
    status: '待付款'
  }
  orderStore.list.unshift(order)
  return order
}

/**
 * 支付订单。
 * 当前版本：本地完成支付状态流转（适合演示与联调前的开发）。
 * 接入真实支付时，在此处调用 uni.requestPayment（小程序）或支付 SDK（H5），
 * 以服务端支付回调结果为准更新订单状态。
 */
export function payOrder(orderId: string): boolean {
  const o = orderStore.list.find((x) => x.id === orderId)
  if (!o || o.status !== '待付款') return false
  o.status = '待发货'
  o.paidAt = Date.now()
  // 演示：支付后 6 秒自动发货并生成物流单号；接入真实后台后由商家发货回调驱动
  setTimeout(() => {
    const cur = orderStore.list.find((x) => x.id === orderId)
    if (cur && cur.status === '待发货') {
      cur.status = '已发货'
      cur.shippedAt = Date.now()
      cur.logistics = {
        company: '顺丰速运',
        no: 'SF' + String(Date.now()).slice(-12)
      }
    }
  }, 6000)
  return true
}

/** 取消订单（仅待付款可取消） */
export function cancelOrder(orderId: string): boolean {
  const o = orderStore.list.find((x) => x.id === orderId)
  if (!o || o.status !== '待付款') return false
  o.status = '已取消'
  return true
}

/** 确认收货 */
export function confirmReceive(orderId: string): boolean {
  const o = orderStore.list.find((x) => x.id === orderId)
  if (!o || o.status !== '已发货') return false
  o.status = '已完成'
  return true
}

/** 删除订单 */
export function deleteOrder(orderId: string) {
  orderStore.list = orderStore.list.filter((x) => x.id !== orderId)
}

/* ---------------- tabBar 购物车角标 ---------------- */

export function updateCartBadge() {
  const n = cartTotalCount.value
  try {
    if (n > 0) {
      uni.setTabBarBadge({ index: 2, text: n > 99 ? '99+' : String(n) })
    } else {
      uni.removeTabBarBadge({ index: 2 })
    }
  } catch (e) {
    /* 某些端在 tabBar 未就绪时会失败，忽略 */
  }
}

watch(cartTotalCount, () => updateCartBadge())
