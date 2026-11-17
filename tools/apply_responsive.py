# -*- coding: utf-8 -*-
"""为各页面样式加 scoped，并追加电脑端（>=768px）响应式规则"""
import io
import os

PAGES_DIR = r"c:\Users\11643\Desktop\index.html\xubai-mall\src\pages"

BAR = """
  .bottom-bar {
    left: 50%;
    right: auto;
    transform: translateX(-50%);
    width: 100%;
    max-width: 860px;
  }"""

SUBMIT = """
  .submit-wrap {
    left: 50%;
    right: auto;
    transform: translateX(-50%);
    width: 100%;
    max-width: 860px;
  }"""

PAGE_CENTER = """
  .page {
    max-width: 860px;
    margin: 0 auto;
  }"""

RULES = {
    "index": """
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
""",
    "category": """
@media (min-width: 768px) {
""" + PAGE_CENTER + """
  .item-img {
    width: 180px;
    height: 180px;
  }
  .item {
    padding: 24rpx;
  }
}
""",
    "detail": """
@media (min-width: 768px) {
""" + PAGE_CENTER + """
  .page {
    padding-bottom: 140px;
  }
  .swiper {
    height: 560px;
  }
""" + BAR + """
}
""",
    "cart": """
@media (min-width: 768px) {
""" + PAGE_CENTER + """
  .page {
    padding-bottom: 140px;
  }
""" + BAR + """
}
""",
    "checkout": """
@media (min-width: 768px) {
""" + PAGE_CENTER + """
  .page {
    padding-bottom: 150px;
  }
""" + SUBMIT + """
}
""",
    "orders": """
@media (min-width: 768px) {
""" + PAGE_CENTER + """
}
""",
    "order-detail": """
@media (min-width: 768px) {
""" + PAGE_CENTER + """
  .page {
    padding-bottom: 150px;
  }
""" + SUBMIT + """
}
""",
    "mine": """
@media (min-width: 768px) {
""" + PAGE_CENTER + """
}
""",
    "address": """
@media (min-width: 768px) {
""" + PAGE_CENTER + """
  .page {
    padding-bottom: 150px;
  }
""" + SUBMIT + """
}
""",
    "address-edit": """
@media (min-width: 768px) {
""" + PAGE_CENTER + """
  .page {
    padding-bottom: 150px;
  }
""" + SUBMIT + """
}
""",
}

for name, css in RULES.items():
    path = os.path.join(PAGES_DIR, name, "index.vue")
    with io.open(path, "r", encoding="utf-8") as f:
        content = f.read()

    if "<style scoped>" not in content:
        content = content.replace("<style>", "<style scoped>", 1)

    if "min-width: 768px" not in content:
        idx = content.rfind("</style>")
        content = content[:idx] + css + content[idx:]

    with io.open(path, "w", encoding="utf-8", newline="\n") as f:
        f.write(content)
    print("updated", name)
