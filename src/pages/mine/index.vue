<template>
  <view class="page">
    <!-- 用户卡片（演示账号） -->
    <view class="card user">
      <view class="avatar">序</view>
      <view class="user-info">
        <text class="username">序白用户</text>
        <text class="user-tip">序白 · 尊享会员</text>
      </view>
    </view>

    <!-- 订单入口 -->
    <view class="card">
      <view class="cell" @tap="go('/pages/orders/index')">
        <text class="cell-title">我的订单</text>
        <text class="cell-right">{{ orderStore.list.length }} 单 ›</text>
      </view>
      <view class="cell" @tap="go('/pages/address/index')">
        <text class="cell-title">地址管理</text>
        <text class="cell-right">{{ addressStore.list.length }} 个 ›</text>
      </view>
    </view>

    <!-- 关于 -->
    <view class="card">
      <view class="cell" @tap="showAbout">
        <text class="cell-title">关于序白</text>
        <text class="cell-right">›</text>
      </view>
    </view>

    <view class="footer">
      <text>序白 XU BAI · 简约生活</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { orderStore, addressStore } from '../../store'

function go(url: string) {
  uni.navigateTo({ url })
}

function showAbout() {
  uni.showModal({
    title: '关于序白',
    content: '「序白 XU BAI」—— 把复杂留给世界，把简单留给衣橱。精选天然面料与利落剪裁，为年轻人打造一衣多穿的简约衣橱。',
    showCancel: false,
    confirmText: '知道了'
  })
}
</script>

<style scoped>
.page {
  padding-bottom: 40rpx;
}
.user {
  display: flex;
  align-items: center;
}
.avatar {
  width: 110rpx;
  height: 110rpx;
  border-radius: 50%;
  background: #1a1a1a;
  color: #ffffff;
  font-size: 44rpx;
  text-align: center;
  line-height: 110rpx;
}
.user-info {
  margin-left: 24rpx;
  display: flex;
  flex-direction: column;
}
.username {
  font-size: 32rpx;
  font-weight: 600;
}
.user-tip {
  font-size: 22rpx;
  color: #9a968e;
  margin-top: 8rpx;
}
.cell {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 28rpx 8rpx;
  border-bottom: 2rpx solid #f0ede8;
}
.cell:last-child {
  border-bottom: none;
}
.cell-title {
  font-size: 28rpx;
}
.cell-right {
  font-size: 24rpx;
  color: #9a968e;
}
.footer {
  text-align: center;
  color: #9a968e;
  font-size: 22rpx;
  padding: 40rpx 0;
}

@media (min-width: 768px) {

  .page {
    max-width: 860px;
    margin: 0 auto;
  }
}
</style>
