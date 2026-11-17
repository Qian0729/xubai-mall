import type { Category, Goods } from './types'

/**
 * 商品数据 —— 与页面分离。
 * 接入真实后台时，将本文件替换为接口请求（字段结构已按商品模型设计），
 * 页面代码无需改动。
 */

export const categories: Category[] = [
  { key: 'tops', label: '上衣' },
  { key: 'knitwear', label: '针织' },
  { key: 'dresses', label: '裙装' },
  { key: 'pants', label: '裤装' },
  { key: 'coats', label: '外套' },
  { key: 'accessories', label: '配饰' }
]

/** 服务保障（商品详情页展示） */
export const services = ['正品保障', '七天无理由退换', '极速发货', '会员尊享礼盒']

const IMG = '/static/images/'

/** 通用尺码表 */
function sizeTable(title: string, rows: string[][]): Goods['sizeTable'] {
  return {
    title,
    header: ['尺码', '胸围/围度', '衣长/裤长', '建议身高'],
    rows
  }
}

const TOP_SIZE = sizeTable('上衣尺码（cm）', [
  ['S', '96', '62', '155-160'],
  ['M', '102', '64', '160-166'],
  ['L', '108', '66', '166-172'],
  ['XL', '114', '68', '172-178']
])

const BOTTOM_SIZE = sizeTable('裤装尺码（cm）', [
  ['S', '66', '98', '155-160'],
  ['M', '70', '100', '160-166'],
  ['L', '74', '102', '166-172'],
  ['XL', '78', '104', '172-178']
])

const COAT_SIZE = sizeTable('外套尺码（cm）', [
  ['S', '108', '72', '155-162'],
  ['M', '114', '74', '162-168'],
  ['L', '120', '76', '168-174']
])

const ONE_SIZE = sizeTable('配饰尺码', [['均码', '—', '—', '通用']])

