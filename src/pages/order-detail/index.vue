<template>
  <view v-if="order" class="page">
    <!-- 状态卡 -->
    <view class="status-card" :class="statusClass">
      <text class="status-text">{{ order.status }}</text>
      <text class="status-sub">{{ statusSub }}</text>
    </view>

    <!-- 地址 -->
    <view class="card">
      <view class="addr-top">
        <text class="addr-name">{{ order.address.name }}</text>
        <text class="addr-phone">{{ order.address.phone }}</text>
      </view>
      <text class="addr-detail">{{ order.address.region }} {{ order.address.detail }}</text>
    </view>

    <!-- 物流 -->
    <view v-if="order.logistics" class="card">
      <text class="label">物流信息</text>
      <view class="logi-row">
        <text class="logi-company">{{ order.logistics.company }}</text>
        <text class="logi-no">{{ order.logistics.no }}</text>
      </view>
      <view class="logi-track">
        <text>包裹已从序白上海仓发出，运输途中</text>
      </view>
    </view>

    <!-- 商品 -->
    <view class="card">
      <view v-for="(it, i) in order.items" :key="i" class="row">
        <image class="thumb" :src="it.image" mode="aspectFill" />
        <view class="info">
          <text class="name">{{ it.name }}</text>
          <text class="spec">{{ it.color }} · {{ it.size }} × {{ it.count }}</text>
        </view>
        <text class="price">¥{{ it.price * it.count }}</text>
      </view>
    </view>

    <!-- 金额 -->
    <view class="card">
      <view class="total-row strong">
        <text>应付合计</text>
        <text class="total-num">¥{{ order.total }}</text>
      </view>
      <view class="total-row">
        <text>订单编号</text>
        <text>{{ order.id }}</text>
      </view>
      <view class="total-row">
        <text>下单时间</text>
        <text>{{ formatTime(order.createdAt) }}</text>
      </view>
      <view v-if="order.paidAt" class="total-row">
        <text>支付时间</text>
        <text>{{ formatTime(order.paidAt) }}</text>
      </view>
    </view>

    <!-- 操作栏 -->
    <view class="submit-wrap safe-bottom">
      <view v-if="order.status === '待付款'" class="btn-group">
        <view class="btn-ghost half" @tap="onCancel">取消订单</view>
        <view class="btn-primary half" @tap="onPay">去支付</view>
      </view>
      <view v-else-if="order.status === '已发货'" class="btn-primary" @tap="onConfirm">确认收货</view>
      <view v-else-if="order.status === '已完成'" class="btn-ghost" @tap="onDelete">删除订单</view>
      <view v-else-if="order.status === '待发货'" class="wait-tip">商家备货中，发货后将短信通知您</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import {
  cancelOrder,
  confirmReceive,
  deleteOrder,
  orderStore,
  payOrder
} from '../../store'
import type { Order, OrderStatus } from '../../data/types'

const order = ref<Order | null>(null)
const orderId = ref('')

onLoad((options) => {
  orderId.value = (options && options.id) || ''
})

onShow(() => {
  order.value = orderStore.list.find((o) => o.id === orderId.value) || null
  if (!order.value) {
    uni.showToast({ title: '订单不存在', icon: 'none' })
  }
})

const STATUS_CLASS: Record<OrderStatus, string> = {
  待付款: 'st-pay',
  待发货: 'st-ship',
  已发货: 'st-transit',
  已完成: 'st-done',
  已取消: 'st-cancel'
}

const statusClass = computed(() => (order.value ? STATUS_CLASS[order.value.status] : ''))

const statusSub = computed(() => {
  switch (order.value && order.value.status) {
    case '待付款':
      return '请在 24 小时内完成支付，超时订单将自动取消'
    case '待发货':
      return '支付成功，商家正在为你打包'
    case '已发货':
      return '包裹正在飞奔向你'
    case '已完成':
      return '感谢购买，期待与你再次相遇'
    default:
      return '订单已取消'
  }
})

