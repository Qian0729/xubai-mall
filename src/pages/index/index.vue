<template>
  <view class="page">
    <!-- 品牌海报 -->
    <view class="hero">
      <image class="hero-img" src="/static/images/poster.png" mode="aspectFill" />
      <view class="hero-mask">
        <view class="hero-brand">
          <text class="hero-logo">序白</text>
          <text class="hero-en">XU BAI · ESSENTIALS</text>
          <text class="hero-slogan">把复杂留给世界，把简单留给衣橱</text>
        </view>
      </view>
    </view>

    <!-- 品类导航 -->
    <view class="cat-nav">
      <view
        v-for="c in categories"
        :key="c.key"
        class="cat-item"
        @tap="goCategory(c.key)"
      >
        <text class="cat-name">{{ c.label }}</text>
        <text class="cat-en">{{ catEn[c.key] }}</text>
      </view>
    </view>

    <!-- 服务保障 -->
    <view class="service-strip">
      <text v-for="s in services" :key="s" class="service-item">✓ {{ s }}</text>
    </view>

    <!-- 新品推荐 -->
    <view class="section">
      <view class="section-head">
        <text class="section-title">新品推荐</text>
        <text class="section-more" @tap="goCategory">查看全部 ›</text>
      </view>
      <scroll-view scroll-x class="hscroll">
        <view v-for="g in newGoods" :key="g.id" class="hcard" @tap="goDetail(g.id)">
          <image class="hcard-img" :src="g.image" mode="aspectFill" />
          <text class="hcard-name">{{ g.name }}</text>
          <text class="hcard-price">¥{{ g.price }}</text>
        </view>
      </scroll-view>
    </view>

    <!-- 商品列表 -->
    <view class="section">
      <view class="section-head">
        <text class="section-title">全部商品</text>
      </view>
      <view class="grid">
        <view v-for="g in goodsList" :key="g.id" class="gcard" @tap="goDetail(g.id)">
          <view class="gcard-imgwrap">
            <image class="gcard-img" :src="g.image" mode="aspectFill" />
            <text v-if="g.isNew" class="gcard-tag">NEW</text>
          </view>
          <text class="gcard-name">{{ g.name }}</text>
          <view class="gcard-bottom">
            <text class="gcard-price">¥{{ g.price }}</text>
            <text v-if="g.originalPrice" class="gcard-origin">¥{{ g.originalPrice }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 品牌故事 -->
    <view class="story">
      <text class="story-title">序白的故事</text>
      <text class="story-line">「序」是次序，是取舍；「白」是留白，是本真。</text>
      <text class="story-text">我们相信衣橱不需要太多，只需要几件足够好的。序白精选天然面料，以利落的剪裁与克制的配色，为年轻人打造一衣多穿的简约衣橱——把复杂留给世界，把简单留给自己。</text>
    </view>

    <view class="footer">
      <text>序白 XU BAI · 简约生活</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { categories, goodsList, services } from '../../data/goods'
import type { CategoryKey } from '../../data/types'

const newGoods = goodsList.filter((g) => g.isNew)

const catEn: Record<CategoryKey, string> = {
  tops: 'TOPS',
  knitwear: 'KNITWEAR',
  dresses: 'DRESSES',
  pants: 'PANTS',
  coats: 'OUTERWEAR',
  accessories: 'ACCESSORIES'
}

function goDetail(id: string) {
  uni.navigateTo({ url: '/pages/detail/index?id=' + id })
}

function goCategory(key?: CategoryKey) {
  uni.switchTab({ url: '/pages/category/index' })
  if (key) {
    // 分类页通过本地存储感知入口品类
    try {
      uni.setStorageSync('xubai_cat_entry', key)
    } catch (e) {
      /* 忽略 */
    }
  }
}
</script>

<style scoped>
.page {
  padding-bottom: 40rpx;
}
.hero {
  position: relative;
  width: 100%;
  height: 640rpx;
}
.hero-img {
  width: 100%;
  height: 100%;
}
.hero-mask {
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 60rpx 40rpx;
  background: linear-gradient(to top, rgba(247, 245, 240, 0.95), rgba(247, 245, 240, 0));
}
.hero-brand {
  display: flex;
  flex-direction: column;
}
.hero-logo {
  font-size: 64rpx;
  font-weight: 700;
  letter-spacing: 12rpx;
  color: #1a1a1a;
}
.hero-en {
  font-size: 20rpx;
  color: #9a968e;
  letter-spacing: 6rpx;
  margin-top: 8rpx;
}
.hero-slogan {
  font-size: 26rpx;
  color: #6b675f;
  margin-top: 16rpx;
}
.section {
  margin-top: 40rpx;
}
.section-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: 0 32rpx 20rpx;
}
.section-title {
  font-size: 34rpx;
  font-weight: 600;
}
.section-more {
  font-size: 24rpx;
  color: #9a968e;
}
.hscroll {
  white-space: nowrap;
  padding: 0 20rpx;
}
.hcard {
  display: inline-block;
  width: 260rpx;
  margin: 0 12rpx;
  background: #ffffff;
  border-radius: 20rpx;
  overflow: hidden;
  vertical-align: top;
}
.hcard-img {
  width: 260rpx;
  height: 300rpx;
}
.hcard-name {
  display: block;
  font-size: 24rpx;
  padding: 16rpx 16rpx 4rpx;
  color: #1a1a1a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.hcard-price {
  display: block;
  font-size: 26rpx;
  font-weight: 600;
  padding: 0 16rpx 16rpx;
}
.grid {
  display: flex;
  flex-wrap: wrap;
  padding: 0 20rpx;
}
.gcard {
  width: calc(50% - 12rpx);
  margin: 6rpx;
  background: #ffffff;
  border-radius: 20rpx;
  overflow: hidden;
}
.gcard-imgwrap {
  position: relative;
}
.gcard-img {
  width: 100%;
  height: 360rpx;
}
.gcard-tag {
  position: absolute;
  top: 16rpx;
  left: 16rpx;
  background: #1a1a1a;
  color: #ffffff;
  font-size: 20rpx;
  padding: 4rpx 14rpx;
  border-radius: 20rpx;
}
.gcard-name {
  display: block;
  font-size: 24rpx;
  padding: 16rpx 16rpx 4rpx;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.gcard-bottom {
  display: flex;
  align-items: baseline;
  padding: 0 16rpx 16rpx;
}
.gcard-price {
  font-size: 28rpx;
  font-weight: 600;
}
.gcard-origin {
  font-size: 20rpx;
  color: #9a968e;
  text-decoration: line-through;
  margin-left: 12rpx;
}
.footer {
  text-align: center;
  color: #9a968e;
  font-size: 22rpx;
  padding: 40rpx 0;
}
.cat-nav {
  display: flex;
  padding: 24rpx 20rpx 0;
}
.cat-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ffffff;
  border-radius: 16rpx;
  padding: 22rpx 0;
  margin: 0 8rpx;
}
.cat-name {
  font-size: 28rpx;
  font-weight: 600;
}
.cat-en {
  font-size: 16rpx;
  color: #b0aba1;
  letter-spacing: 2rpx;
  margin-top: 8rpx;
}
.service-strip {
  display: flex;
  justify-content: space-between;
  padding: 20rpx 40rpx 0;
}
.service-item {
  font-size: 22rpx;
  color: #6b675f;
}
.story {
  margin: 40rpx 20rpx 0;
  background: #1a1a1a;
  border-radius: 20rpx;
  padding: 48rpx 40rpx;
}
.story-title {
  display: block;
  color: #ffffff;
  font-size: 32rpx;
  font-weight: 600;
  letter-spacing: 6rpx;
}
.story-line {
  display: block;
  color: #cfcbc3;
  font-size: 24rpx;
  margin-top: 20rpx;
  letter-spacing: 2rpx;
}
.story-text {
  display: block;
  color: #9a968e;
  font-size: 24rpx;
  line-height: 1.8;
  margin-top: 16rpx;
}

@media (min-width: 768px) {
  .page {
    max-width: 1000px;
    margin: 0 auto;
  }
  .hero {
    height: 600px;
  }
  .hcard {
    width: 280px;
  }
  .hcard-img {
    width: 280px;
    height: 320px;
  }
  .grid .gcard {
    width: calc(25% - 12rpx);
  }
  .gcard-img {
    height: 300px;
  }
  .gcard-name {
    font-size: 26rpx;
  }
}
</style>
