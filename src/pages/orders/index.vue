<template>
  <view class="page">
    <!-- 模拟标注 -->
    <view class="mock-banner">
      <text>以下订单均为本地模拟数据，不涉及真实交易</text>
    </view>

    <view v-if="orderStore.list.length === 0" class="empty">
      <text>暂无订单</text>
      <view class="btn-primary empty-btn" @tap="goHome">去逛逛</view>
    </view>

    <view
      v-for="o in orderStore.list"
      :key="o.id"
      class="card"
      @tap="goDetail(o.id)"
    >
      <view class="head">
        <text class="order-id">订单号 {{ o.id }}</text>
        <text class="status" :class="{ paid: o.status.includes('已支付') }">{{ o.status }}</text>
      </view>
      <view class="thumbs">
        <image
          v-for="(it, i) in o.items.slice(0, 3)"
          :key="i"
          class="thumb"
          :src="it.image"
          mode="aspectFill"
        />
        <text v-if="o.items.length > 3" class="more">+{{ o.items.length - 3 }}</text>
      </view>
      <view class="foot">
        <text class="time">{{ formatTime(o.createdAt) }}</text>
        <text class="total">合计 ¥{{ o.total }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { orderStore } from '../../store'

function formatTime(ts: number): string {
  const d = new Date(ts)
  const p = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`
}

function goDetail(id: string) {
  uni.navigateTo({ url: '/pages/order-detail/index?id=' + id })
}

function goHome() {
  uni.switchTab({ url: '/pages/index/index' })
}
</script>

<style>
.page {
  padding-bottom: 40rpx;
}
.mock-banner {
  background: #fff7e6;
  color: #a9762a;
  font-size: 22rpx;
  text-align: center;
  padding: 16rpx;
}
.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 200rpx 0;
  color: #9a968e;
  font-size: 28rpx;
}
.empty-btn {
  margin-top: 40rpx;
  width: 240rpx;
}
.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.order-id {
  font-size: 24rpx;
  color: #6b675f;
}
.status {
  font-size: 22rpx;
  color: #a9762a;
  background: #fff7e6;
  padding: 4rpx 16rpx;
  border-radius: 8rpx;
}
.status.paid {
  color: #4c8055;
  background: #eef7ef;
}
.thumbs {
  display: flex;
  align-items: center;
  margin: 20rpx 0;
}
.thumb {
  width: 120rpx;
  height: 120rpx;
  border-radius: 12rpx;
  margin-right: 16rpx;
}
.more {
  font-size: 24rpx;
  color: #9a968e;
}
.foot {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
.time {
  font-size: 22rpx;
  color: #9a968e;
}
.total {
  font-size: 28rpx;
  font-weight: 700;
}
</style>