function formatTime(ts: number): string {
  const d = new Date(ts)
  const p = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`
}

function onPay() {
  uni.redirectTo({ url: '/pages/pay/index?id=' + orderId.value })
}

function onCancel() {
  uni.showModal({
    title: '取消订单',
    content: '确定取消该订单吗？',
    confirmText: '取消订单',
    cancelText: '再想想',
    success: (res) => {
      if (res.confirm && cancelOrder(orderId.value)) {
        uni.showToast({ title: '订单已取消', icon: 'none' })
      }
    }
  })
}

function onConfirm() {
  uni.showModal({
    title: '确认收货',
    content: '请确认已收到商品且完好无损',
    success: (res) => {
      if (res.confirm && confirmReceive(orderId.value)) {
        uni.showToast({ title: '交易完成', icon: 'success' })
      }
    }
  })
}

function onDelete() {
  uni.showModal({
    title: '删除订单',
    content: '删除后不可恢复，确定删除吗？',
    success: (res) => {
      if (res.confirm) {
        deleteOrder(orderId.value)
        uni.navigateBack()
      }
    }
  })
}
</script>

<style scoped>
.page {
  padding-bottom: 180rpx;
}
.status-card {
  padding: 48rpx 40rpx;
  color: #ffffff;
}
.st-pay {
  background: linear-gradient(135deg, #2b2b2b, #4a4a4a);
}
.st-ship {
  background: linear-gradient(135deg, #3d3d3d, #6b675f);
}
.st-transit {
  background: linear-gradient(135deg, #1a1a1a, #45516b);
}
.st-done {
  background: linear-gradient(135deg, #1a1a1a, #4c6b52);
}
.st-cancel {
  background: linear-gradient(135deg, #8f8a80, #b0aba1);
}
.status-text {
  display: block;
  font-size: 40rpx;
  font-weight: 700;
  letter-spacing: 2rpx;
}
.status-sub {
  display: block;
  font-size: 24rpx;
  opacity: 0.8;
  margin-top: 12rpx;
}
.addr-top {
  display: flex;
  align-items: baseline;
}
.addr-name {
  font-size: 30rpx;
  font-weight: 600;
}
.addr-phone {
  margin-left: 20rpx;
  font-size: 26rpx;
  color: #6b675f;
}
.addr-detail {
  display: block;
  font-size: 26rpx;
  color: #6b675f;
  margin-top: 12rpx;
}
.label {
  display: block;
  font-size: 26rpx;
  color: #6b675f;
  margin-bottom: 16rpx;
}
.logi-row {
  display: flex;
  align-items: baseline;
}
.logi-company {
  font-size: 28rpx;
  font-weight: 600;
}
.logi-no {
  margin-left: 24rpx;
  font-size: 26rpx;
  color: #6b675f;
}
.logi-track {
  margin-top: 16rpx;
  font-size: 24rpx;
  color: #9a968e;
}
.row {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
}
.thumb {
  width: 140rpx;
  height: 140rpx;
  border-radius: 12rpx;
  flex-shrink: 0;
}
.info {
  flex: 1;
  margin: 0 20rpx;
  overflow: hidden;
}
.name {
  display: block;
  font-size: 26rpx;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.spec {
  display: block;
  font-size: 22rpx;
  color: #9a968e;
  margin-top: 8rpx;
}
.price {
  font-size: 26rpx;
  font-weight: 600;
}
.total-row {
  display: flex;
  justify-content: space-between;
  font-size: 26rpx;
  color: #6b675f;
  padding: 10rpx 0;
}
.total-row.strong {
  color: #1a1a1a;
}
.total-num {
  font-size: 32rpx;
  font-weight: 700;
}
.submit-wrap {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 16rpx 32rpx;
  background: #ffffff;
  box-shadow: 0 -4rpx 16rpx rgba(0, 0, 0, 0.04);
}
.btn-group {
  display: flex;
}
.half {
  flex: 1;
}
.half.btn-ghost {
  margin-right: 20rpx;
}
.wait-tip {
  text-align: center;
  font-size: 24rpx;
  color: #9a968e;
  padding: 20rpx 0;
}
@media (min-width: 768px) {
  .page {
    max-width: 860px;
    margin: 0 auto;
    padding-bottom: 150px;
  }
  .submit-wrap {
    left: 50%;
    right: auto;
    transform: translateX(-50%);
    width: 100%;
    max-width: 860px;
  }
}
</style>