export const goodsList: Goods[] = [
  /* ---------------- 上衣 ---------------- */
  {
    id: 'g001',
    name: '序白 · 云朵白重磅圆领 T 恤',
    category: 'tops',
    price: 229,
    originalPrice: 269,
    image: IMG + 'tee-white-1.png',
    images: [IMG + 'tee-white-1.png', IMG + 'tee-white-2.png'],
    colors: ['云朵白'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: '240g 精梳重磅棉，克重扎实不透肤。宽松落肩廓形，领口双车线加固，久穿不变形。白色是序白的起点，也是衣橱里最诚实的颜色。',
    material: '100% 新疆长绒棉',
    care: '冷水机洗，反面晾晒，低温熨烫',
    sizeTable: TOP_SIZE,
    isNew: true
  },
  {
    id: 'g002',
    name: '序白 · 暮夜黑廓形连帽卫衣',
    category: 'tops',
    price: 499,
    originalPrice: 559,
    image: IMG + 'hoodie-black-1.png',
    images: [IMG + 'hoodie-black-1.png', IMG + 'hoodie-black-2.png'],
    colors: ['暮夜黑'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: '380g 定织毛圈棉，双纱手法织就，绒面细腻起球少。oversize 廓形配落肩袖，帽绳做旧金属箍，安静而有分量。',
    material: '80% 精梳棉 20% 聚酯纤维',
    care: '反面冷水机洗，平铺晾干',
    sizeTable: TOP_SIZE,
    isNew: true
  },
  {
    id: 'g009',
    name: '序白 · 月白真丝坠感衬衫',
    category: 'tops',
    price: 899,
    image: IMG + 'shirt-silk-white-1.png',
    images: [IMG + 'shirt-silk-white-1.png', IMG + 'shirt-silk-white-2.png'],
    colors: ['月白'],
    sizes: ['S', 'M', 'L'],
    description: '19 姆米重磅真丝，珠光光泽随步履流动。微阔袖窿与弧形下摆，正式与松弛之间，只差一颗贝壳纽扣的距离。',
    material: '100% 桑蚕丝',
    care: '中性洗涤剂手洗，阴干，低温垫布熨烫',
    sizeTable: TOP_SIZE,
    isNew: true
  },
  {
    id: 'g010',
    name: '序白 · 玄黑高领针织打底衫',
    category: 'tops',
    price: 359,
    image: IMG + 'top-black-highneck-1.png',
    images: [IMG + 'top-black-highneck-1.png', IMG + 'top-black-highneck-2.png'],
    colors: ['玄黑'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: '细 12 针织造，紧密不透。半高领贴合颈线，是秋冬大衣与西装最沉默的底色。',
    material: '70% 美利奴羊毛 30% 蚕丝',
    care: '冷水手洗，平铺阴干',
    sizeTable: TOP_SIZE
  },
  {
    id: 'g011',
    name: '序白 · 雾蓝条纹海魂衬衫',
    category: 'tops',
    price: 599,
    image: IMG + 'shirt-stripe-blue-1.png',
    images: [IMG + 'shirt-stripe-blue-1.png', IMG + 'shirt-stripe-blue-2.png'],
    colors: ['雾蓝'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: '色织细条纹，蓝白之间隔着晨雾。对条纹对格裁剪，贝壳纽扣，宽松直身版型，一件穿十年的经典。',
    material: '100% 有机棉',
    care: '冷水机洗，悬挂晾干',
    sizeTable: TOP_SIZE
  },
  {
    id: 'g012',
    name: '序白 · 燕麦方领褶裥上衣',
    category: 'tops',
    price: 529,
    image: IMG + 'top-oat-square-1.png',
    images: [IMG + 'top-oat-square-1.png', IMG + 'top-oat-square-2.png'],
    colors: ['燕麦'],
    sizes: ['S', 'M', 'L'],
    description: '方领露出一寸锁骨，胸前手工褶裥含而不露。燕麦色取自晨光里的谷物，衬肤色，也衬心情。',
    material: '62% 粘纤 38% 亚麻',
    care: '冷水机洗，低温熨烫',
    sizeTable: TOP_SIZE,
    isNew: true
  },

  /* ---------------- 针织 ---------------- */
  {
    id: 'g013',
    name: '序白 · 岚灰羊绒混纺圆领毛衣',
    category: 'knitwear',
    price: 999,
    originalPrice: 1099,
    image: IMG + 'knit-grey-round-1.png',
    images: [IMG + 'knit-grey-round-1.png', IMG + 'knit-grey-round-2.png'],
    colors: ['岚灰'],
    sizes: ['S', 'M', 'L'],
    description: '12% 山羊绒入料，细 12 针密织，触感近乎无物。岚灰色由深浅两种纱线并捻而成，静看有层次，远看只是安静。',
    material: '12% 山羊绒 58% 羊毛 30% 粘纤',
    care: '专用洗涤剂手洗，平铺阴干，防虫收纳',
    sizeTable: TOP_SIZE,
    isNew: true
  },
  {
    id: 'g014',
    name: '序白 · 月白绞花高领毛衣',
    category: 'knitwear',
    price: 799,
    image: IMG + 'knit-white-turtle-1.png',
    images: [IMG + 'knit-white-turtle-1.png', IMG + 'knit-white-turtle-2.png'],
    colors: ['月白'],
    sizes: ['S', 'M', 'L'],
    description: '手工感的绞花纹理，一针一针都是冬天的重量。高领可翻可立，月白色在雪天里几乎与光融为一体。',
    material: '55% 羊毛 45% 腈纶',
    care: '冷水手洗，平铺阴干',
    sizeTable: TOP_SIZE
  },
  {
    id: 'g015',
    name: '序白 · 咖啡棕宽松针织开衫',
    category: 'knitwear',
    price: 759,
    image: IMG + 'cardigan-brown-1.png',
    images: [IMG + 'cardigan-brown-1.png', IMG + 'cardigan-brown-2.png'],
    colors: ['咖啡棕'],
    sizes: ['S', 'M', 'L'],
    description: '深烘焙般的咖啡棕，胡桃木纽扣，两只贴袋。像一件从旧时光里拿出来的开衫，只是更合身。',
    material: '50% 羊毛 50% 腈纶',
    care: '冷水手洗，平铺阴干',
    sizeTable: TOP_SIZE
  },

  /* ---------------- 裙装 ---------------- */
  {
    id: 'g016',
    name: '序白 · 月白真丝吊带连衣裙',
    category: 'dresses',
    price: 1099,
    image: IMG + 'dress-white-slip-1.png',
    images: [IMG + 'dress-white-slip-1.png', IMG + 'dress-white-slip-2.png'],
    colors: ['月白'],
    sizes: ['S', 'M', 'L'],
    description: '斜裁真丝顺着身体垂落，行走时裙摆有风的形状。细吊带可调节，配一件针织开衫，晚风里刚刚好。',
    material: '100% 桑蚕丝',
    care: '中性洗涤剂手洗，阴干，垫布低温熨烫',
    sizeTable: TOP_SIZE,
    isNew: true
  },
  {
    id: 'g017',
    name: '序白 · 墨黑方领中长连衣裙',
    category: 'dresses',
    price: 999,
    image: IMG + 'dress-black-square-1.png',
    images: [IMG + 'dress-black-square-1.png', IMG + 'dress-black-square-2.png'],
    colors: ['墨黑'],
    sizes: ['S', 'M', 'L'],
    description: '方领是法式的骨，收腰是西装的度。中长裙摆及膝下一寸，晚宴或日常，都坐得住。',
    material: '78% 三醋酸 22% 聚酯纤维',
    care: '冷水机洗，悬挂晾干',
    sizeTable: TOP_SIZE
  },
  {
    id: 'g018',
    name: '序白 · 燕麦针织直筒连衣裙',
    category: 'dresses',
    price: 799,
    image: IMG + 'dress-oat-knit-1.png',
    images: [IMG + 'dress-oat-knit-1.png', IMG + 'dress-oat-knit-2.png'],
    colors: ['燕麦'],
    sizes: ['S', 'M', 'L'],
    description: '一件式的松弛感。直筒针织顺身而下，侧缝小开衩，步幅自如。通勤路上最省力的高级。',
    material: '60% 羊毛 40% 粘纤',
    care: '冷水手洗，平铺阴干',
    sizeTable: TOP_SIZE,
    isNew: true
  },

  /* ---------------- 裤装 ---------------- */
  {
    id: 'g003',
    name: '序白 · 晨雾米白直筒阔腿裤',
    category: 'pants',
    price: 459,
    image: IMG + 'trousers-cream-1.png',
    images: [IMG + 'trousers-cream-1.png', IMG + 'trousers-cream-2.png'],
    colors: ['晨雾米白'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: '天丝混纺自带垂坠，直筒阔腿藏起所有小心翼翼。腰头内嵌防滑胶，久坐不勒。',
    material: '68% 天丝 32% 聚酯纤维',
    care: '冷水机洗，低温熨烫',
    sizeTable: BOTTOM_SIZE,
    isNew: true
  },
  {
    id: 'g004',
    name: '序白 · 玄黑多袋工装裤',
    category: 'pants',
    price: 429,
    image: IMG + 'cargo-black-1.png',
    images: [IMG + 'cargo-black-1.png', IMG + 'cargo-black-2.png'],
    colors: ['玄黑'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: '耐磨斜纹布，立体风琴袋，抽绳裤脚收放自如。机能是手段，利落才是目的。',
    material: '97% 棉 3% 氨纶',
    care: '反面冷水机洗',
    sizeTable: BOTTOM_SIZE
  },
  {
    id: 'g019',
    name: '序白 · 烟灰高腰西装直筒裤',
    category: 'pants',
    price: 599,
    image: IMG + 'trousers-grey-suit-1.png',
    images: [IMG + 'trousers-grey-suit-1.png', IMG + 'trousers-grey-suit-2.png'],
    colors: ['烟灰'],
    sizes: ['S', 'M', 'L'],
    description: '一条笔挺的裤线，是西装裤的体面。高腰提位，微阔裤腿遮住小腿的犹豫，配衬衫或毛衣都成立。',
    material: '72% 聚酯纤维 25% 粘纤 3% 氨纶',
    care: '干洗或冷水轻柔机洗',
    sizeTable: BOTTOM_SIZE,
    isNew: true
  },
  {
    id: 'g020',
    name: '序白 · 靛蓝原色直筒牛仔裤',
    category: 'pants',
    price: 649,
    image: IMG + 'jeans-blue-1.png',
    images: [IMG + 'jeans-blue-1.png', IMG + 'jeans-blue-2.png'],
    colors: ['靛蓝'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: '13.5oz 原色丹宁，赤耳工艺，色落由你亲自书写。直筒版型不挑腿型，穿得越久越像你自己。',
    material: '100% 环锭纺棉',
    care: '前三个月冷水单独手洗，勿暴晒',
    sizeTable: BOTTOM_SIZE
  },

  /* ---------------- 外套 ---------------- */
  {
    id: 'g005',
    name: '序白 · 岚灰落肩廓形西装外套',
    category: 'coats',
    price: 799,
    originalPrice: 899,
    image: IMG + 'blazer-grey-1.png',
    images: [IMG + 'blazer-grey-1.png', IMG + 'blazer-grey-2.png'],
    colors: ['岚灰'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: '去垫肩的轻结构西装，落肩直身，一粒扣。不肯正襟危坐的西装，适合把严肃穿得松弛的人。',
    material: '72% 聚酯纤维 28% 粘纤',
    care: '干洗为宜，悬挂收纳',
    sizeTable: COAT_SIZE
  },
  {
    id: 'g006',
    name: '序白 · 素米中长翻领风衣',
    category: 'coats',
    price: 999,
    image: IMG + 'trench-cream-1.png',
    images: [IMG + 'trench-cream-1.png', IMG + 'trench-cream-2.png'],
    colors: ['素米'],
    sizes: ['S', 'M', 'L'],
    description: '防泼水面料，风纪扣与腰带一应俱全，却做了减法的版型。风来时系上，风停时敞开，都是好姿态。',
    material: '85% 聚酯纤维 15% 棉',
    care: '干洗为宜，勿暴晒',
    sizeTable: COAT_SIZE
  },
  {
    id: 'g021',
    name: '序白 · 墨黑双面呢羊毛大衣',
    category: 'coats',
    price: 1699,
    originalPrice: 1899,
    image: IMG + 'coat-black-wool-1.png',
    images: [IMG + 'coat-black-wool-1.png', IMG + 'coat-black-wool-2.png'],
    colors: ['墨黑'],
    sizes: ['S', 'M', 'L'],
    description: '双层羊毛手缝对合工艺，无里布却挺括保暖。门襟手工缝线，一针一线的密度是冬天的底气。',
    material: '90% 澳洲羊毛 10% 羊绒',
    care: '干洗，宽衣架悬挂，防虫收纳',
    sizeTable: COAT_SIZE,
    isNew: true
  },
  {
    id: 'g022',
    name: '序白 · 燕麦短款羊毛外套',
    category: 'coats',
    price: 1199,
    image: IMG + 'coat-oat-short-1.png',
    images: [IMG + 'coat-oat-short-1.png', IMG + 'coat-oat-short-2.png'],
    colors: ['燕麦'],
    sizes: ['S', 'M', 'L'],
    description: '短款利落，羊毛混纺面料肌理温润。圆领无扣设计，随手一搭就是完整的穿搭逻辑。',
    material: '62% 羊毛 38% 聚酯纤维',
    care: '干洗为宜，平铺收纳',
    sizeTable: COAT_SIZE,
    isNew: true
  },

  /* ---------------- 配饰 ---------------- */
  {
    id: 'g007',
    name: '序白 · 月灰粗针羊毛围巾',
    category: 'accessories',
    price: 199,
    image: IMG + 'scarf-grey-1.png',
    images: [IMG + 'scarf-grey-1.png', IMG + 'scarf-grey-2.png'],
    colors: ['月灰'],
    sizes: ['均码'],
    description: '180cm 加长粗针织，绕两圈还垂着余量。羊毛混纺，触感柔软，冬天颈边的第一件小事。',
    material: '50% 羊毛 50% 腈纶',
    care: '冷水手洗，平铺阴干',
    sizeTable: ONE_SIZE
  },
  {
    id: 'g008',
    name: '序白 · 素白帆布托特包',
    category: 'accessories',
    price: 159,
    image: IMG + 'tote-cream-1.png',
    images: [IMG + 'tote-cream-1.png', IMG + 'tote-cream-2.png'],
    colors: ['素白'],
    sizes: ['均码'],
    description: '16 安加厚帆布，包底方形撑得起型，内袋安放钥匙与耳机。装得下 14 寸笔记本，也装得下日常。',
    material: '100% 棉帆布',
    care: '冷水手洗，阴干定形',
    sizeTable: ONE_SIZE
  },
  {
    id: 'g023',
    name: '序白 · 墨黑羊毛贝雷帽',
    category: 'accessories',
    price: 259,
    image: IMG + 'beret-black-1.png',
    images: [IMG + 'beret-black-1.png', IMG + 'beret-black-2.png'],
    colors: ['墨黑'],
    sizes: ['均码'],
    description: '硬挺而不僵的羊毛帽身，斜戴有一分法式的随意。内衬防滑带，风再大也守得住发型。',
    material: '80% 羊毛 20% 聚酯纤维',
    care: '局部清洁，阴干',
    sizeTable: ONE_SIZE,
    isNew: true
  },
  {
    id: 'g024',
    name: '序白 · 月白真丝小方巾',
    category: 'accessories',
    price: 399,
    image: IMG + 'scarf-silk-white-1.png',
    images: [IMG + 'scarf-silk-white-1.png', IMG + 'scarf-silk-white-2.png'],
    colors: ['月白'],
    sizes: ['均码'],
    description: '70cm 见方的 16 姆米真丝，手工卷边。系在颈间、腕上或包带，是全身最安静的一处光。',
    material: '100% 桑蚕丝',
    care: '中性洗涤剂手洗，阴干',
    sizeTable: ONE_SIZE,
    isNew: true
  },
  {
    id: 'g025',
    name: '序白 · 玄黑圆环扣皮带',
    category: 'accessories',
    price: 329,
    image: IMG + 'belt-black-1.png',
    images: [IMG + 'belt-black-1.png', IMG + 'belt-black-2.png'],
    colors: ['玄黑'],
    sizes: ['均码'],
    description: '头层牛皮配拉丝金属圆环扣，无孔调节，收放随行。低调到几乎隐形，又恰到好处地收束全身。',
    material: '头层牛皮 / 锌合金扣',
    care: '干布擦拭，避免雨淋与暴晒',
    sizeTable: ONE_SIZE
  }
]

/** 按 id 查询商品 */
export function getGoodsById(id: string): Goods | undefined {
  return goodsList.find((g) => g.id === id)
}
