import type { Category, Goods } from './types'

/**
 * 商品模拟数据 —— 与页面分离，后续接入后台时仅需把本文件
 * 替换为接口请求（字段结构已按常见商品模型设计）。
 */

export const categories: Category[] = [
  { key: 'tops', label: '上衣' },
  { key: 'pants', label: '裤装' },
  { key: 'coats', label: '外套' },
  { key: 'accessories', label: '配饰' }
]

const IMG = '/static/images/'

export const goodsList: Goods[] = [
  {
    id: 'g001',
    name: '云朵白 · 宽松圆领短袖 T 恤',
    category: 'tops',
    price: 129,
    originalPrice: 159,
    image: IMG + 'tee-white-1.png',
    images: [IMG + 'tee-white-1.png', IMG + 'tee-white-2.png'],
    colors: ['云朵白'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: '精选 240g 重磅纯棉，宽松落肩版型，领口双车线加固，日常百搭。',
    material: '100% 精梳棉',
    isNew: true
  },
  {
    id: 'g002',
    name: '暮夜黑 · Oversize 连帽卫衣',
    category: 'tops',
    price: 299,
    originalPrice: 359,
    image: IMG + 'hoodie-black-1.png',
    images: [IMG + 'hoodie-black-1.png', IMG + 'hoodie-black-2.png'],
    colors: ['暮夜黑'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: '380g 毛圈棉，oversize 廓形，加绒内里，秋季通勤与街头皆宜。',
    material: '80% 棉 20% 聚酯纤维',
    isNew: true
  },
  {
    id: 'g003',
    name: '晨雾米白 · 直筒阔腿休闲裤',
    category: 'pants',
    price: 259,
    image: IMG + 'trousers-cream-1.png',
    images: [IMG + 'trousers-cream-1.png', IMG + 'trousers-cream-2.png'],
    colors: ['晨雾米白'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: '垂坠感天丝混纺面料，直筒阔腿剪裁，修饰腿型，四季可穿。',
    material: '68% 天丝 32% 聚酯纤维',
    isNew: true
  },
  {
    id: 'g004',
    name: '玄黑 · 多口袋工装休闲裤',
    category: 'pants',
    price: 289,
    image: IMG + 'cargo-black-1.png',
    images: [IMG + 'cargo-black-1.png', IMG + 'cargo-black-2.png'],
    colors: ['玄黑'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: '耐磨斜纹布，立体工装口袋，抽绳裤脚，机能与简约平衡。',
    material: '97% 棉 3% 氨纶',
    isNew: true
  },
  {
    id: 'g005',
    name: '岚灰 · 落肩廓形西装外套',
    category: 'coats',
    price: 399,
    originalPrice: 459,
    image: IMG + 'blazer-grey-1.png',
    images: [IMG + 'blazer-grey-1.png', IMG + 'blazer-grey-2.png'],
    colors: ['岚灰'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: '微结构面料，落肩直身廓形，一粒扣设计，休闲与正式之间。',
    material: '72% 聚酯纤维 28% 粘纤'
  },
  {
    id: 'g006',
    name: '素米 · 中长款翻领风衣',
    category: 'coats',
    price: 499,
    image: IMG + 'trench-cream-1.png',
    images: [IMG + 'trench-cream-1.png', IMG + 'trench-cream-2.png'],
    colors: ['素米'],
    sizes: ['S', 'M', 'L'],
    description: '挺括防泼水面料，中长款廓形，腰带可调节，秋日氛围担当。',
    material: '85% 聚酯纤维 15% 棉'
  },
  {
    id: 'g007',
    name: '月灰 · 羊毛针织围巾',
    category: 'accessories',
    price: 99,
    image: IMG + 'scarf-grey-1.png',
    images: [IMG + 'scarf-grey-1.png', IMG + 'scarf-grey-2.png'],
    colors: ['月灰'],
    sizes: ['均码'],
    description: '柔软羊毛混纺，粗针织法，180cm 加长设计，暖意十足。',
    material: '50% 羊毛 50% 腈纶'
  },
  {
    id: 'g008',
    name: '素白 · 帆布托特包',
    category: 'accessories',
    price: 89,
    image: IMG + 'tote-cream-1.png',
    images: [IMG + 'tote-cream-1.png', IMG + 'tote-cream-2.png'],
    colors: ['素白'],
    sizes: ['均码'],
    description: '16 安加厚帆布，内袋收纳设计，可容纳 14 寸笔记本，通勤便携。',
    material: '100% 棉帆布'
  }
]

/** 按 id 查询商品 */
export function getGoodsById(id: string): Goods | undefined {
  return goodsList.find((g) => g.id === id)
}
