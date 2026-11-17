<template>
  <view class="page">
    <view class="card">
      <view class="form-row">
        <text class="form-label">收货人</text>
        <input v-model="form.name" class="form-input" placeholder="请输入姓名" />
      </view>
      <view class="form-row">
        <text class="form-label">手机号</text>
        <input v-model="form.phone" class="form-input" type="number" placeholder="请输入手机号" />
      </view>
      <view class="form-row">
        <text class="form-label">所在地区</text>
        <picker mode="region" @change="onRegionChange">
          <view class="form-input picker-text">
            <text :class="{ placeholder: !form.region }">{{ form.region || '请选择省 / 市 / 区' }}</text>
          </view>
        </picker>
      </view>
      <view class="form-row">
        <text class="form-label">详细地址</text>
        <input v-model="form.detail" class="form-input" placeholder="街道、门牌号等" />
      </view>
      <view class="form-row switch-row">
        <text class="form-label">设为默认地址</text>
        <switch :checked="form.isDefault" color="#1a1a1a" @change="onSwitch" />
      </view>
    </view>

    <view class="submit-wrap safe-bottom">
      <view class="btn-primary" @tap="onSave">保存</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { addressStore, genId, saveAddress } from '../../store'
import type { Address } from '../../data/types'

const emptyForm = {
  id: '',
  name: '',
  phone: '',
  region: '',
  detail: '',
  isDefault: false
}

const form = reactive({ ...emptyForm })

onLoad((options) => {
  const id = (options && options.id) || ''
  const a = addressStore.list.find((x) => x.id === id)
  if (a) {
    Object.assign(form, a)
    uni.setNavigationBarTitle({ title: '编辑地址' })
  }
})

function onRegionChange(e: { detail: { value: string[] } }) {
  form.region = e.detail.value.join(' ')
}

function onSwitch(e: { detail: { value: boolean } }) {
  form.isDefault = e.detail.value
}

function onSave() {
  if (!form.name.trim()) {
    uni.showToast({ title: '请输入收货人姓名', icon: 'none' })
    return
  }
  if (!/^1\d{10}$/.test(form.phone)) {
    uni.showToast({ title: '请输入正确的手机号', icon: 'none' })
    return
  }
  if (!form.region) {
    uni.showToast({ title: '请选择所在地区', icon: 'none' })
    return
  }
  if (!form.detail.trim()) {
    uni.showToast({ title: '请输入详细地址', icon: 'none' })
    return
  }
  const addr: Address = {
    id: form.id || genId(),
    name: form.name.trim(),
    phone: form.phone,
    region: form.region,
    detail: form.detail.trim(),
    isDefault: form.isDefault
  }
  saveAddress(addr)
  uni.showToast({ title: '已保存', icon: 'success' })
  setTimeout(() => uni.navigateBack(), 600)
}
</script>

<style>
.page {
  padding-bottom: 180rpx;
}
.form-row {
  display: flex;
  align-items: center;
  padding: 24rpx 0;
  border-bottom: 2rpx solid #f0ede8;
}
.form-row:last-child {
  border-bottom: none;
}
.form-label {
  width: 180rpx;
  font-size: 26rpx;
  color: #6b675f;
  flex-shrink: 0;
}
.form-input {
  flex: 1;
  font-size: 28rpx;
  color: #1a1a1a;
}
.picker-text {
  min-height: 40rpx;
  line-height: 40rpx;
}
.placeholder {
  color: #b0aba1;
}
.switch-row {
  justify-content: space-between;
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
