<template>
  <view class="page">
    <!-- 收货地址 -->
    <view class="card address" @tap="chooseAddress">
      <template v-if="address">
        <view class="addr-top">
          <text class="addr-name">{{ address.name }}</text>
          <text class="addr-phone">{{ address.phone }}</text>
          <text v-if="address.isDefault" class="addr-default">默认</text>
        </view>
        <text class="addr-detail">{{ address.region }} {{ address.detail }}</text>
        <text class="addr-edit">点击更换地址 ›</text>
      </template>
      <template v-else>
        <text class="addr-empty">＋ 请选择收货地址</text>
      </template>
    </view>

    <!-- 商品清单 -->
    <view class="card">
      <text class="label">商品清单</text>
      <view v-for="(row, i) in rows" :key="i" class="row">
        <image class="thumb" :src="row.image" mode="aspectFill" />
        <view class="info">
          <text class="name">{{ row.name }}</text>
          <text class="spec">{{ row.color }} · {{ row.size }} × {{ row.count }}</text>
        </view>
        <text class="price">¥{{ row.price * row.count }}</text>
      </view>
    </view>

    <!-- 合计 -->
    <view class="card total-card">
      <view class="total-row">
        <text>商品金额</text>
        <text>¥{{ total }}</text>
      </view>
      <view class="total-row">
        <text>运费</text>
        <text>免运费</text>
      </view>
      <view class="total-row strong">
        <text>应付合计</text>
        <text class="total-num">¥{{ total }}</text>
      </view>
    </view>

    <view class="mock-tip">
      <text>⚠️ 演示模式：提交订单为模拟操作，不会产生真实支付与扣款</text>
    </view>

    <!-- 提交 -->
    <view class="submit-wrap safe-bottom">
      <view class="btn-primary" @tap="onSubmit">模拟提交订单</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { getGoodsById } from '../../data/goods'
import {
  addressStore,
  cartStore,
  checkedTotal,
  defaultAddress,
  pickedAddressId,
  removeCheckedItems,
  submitMockOrder
} from '../../store'
import type { Address } from '../../data/types'

const address = ref<Address | null>(null)

onShow(() => {
  const picked = pickedAddressId
    ? addressStore.list.find((a) => a.id === pickedAddressId)
    : undefined
  address.value = picked || defaultAddress() || null
})

const rows = computed(() =>
  cartStore.items
    .filter((i) => i.checked)
    .map((i) => {
      const g = getGoodsById(i.goodsId)
      return {
        goodsId: i.goodsId,
        name: g ? g.name : '商品',
        image: g ? g.image : '',
        color: i.color,
        size: i.size,
        count: i.count,
        price: g ? g.price : 0
      }
    })
)

const total = computed(() => checkedTotal.value)

function chooseAddress() {
  uni.navigateTo({ url: '/pages/address/index?pick=1' })
}

function onSubmit() {
  if (!address.value) {
    uni.showToast({ title: '请先选择收货地址', icon: 'none' })
    return
  }
  if (rows.value.length === 0) {
    uni.showToast({ title: '没有可结算的商品', icon: 'none' })
    return
  }
  uni.showModal({
    title: '模拟下单',
    content: '这是演示项目，不会发起真实支付。确认模拟提交订单吗？',
    confirmText: '模拟提交',
    success: (res) => {
      if (!res.confirm) return
      const addr = address.value as Address
      submitMockOrder(
        rows.value.map((r) => ({
          goodsId: r.goodsId,
          name: r.name,
          image: r.image,
          color: r.color,
          size: r.size,
          count: r.count,
          price: r.price
        })),
        total.value,
        addr
      )
      removeCheckedItems()
      uni.showToast({ title: '模拟下单成功', icon: 'success' })
      setTimeout(() => {
        uni.redirectTo({ url: '/pages/orders/index' })
      }, 900)
    }
  })
}
</script>

<style scoped>
.page {
  padding-bottom: 180rpx;
}
.address {
  position: relative;
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
.addr-default {
  margin-left: 16rpx;
  font-size: 20rpx;
  color: #ffffff;
  background: #1a1a1a;
  border-radius: 8rpx;
  padding: 2rpx 12rpx;
}
.addr-detail {
  display: block;
  font-size: 26rpx;
  color: #6b675f;
  margin-top: 12rpx;
}
.addr-edit {
  display: block;
  font-size: 22rpx;
  color: #9a968e;
  margin-top: 12rpx;
}
.addr-empty {
  font-size: 28rpx;
  color: #9a968e;
}
.label {
  display: block;
  font-size: 28rpx;
  font-weight: 600;
  margin-bottom: 20rpx;
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
  border-top: 2rpx solid #f0ede8;
  margin-top: 10rpx;
  padding-top: 20rpx;
}
.total-num {
  font-size: 32rpx;
  font-weight: 700;
}
.mock-tip {
  text-align: center;
  font-size: 22rpx;
  color: #b0aba1;
  padding: 10rpx 0;
  line-height: 1.6;
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
