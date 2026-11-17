<template>
  <view class="page">
    <!-- 分类标签 -->
    <scroll-view scroll-x class="tabs">
      <view
        v-for="c in tabs"
        :key="c.key"
        class="tab"
        :class="{ active: c.key === activeTab }"
        @tap="activeTab = c.key"
      >
        {{ c.label }}
      </view>
    </scroll-view>

    <!-- 筛选栏：价格排序 -->
    <view class="filter">
      <picker :range="sortOptions" @change="onSortChange">
        <view class="filter-item">
          <text>{{ sortOptions[sortIndex] }}</text>
          <text class="filter-arrow">▾</text>
        </view>
      </picker>
      <picker :range="colorOptions" @change="onColorChange">
        <view class="filter-item">
          <text>{{ colorOptions[colorIndex] }}</text>
          <text class="filter-arrow">▾</text>
        </view>
      </picker>
    </view>

    <!-- 商品列表 -->
    <view class="list">
      <view
        v-for="g in filtered"
        :key="g.id"
        class="item"
        @tap="goDetail(g.id)"
      >
        <image class="item-img" :src="g.image" mode="aspectFill" />
        <view class="item-info">
          <text class="item-name">{{ g.name }}</text>
          <text class="item-desc">{{ g.description }}</text>
          <view class="item-bottom">
            <text class="item-price">¥{{ g.price }}</text>
            <text class="item-material">{{ g.material }}</text>
          </view>
        </view>
      </view>
      <view v-if="filtered.length === 0" class="empty">
        <text>该分类下暂无符合条件的商品</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { categories, goodsList } from '../../data/goods'
import type { CategoryKey } from '../../data/types'

const tabs = [{ key: 'all' as const, label: '全部' }, ...categories]
const activeTab = ref<CategoryKey | 'all'>('all')

// 支持从首页品类导航直达对应分类
onShow(() => {
  try {
    const entry = uni.getStorageSync('xubai_cat_entry')
    if (entry && tabs.some((t) => t.key === entry)) {
      activeTab.value = entry as CategoryKey
    }
    uni.removeStorageSync('xubai_cat_entry')
  } catch (e) {
    /* 忽略 */
  }
})

const sortOptions = ['默认排序', '价格从低到高', '价格从高到低']
const sortIndex = ref(0)

const colorOptions = ['全部颜色', '白色 / 米色系', '灰色系', '黑色系']
const colorIndex = ref(0)

function matchColor(g: (typeof goodsList)[number]): boolean {
  if (colorIndex.value === 0) return true
  const c = g.colors[0] || ''
  if (colorIndex.value === 1) return c.includes('白') || c.includes('米')
  if (colorIndex.value === 2) return c.includes('灰')
  return c.includes('黑')
}

const filtered = computed(() => {
  let list = goodsList.filter(
    (g) => (activeTab.value === 'all' || g.category === activeTab.value) && matchColor(g)
  )
  if (sortIndex.value === 1) list = [...list].sort((a, b) => a.price - b.price)
  if (sortIndex.value === 2) list = [...list].sort((a, b) => b.price - a.price)
  return list
})

function onSortChange(e: { detail: { value: string | number } }) {
  sortIndex.value = Number(e.detail.value)
}
function onColorChange(e: { detail: { value: string | number } }) {
  colorIndex.value = Number(e.detail.value)
}

function goDetail(id: string) {
  uni.navigateTo({ url: '/pages/detail/index?id=' + id })
}
</script>

<style scoped>
.tabs {
  white-space: nowrap;
  padding: 24rpx 20rpx;
}
.tab {
  display: inline-block;
  padding: 12rpx 36rpx;
  margin: 0 8rpx;
  font-size: 28rpx;
  color: #6b675f;
  background: #ffffff;
  border-radius: 36rpx;
}
.tab.active {
  background: #1a1a1a;
  color: #ffffff;
}
.filter {
  display: flex;
  padding: 0 32rpx 20rpx;
}
.filter-item {
  display: inline-flex;
  align-items: center;
  font-size: 24rpx;
  color: #6b675f;
  background: #ffffff;
  border-radius: 12rpx;
  padding: 10rpx 24rpx;
  margin-right: 16rpx;
}
.filter-arrow {
  margin-left: 8rpx;
  font-size: 20rpx;
}
.list {
  padding: 0 20rpx;
}
.item {
  display: flex;
  background: #ffffff;
  border-radius: 20rpx;
  padding: 20rpx;
  margin-bottom: 20rpx;
}
.item-img {
  width: 220rpx;
  height: 220rpx;
  border-radius: 12rpx;
  flex-shrink: 0;
}
.item-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 24rpx;
  overflow: hidden;
}
.item-name {
  font-size: 28rpx;
  font-weight: 600;
}
.item-desc {
  font-size: 22rpx;
  color: #9a968e;
  margin-top: 10rpx;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.item-bottom {
  margin-top: auto;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}
.item-price {
  font-size: 30rpx;
  font-weight: 600;
}
.item-material {
  font-size: 20rpx;
  color: #9a968e;
}
.empty {
  text-align: center;
  color: #9a968e;
  padding: 120rpx 0;
}

@media (min-width: 768px) {

  .page {
    max-width: 860px;
    margin: 0 auto;
  }
  .item-img {
    width: 180px;
    height: 180px;
  }
  .item {
    padding: 24rpx;
  }
}
</style>
