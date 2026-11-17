<template>
  <view v-if="order" class="page">
    <!-- 金额 -->
    <view class="card amount-card">
      <text class="amount-label">应付金额</text>
      <view class="amount-row">
        <text class="amount-cur">¥</text>
        <text class="amount-num">{{ order.total }}</text>
      </view>
      <text class="order-id">订单号 {{ order.id }}</text>
    </view>

    <!-- 支付方式 -->
    <view class="card">
      <view class="pay-item active">
        <view class="pay-icon wechat"><text>微</text></view>
        <view class="pay-info">
          <text class="pay-name">微信支付</text>
          <text class="pay-desc">推荐使用，到账更快</text>
        </view>
        <text class="pay-check">✓</text>
      </view>
      <view class="pay-item disabled">
        <view class="pay-icon other"><text>卡</text></view>
        <view class="pay-info">
          <text class="pay-name">银行卡支付</text>
          <text class="pay-desc">即将开通</text>
        </view>
      </view>
    </view>

    <view class="pay-tip">
      <text>支付即视为同意《购买协议》与《退换货政策》</text>
    </view>

    <!-- 支付按钮 -->
    <view class="submit-wrap safe-bottom">
      <view class="btn-primary" @tap="onPay">立即支付 ¥{{ order.total }}</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { orderStore, payOrder } from '../../store'
import type { Order } from '../../data/types'

const order = ref<Order | null>(null)
let paying = false

onLoad((options) => {
  const id = (options && options.id) || ''
  order.value = orderStore.list.find((o) => o.id === id) || null
  if (!order.value) {
    uni.showToast({ title: '订单不存在', icon: 'none' })
    setTimeout(() => uni.navigateBack(), 800)
  }
})

function onPay() {
  if (!order.value || paying) return
  paying = true
  uni.showLoading({ title: '支付中...', mask: true })

  /**
   * 接入真实微信支付时，在这里调用后端下单接口获取预支付参数，然后：
   * uni.requestPayment({ provider: 'wxpay', ...prepay, success, fail })
   * 订单最终状态以服务端支付回调为准。
   * 当前版本：本地完成支付状态流转。
   */
  setTimeout(() => {
    uni.hideLoading()
    const target = order.value as Order
    const ok = payOrder(target.id)
    if (ok) {
      uni.showToast({ title: '支付成功', icon: 'success' })
      setTimeout(() => {
        uni.redirectTo({ url: '/pages/order-detail/index?id=' + target.id })
      }, 900)
    } else {
      paying = false
      uni.showToast({ title: '支付失败，请重试', icon: 'none' })
    }
  }, 900)
}
</script>

<style scoped>
.page {
  padding-bottom: 180rpx;
}
.amount-card {
  text-align: center;
  padding: 48rpx 24rpx;
}
.amount-label {
  font-size: 24rpx;
  color: #9a968e;
}
.amount-row {
  margin-top: 16rpx;
}
.amount-cur {
  font-size: 36rpx;
  font-weight: 600;
}
.amount-num {
  font-size: 72rpx;
  font-weight: 700;
  letter-spacing: 2rpx;
}
.order-id {
  display: block;
  margin-top: 16rpx;
  font-size: 22rpx;
  color: #9a968e;
}
.pay-item {
  display: flex;
  align-items: center;
  padding: 24rpx 0;
  border-bottom: 2rpx solid #f0ede8;
}
.pay-item:last-child {
  border-bottom: none;
}
.pay-item.disabled {
  opacity: 0.45;
}
.pay-icon {
  width: 64rpx;
  height: 64rpx;
  border-radius: 12rpx;
  text-align: center;
  line-height: 64rpx;
  color: #ffffff;
  font-size: 26rpx;
  flex-shrink: 0;
}
.pay-icon.wechat {
  background: #2aae67;
}
.pay-icon.other {
  background: #9a968e;
}
.pay-info {
  flex: 1;
  margin-left: 24rpx;
  display: flex;
  flex-direction: column;
}
.pay-name {
  font-size: 28rpx;
  font-weight: 600;
}
.pay-desc {
  font-size: 22rpx;
  color: #9a968e;
  margin-top: 6rpx;
}
.pay-check {
  color: #2aae67;
  font-size: 32rpx;
  font-weight: 700;
}
.pay-tip {
  text-align: center;
  font-size: 22rpx;
  color: #b0aba1;
  padding: 8rpx 0;
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
