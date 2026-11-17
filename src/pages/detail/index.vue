<template>
  <view v-if="goods" class="page">
    <!-- 图片轮播 -->
    <swiper class="swiper" circular indicator-dots indicator-color="rgba(26,26,26,0.2)" indicator-active-color="#1a1a1a">
      <swiper-item v-for="(img, i) in goods.images" :key="i">
        <image class="swiper-img" :src="img" mode="aspectFill" @tap="preview(i)" />
      </swiper-item>
    </swiper>

    <!-- 价格信息 -->
    <view class="card">
      <view class="price-row">
        <text class="price">¥{{ goods.price }}</text>
        <text v-if="goods.originalPrice" class="origin">¥{{ goods.originalPrice }}</text>
        <text v-if="goods.isNew" class="tag">NEW</text>
      </view>
      <text class="name">{{ goods.name }}</text>
      <text class="material">{{ goods.material }}</text>
    </view>

    <!-- 规格 -->
    <view class="card">
      <text class="label">颜色</text>
      <view class="chips">
        <view
          v-for="c in goods.colors"
          :key="c"
          class="chip"
          :class="{ active: c === color }"
          @tap="color = c"
        >{{ c }}</view>
      </view>

      <text class="label">尺码</text>
      <view class="chips">
        <view
          v-for="s in goods.sizes"
          :key="s"
          class="chip"
          :class="{ active: s === size }"
          @tap="size = s"
        >{{ s }}</view>
      </view>

      <text class="label">数量</text>
      <view class="stepper">
        <view class="step-btn" @tap="changeCount(-1)">−</view>
        <text class="step-num">{{ count }}</text>
        <view class="step-btn" @tap="changeCount(1)">＋</view>
      </view>
    </view>

    <!-- 详情 -->
    <view class="card">
      <text class="label">商品详情</text>
      <text class="desc">{{ goods.description }}</text>
      <view v-if="goods.care" class="care">
        <text class="care-label">洗护建议</text>
        <text class="care-text">{{ goods.care }}</text>
      </view>
    </view>

    <!-- 尺码表 -->
    <view v-if="goods.sizeTable" class="card">
      <text class="label">{{ goods.sizeTable.title }}</text>
      <view class="size-table">
        <view class="size-row size-head">
          <text v-for="h in goods.sizeTable.header" :key="h" class="size-cell">{{ h }}</text>
        </view>
        <view v-for="(row, ri) in goods.sizeTable.rows" :key="ri" class="size-row">
          <text v-for="(cell, ci) in row" :key="ci" class="size-cell">{{ cell }}</text>
        </view>
      </view>
    </view>

    <!-- 服务保障 -->
    <view class="card service-card">
      <text class="label">服务保障</text>
      <view class="service-list">
        <text v-for="s in services" :key="s" class="service-tag">{{ s }}</text>
      </view>
    </view>

    <!-- 底部操作栏 -->
    <view class="bottom-bar safe-bottom">
      <view class="bar-cart" @tap="goCart">
        <text>购物车</text>
      </view>
      <view class="bar-btn ghost" @tap="onAddCart">加入购物车</view>
      <view class="bar-btn primary" @tap="onBuyNow">立即购买</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getGoodsById, services } from '../../data/goods'
import { addToCart } from '../../store'
import type { Goods } from '../../data/types'

const goods = ref<Goods | null>(null)
const color = ref('')
const size = ref('')
const count = ref(1)

onLoad((options) => {
  const id = (options && options.id) || ''
  const g = getGoodsById(id)
  if (g) {
    goods.value = g
    color.value = g.colors[0]
    size.value = g.sizes[0]
    uni.setNavigationBarTitle({ title: g.name })
  } else {
    uni.showToast({ title: '商品不存在', icon: 'none' })
  }
})

function changeCount(delta: number) {
  count.value = Math.max(1, Math.min(99, count.value + delta))
}

function ensureSelected(): boolean {
  if (!goods.value) return false
  if (!color.value || !size.value) {
    uni.showToast({ title: '请选择颜色与尺码', icon: 'none' })
    return false
  }
  return true
}

function onAddCart() {
  if (!ensureSelected() || !goods.value) return
  addToCart(goods.value, color.value, size.value, count.value)
  uni.showToast({ title: '已加入购物车', icon: 'success' })
}

