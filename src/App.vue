<script setup lang="ts">
import { onLaunch } from '@dcloudio/uni-app'

onLaunch(() => {
  console.log('序白商城启动')
})
</script>

<style>
/* 全局样式：序白品牌视觉 */
page {
  background-color: #f7f5f0;
  color: #1a1a1a;
  font-size: 28rpx;
  font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'PingFang SC',
    'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
}

/* 通用卡片 */
.card {
  background: #ffffff;
  border-radius: 20rpx;
  padding: 24rpx;
  margin: 20rpx;
}

/* 通用按钮 */
.btn-primary {
  background: #1a1a1a;
  color: #ffffff;
  border-radius: 44rpx;
  font-size: 28rpx;
  height: 88rpx;
  line-height: 88rpx;
  text-align: center;
}
.btn-primary::after {
  border: none;
}
.btn-ghost {
  background: transparent;
  color: #1a1a1a;
  border: 2rpx solid #1a1a1a;
  border-radius: 44rpx;
  font-size: 28rpx;
  height: 88rpx;
  line-height: 84rpx;
  text-align: center;
}
.btn-ghost::after {
  border: none;
}

/* 通用文字 */
.text-gray {
  color: #9a968e;
}
.text-price {
  color: #1a1a1a;
  font-weight: 600;
}

/* 安全区 */
.safe-bottom {
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
