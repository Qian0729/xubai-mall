# -*- coding: utf-8 -*-
"""裁掉图片右下角「AI生成 WORKBUDDY」水印（保留主要构图）"""
import os

from PIL import Image

IMG_DIR = r"c:\Users\11643\Desktop\index.html\xubai-mall\src\static\images"
CROP_BOTTOM = 104  # 去掉底部条带，水印位于右下角

for name in sorted(os.listdir(IMG_DIR)):
    if not name.lower().endswith(".png"):
        continue
    path = os.path.join(IMG_DIR, name)
    img = Image.open(path).convert("RGB")
    w, h = img.size
    # 以右下角水印区域为准，裁掉底部条带
    cropped = img.crop((0, 0, w, h - CROP_BOTTOM))
    cropped.save(path, optimize=True)
    print(f"{name}: {w}x{h} -> {cropped.size[0]}x{cropped.size[1]}")