function onBuyNow() {
  if (!ensureSelected() || !goods.value) return
  addToCart(goods.value, color.value, size.value, count.value)
  uni.switchTab({ url: '/pages/cart/index' })
}

function goCart() {
  uni.switchTab({ url: '/pages/cart/index' })
}

function preview(index: number) {
  if (!goods.value) return
  uni.previewImage({ current: index, urls: goods.value.images })
}
</script>

<style scoped>
.page {
  padding-bottom: 160rpx;
}
.swiper {
  width: 100%;
  height: 750rpx;
  background: #ffffff;
}
.swiper-img {
  width: 100%;
  height: 100%;
}
.price-row {
  display: flex;
  align-items: baseline;
}
.price {
  font-size: 44rpx;
  font-weight: 700;
}
.origin {
  font-size: 24rpx;
  color: #9a968e;
  text-decoration: line-through;
  margin-left: 16rpx;
}
.tag {
  margin-left: auto;
  background: #1a1a1a;
  color: #ffffff;
  font-size: 20rpx;
  padding: 4rpx 16rpx;
  border-radius: 20rpx;
}
.name {
  display: block;
  font-size: 32rpx;
  font-weight: 600;
  margin-top: 16rpx;
}
.material {
  display: block;
  font-size: 24rpx;
  color: #9a968e;
  margin-top: 8rpx;
}
.label {
  display: block;
  font-size: 26rpx;
  color: #6b675f;
  margin: 20rpx 0 12rpx;
}
.chips {
  display: flex;
  flex-wrap: wrap;
}
.chip {
  padding: 12rpx 32rpx;
  border: 2rpx solid #e8e5df;
  border-radius: 12rpx;
  margin: 0 16rpx 16rpx 0;
  font-size: 26rpx;
}
.chip.active {
  border-color: #1a1a1a;
  background: #1a1a1a;
  color: #ffffff;
}
.stepper {
  display: inline-flex;
  align-items: center;
  border: 2rpx solid #e8e5df;
  border-radius: 12rpx;
  overflow: hidden;
}
.step-btn {
  width: 64rpx;
  height: 64rpx;
  line-height: 64rpx;
  text-align: center;
  font-size: 32rpx;
}
.step-num {
  width: 80rpx;
  text-align: center;
  font-size: 28rpx;
}
.desc {
  font-size: 26rpx;
  color: #6b675f;
  line-height: 1.7;
}
.care {
  margin-top: 24rpx;
  padding-top: 20rpx;
  border-top: 2rpx solid #f0ede8;
}
.care-label {
  display: block;
  font-size: 24rpx;
  color: #6b675f;
  margin-bottom: 8rpx;
}
.care-text {
  font-size: 24rpx;
  color: #9a968e;
}
.size-table {
  border: 2rpx solid #f0ede8;
  border-radius: 12rpx;
  overflow: hidden;
}
.size-row {
  display: flex;
  border-bottom: 2rpx solid #f0ede8;
}
.size-row:last-child {
  border-bottom: none;
}
.size-head {
  background: #f7f5f0;
}
.size-cell {
  flex: 1;
  text-align: center;
  font-size: 24rpx;
  color: #1a1a1a;
  padding: 14rpx 4rpx;
}
.size-head .size-cell {
  color: #6b675f;
  font-size: 22rpx;
}
.service-list {
  display: flex;
  flex-wrap: wrap;
}
.service-tag {
  font-size: 22rpx;
  color: #6b675f;
  background: #f7f5f0;
  border-radius: 8rpx;
  padding: 8rpx 18rpx;
  margin: 0 12rpx 12rpx 0;
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
.bar-cart {
  width: 130rpx;
  text-align: center;
  font-size: 24rpx;
  color: #6b675f;
}
.bar-btn {
  flex: 1;
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  border-radius: 40rpx;
  font-size: 28rpx;
  margin-left: 16rpx;
}
.bar-btn.ghost {
  border: 2rpx solid #1a1a1a;
  color: #1a1a1a;
}
.bar-btn.primary {
  background: #1a1a1a;
  color: #ffffff;
}

@media (min-width: 768px) {

  .page {
    max-width: 860px;
    margin: 0 auto;
  }
  .page {
    padding-bottom: 140px;
  }
  .swiper {
    height: 560px;
  }

  .bottom-bar {
    left: 50%;
    right: auto;
    transform: translateX(-50%);
    width: 100%;
    max-width: 860px;
  }
}
</style>
