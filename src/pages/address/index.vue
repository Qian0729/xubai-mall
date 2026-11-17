<template>
  <view class="page">
    <view v-if="addressStore.list.length === 0" class="empty">
      <text>还没有收货地址</text>
    </view>

    <view
      v-for="a in addressStore.list"
      :key="a.id"
      class="card"
      :class="{ picking: isPick }"
      @tap="onPick(a.id)"
    >
      <view class="addr-top">
        <text class="addr-name">{{ a.name }}</text>
        <text class="addr-phone">{{ a.phone }}</text>
        <text v-if="a.isDefault" class="addr-default">默认</text>
      </view>
      <text class="addr-detail">{{ a.region }} {{ a.detail }}</text>
      <view class="ops">
        <text class="op" @tap.stop="setDefault(a.id)">{{ a.isDefault ? '已默认' : '设为默认' }}</text>
        <text class="op" @tap.stop="edit(a.id)">编辑</text>
        <text class="op danger" @tap.stop="del(a.id)">删除</text>
      </view>
    </view>

    <view class="submit-wrap safe-bottom">
      <view class="btn-primary" @tap="addNew">＋ 新增收货地址</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { addressStore, deleteAddress, saveAddress, setPickedAddress } from '../../store'
import type { Address } from '../../data/types'

/** pick=1 表示由下单页打开，点击地址后返回 */
const isPick = ref(false)

onLoad((options) => {
  isPick.value = options && options.pick === '1'
})

function onPick(id: string) {
  if (!isPick.value) return
  setPickedAddress(id)
  uni.navigateBack()
}

function setDefault(id: string) {
  const a = addressStore.list.find((x) => x.id === id)
  if (!a) return
  saveAddress({ ...a, isDefault: true })
}

function edit(id: string) {
  uni.navigateTo({ url: '/pages/address-edit/index?id=' + id })
}

function addNew() {
  uni.navigateTo({ url: '/pages/address-edit/index' })
}

function del(id: string) {
  uni.showModal({
    title: '提示',
    content: '确定删除该地址吗？',
    success: (res) => {
      if (res.confirm) deleteAddress(id)
    }
  })
}
</script>

<style>
.page {
  padding-bottom: 180rpx;
}
.card.picking {
  border: 2rpx solid #1a1a1a;
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
.ops {
  display: flex;
  justify-content: flex-end;
  margin-top: 20rpx;
  border-top: 2rpx solid #f0ede8;
  padding-top: 16rpx;
}
.op {
  font-size: 24rpx;
  color: #6b675f;
  margin-left: 32rpx;
}
.op.danger {
  color: #b5544a;
}
.empty {
  text-align: center;
  color: #9a968e;
  font-size: 28rpx;
  padding: 160rpx 0;
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
</style>
