# -*- coding: utf-8 -*-
"""绘制 tabBar 图标（81x81，正常灰色 / 选中黑色）"""
import os

try:
    from PIL import Image, ImageDraw
except ImportError:
    os.system("python -m pip install pillow -q")
    from PIL import Image, ImageDraw

OUT = r"c:\Users\11643\Desktop\index.html\xubai-mall\src\static\tabbar"
os.makedirs(OUT, exist_ok=True)

S = 81
LINE = 5
NORMAL = (154, 150, 142, 255)
ACTIVE = (26, 26, 26, 255)


def canvas():
    img = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    return img, ImageDraw.Draw(img)


def save(img, name):
    img.save(os.path.join(OUT, name))


def home(d, c):
    # 房顶
    d.line([(14, 40), (40, 18), (66, 40)], fill=c, width=LINE)
    # 房体
    d.line([(20, 38), (20, 64)], fill=c, width=LINE)
    d.line([(60, 38), (60, 64)], fill=c, width=LINE)
    d.line([(20, 64), (60, 64)], fill=c, width=LINE)
    # 门
    d.line([(35, 64), (35, 50), (45, 50), (45, 64)], fill=c, width=LINE - 1)


def category(d, c):
    for (x, y) in [(16, 16), (45, 16), (16, 45), (45, 45)]:
        d.rounded_rectangle([x, y, x + 20, y + 20], radius=5, outline=c, width=LINE)


def cart(d, c):
    # 车筐
    d.line([(14, 22), (22, 22), (28, 48), (60, 48), (66, 28), (24, 28)], fill=c, width=LINE - 1)
    # 轮子
    d.ellipse([28, 54, 38, 64], outline=c, width=LINE - 1)
    d.ellipse([52, 54, 62, 64], outline=c, width=LINE - 1)


def mine(d, c):
    # 头
    d.ellipse([28, 14, 52, 38], outline=c, width=LINE)
    # 肩
    d.arc([16, 42, 64, 84], start=180, end=360, fill=c, width=LINE)


for name, fn in [("home", home), ("category", category), ("cart", cart), ("mine", mine)]:
    for suffix, color in [("", NORMAL), ("-active", ACTIVE)]:
        img, d = canvas()
        fn(d, color)
        save(img, name + suffix + ".png")

print("icons done:", os.listdir(OUT))
