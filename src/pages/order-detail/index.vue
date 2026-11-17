<template>
  <view v-if="order" class="page">
    <!-- 模拟标注 -->
    <view class="mock-banner">
      <text>⚠️ {{ order.status }}：本项目为演示应用，未发生任何真实支付</text>
    </view>

    <!-- 地址 -->
    <view class="card">
      <view class="addr-top">
        <text class="addr-name">{{ order.address.name }}</text>
        <text class="addr-phone">{{ order.address.phone }}</text>
      </view>
      <text class="addr-detail">{{ order.address.region }} {{ order.address.detail }}</text>
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
    </view>

    <view v-if="order.status.includes('待支付')" class="submit-wrap safe-bottom">
      <view class="btn-ghost" @tap="onMockPay">模拟支付（不产生真实扣款）</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { orderStore, payMockOrder } from '../../store'
import type { Order } from '../../data/types'

const order = ref<Order | null>(null)

onLoad((options) => {
  const id = (options && options.id) || ''
  order.value = orderStore.list.find((o) => o.id === id) || null
  if (!order.value) {
    uni.showToast({ title: '订单不存在', icon: 'none' })
  }
})

function formatTime(ts: number): string {
  const d = new Date(ts)
  const p = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`
}

function onMockPay() {
  if (!order.value) return
  uni.showModal({
    title: '模拟支付',
    content: '这是演示操作，不会调用任何支付接口，不会产生真实扣款。',
    confirmText: '模拟支付',
    success: (res) => {
      if (res.confirm && order.value) {
        payMockOrder(order.value.id)
        uni.showToast({ title: '模拟支付完成', icon: 'success' })
      }
    }
  })
}
</script>

<style scoped>
.page {
  padding-bottom: 180rpx;
}
.mock-banner {
  background: #fff7e6;
  color: #a9762a;
  font-size: 22rpx;
  text-align: center;
  padding: 16rpx;
  line-height: 1.6;
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

@media (min-width: 768px) {

  .page {
    max-width: 860px;
    margin: 0 auto;
  }
  .page {
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
