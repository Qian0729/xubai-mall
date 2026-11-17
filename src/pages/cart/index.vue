<template>
  <view class="page">
    <view v-if="cartStore.items.length === 0" class="empty">
      <text class="empty-icon">🧺</text>
      <text>购物车还是空的</text>
      <view class="btn-primary empty-btn" @tap="goHome">去逛逛</view>
    </view>

    <template v-else>
      <view class="list">
        <view v-for="(item, index) in cartStore.items" :key="item.goodsId + item.color + item.size" class="row card">
          <view
            class="check"
            :class="{ checked: item.checked }"
            @tap="toggleChecked(index, !item.checked)"
          >✓</view>
          <image class="thumb" :src="goodsOf(item).image" mode="aspectFill" />
          <view class="info">
            <text class="name">{{ goodsOf(item).name }}</text>
            <text class="spec">{{ item.color }} · {{ item.size }}</text>
            <view class="info-bottom">
              <text class="price">¥{{ goodsOf(item).price }}</text>
              <view class="stepper">
                <view class="step-btn" @tap="changeCount(index, -1)">−</view>
                <text class="step-num">{{ item.count }}</text>
                <view class="step-btn" @tap="changeCount(index, 1)">＋</view>
              </view>
            </view>
          </view>
          <text class="del" @tap="del(index)">删除</text>
        </view>
      </view>

      <view class="mock-tip">
        <text>演示说明：购物车数据保存在本机，不会上传</text>
      </view>

      <!-- 底部结算栏 -->
      <view class="bottom-bar safe-bottom">
        <view class="check" :class="{ checked: allChecked }" @tap="toggleAll">✓</view>
        <text class="all-label">全选</text>
        <view class="total">
          <text>合计：</text>
          <text class="total-num">¥{{ checkedTotal }}</text>
        </view>
        <view class="settle" :class="{ disabled: checkedCount === 0 }" @tap="goCheckout">
          结算({{ checkedCount }})
        </view>
      </view>
    </template>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { CartItem } from '../../data/types'
import { getGoodsById } from '../../data/goods'
import {
  cartStore,
  checkedTotal,
  checkedCount,
  toggleChecked,
  updateCartCount,
  removeFromCart,
  toggleAllChecked
} from '../../store'

function goodsOf(item: CartItem) {
  const g = getGoodsById(item.goodsId)
  // 购物车内的商品 id 均来自模拟数据，理论必命中；兜底避免空引用
  return g || { image: '/static/images/tee-white-1.png', name: '商品', price: 0 }
}

const allChecked = computed(() => cartStore.items.length > 0 && cartStore.items.every((i) => i.checked))

function toggleAll() {
  toggleAllChecked(!allChecked.value)
}

function changeCount(index: number, delta: number) {
  const item = cartStore.items[index]
  updateCartCount(index, item.count + delta)
}

function del(index: number) {
  uni.showModal({
    title: '提示',
    content: '确定移除该商品吗？',
    success: (res) => {
      if (res.confirm) removeFromCart(index)
    }
  })
}

function goHome() {
  uni.switchTab({ url: '/pages/index/index' })
}

function goCheckout() {
  if (checkedCount.value === 0) {
    uni.showToast({ title: '请先勾选商品', icon: 'none' })
    return
  }
  uni.navigateTo({ url: '/pages/checkout/index' })
}
</script>

<style>
.page {
  padding-bottom: 160rpx;
}
.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 200rpx 0;
  color: #9a968e;
  font-size: 28rpx;
}
.empty-icon {
  font-size: 80rpx;
  margin-bottom: 24rpx;
}
.empty-btn {
  margin-top: 40rpx;
  width: 240rpx;
}
.list {
  padding: 20rpx 0 0;
}
.row {
  display: flex;
  align-items: center;
  position: relative;
}
.check {
  width: 40rpx;
  height: 40rpx;
  line-height: 40rpx;
  text-align: center;
  border: 2rpx solid #c9c4bb;
  border-radius: 50%;
  color: transparent;
  font-size: 24rpx;
  flex-shrink: 0;
}
.check.checked {
  background: #1a1a1a;
  border-color: #1a1a1a;
  color: #ffffff;
}
.thumb {
  width: 160rpx;
  height: 160rpx;
  border-radius: 12rpx;
  margin: 0 20rpx;
  flex-shrink: 0;
}
.info {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.name {
  font-size: 26rpx;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 60rpx;
}
.spec {
  font-size: 22rpx;
  color: #9a968e;
  margin-top: 8rpx;
}
.info-bottom {
  margin-top: 16rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.price {
  font-size: 28rpx;
  font-weight: 600;
}
.stepper {
  display: inline-flex;
  align-items: center;
  border: 2rpx solid #e8e5df;
  border-radius: 12rpx;
  overflow: hidden;
}
.step-btn {
  width: 52rpx;
  height: 52rpx;
  line-height: 52rpx;
  text-align: center;
  font-size: 28rpx;
}
.step-num {
  width: 64rpx;
  text-align: center;
  font-size: 26rpx;
}
.del {
  position: absolute;
  top: 20rpx;
  right: 24rpx;
  font-size: 22rpx;
  color: #9a968e;
}
.mock-tip {
  text-align: center;
  font-size: 22rpx;
  color: #b0aba1;
  padding: 10rpx 0;
}
.bottom-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: #ffffff;
  display: flex;
  align-items: center;
  padding: 16rpx 24rpx;
  box-shadow: 0 -4rpx 16rpx rgba(0, 0, 0, 0.04);
}
.all-label {
  margin-left: 12rpx;
  font-size: 24rpx;
  color: #6b675f;
}
.total {
  margin-left: auto;
  font-size: 26rpx;
}
.total-num {
  font-size: 32rpx;
  font-weight: 700;
}
.settle {
  margin-left: 24rpx;
  background: #1a1a1a;
  color: #ffffff;
  font-size: 28rpx;
  padding: 20rpx 44rpx;
  border-radius: 44rpx;
}
.settle.disabled {
  opacity: 0.4;
}
</style>