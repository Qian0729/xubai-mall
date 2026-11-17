<template>
  <view class="page">
    <!-- 状态筛选 -->
    <scroll-view scroll-x class="filter-tabs">
      <view
        v-for="t in tabs"
        :key="t.key"
        class="ftab"
        :class="{ active: t.key === activeTab }"
        @tap="activeTab = t.key"
      >{{ t.label }}</view>
    </scroll-view>

    <view v-if="filtered.length === 0" class="empty">
      <text class="empty-icon">🧺</text>
      <text>暂无相关订单</text>
      <view class="btn-primary empty-btn" @tap="goHome">去逛逛</view>
    </view>

    <view v-for="o in filtered" :key="o.id" class="card" @tap="goDetail(o.id)">
      <view class="head">
        <text class="order-id">订单号 {{ o.id }}</text>
        <text class="status" :class="'st-' + statusKey(o.status)">{{ o.status }}</text>
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
        <view class="foot-right">
          <text class="total">合计 ¥{{ o.total }}</text>
          <view v-if="o.status === '待付款'" class="mini-pay" @tap.stop="goPay(o.id)">去支付</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { orderStore } from '../../store'
import type { OrderStatus } from '../../data/types'

const tabs: { key: 'all' | OrderStatus; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: '待付款', label: '待付款' },
  { key: '待发货', label: '待发货' },
  { key: '已发货', label: '已发货' },
  { key: '已完成', label: '已完成' }
]
const activeTab = ref<'all' | OrderStatus>('all')

const filtered = computed(() =>
  activeTab.value === 'all'
    ? orderStore.list
    : orderStore.list.filter((o) => o.status === activeTab.value)
)

function statusKey(s: OrderStatus): string {
  return { 待付款: 'pay', 待发货: 'ship', 已发货: 'transit', 已完成: 'done', 已取消: 'cancel' }[s]
}

function formatTime(ts: number): string {
  const d = new Date(ts)
  const p = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`
}

function goDetail(id: string) {
  uni.navigateTo({ url: '/pages/order-detail/index?id=' + id })
}

function goPay(id: string) {
  uni.navigateTo({ url: '/pages/pay/index?id=' + id })
}

function goHome() {
  uni.switchTab({ url: '/pages/index/index' })
}
</script>

<style scoped>
.page {
  padding-bottom: 40rpx;
}
.filter-tabs {
  white-space: nowrap;
  padding: 20rpx 20rpx 8rpx;
}
.ftab {
  display: inline-block;
  padding: 10rpx 30rpx;
  margin: 0 8rpx;
  font-size: 26rpx;
  color: #6b675f;
  background: #ffffff;
  border-radius: 30rpx;
}
.ftab.active {
  background: #1a1a1a;
  color: #ffffff;
}
.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 160rpx 0;
  color: #9a968e;
  font-size: 28rpx;
}
.empty-icon {
  font-size: 72rpx;
  margin-bottom: 20rpx;
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
  padding: 4rpx 16rpx;
  border-radius: 8rpx;
}
.st-pay {
  color: #a9762a;
  background: #fff7e6;
}
.st-ship {
  color: #4a6ea9;
  background: #edf3fb;
}
.st-transit {
  color: #4a6ea9;
  background: #edf3fb;
}
.st-done {
  color: #4c8055;
  background: #eef7ef;
}
.st-cancel {
  color: #9a968e;
  background: #f0ede8;
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
  align-items: center;
}
.time {
  font-size: 22rpx;
  color: #9a968e;
}
.foot-right {
  display: flex;
  align-items: center;
}
.total {
  font-size: 28rpx;
  font-weight: 700;
}
.mini-pay {
  margin-left: 20rpx;
  background: #1a1a1a;
  color: #ffffff;
  font-size: 22rpx;
  padding: 8rpx 24rpx;
  border-radius: 26rpx;
}
@media (min-width: 768px) {
  .page {
    max-width: 860px;
    margin: 0 auto;
  }
}
</style>
