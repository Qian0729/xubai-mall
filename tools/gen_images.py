# -*- coding: utf-8 -*-
"""批量生成「序白」品牌图片素材并下载到项目目录。"""
import json
import os
import subprocess
import sys
import time

SKILL_SCRIPT = r"c:\Users\11643\.vscode\extensions\tencent-cloud.coding-copilot-4.12.39997873\out\extension\builtin\buddy-multimodal-generation\scripts\buddy-cloud.py"
OUT_DIR = r"c:\Users\11643\Desktop\index.html\xubai-mall\src\static\images"

STYLE = "，极简电商服装商品摄影，浅米白色纯色背景，柔和均匀的自然光，居中构图，大量留白，高级质感，画面干净无文字无水印"

TASKS = [
    ("poster.jpg", "服装品牌宣传海报，米白色背景上悬挂着一件米白色宽松衬衫与一条浅灰色休闲长裤的挂拍组合，木质衣架，大面积留白，柔和晨光斜照，地面有淡淡阴影，极简主义构图，中文时尚杂志质感，高级氛围，无文字无水印"),
    ("logo.png", "极简风格服装品牌徽标，正圆形，黑色细线条勾勒出一件简约衬衫的正面轮廓，米白色底色，大量留白，矢量插画风格，干净现代，无文字无水印"),
    # 上衣
    ("tee-white-1.jpg", "纯白色宽松圆领短袖T恤，正面平铺拍摄" + STYLE),
    ("tee-white-2.jpg", "纯白色宽松圆领短袖T恤，平铺拍摄，领口与面料纹理特写" + STYLE),
    ("hoodie-black-1.jpg", "黑色oversize宽松连帽卫衣，正面挂拍" + STYLE),
    ("hoodie-black-2.jpg", "黑色oversize宽松连帽卫衣，背面挂拍" + STYLE),
    # 裤装
    ("trousers-cream-1.jpg", "米白色直筒阔腿休闲长裤，正面平铺拍摄" + STYLE),
    ("trousers-cream-2.jpg", "米白色直筒阔腿休闲长裤，平铺拍摄，腰头与面料垂坠细节特写" + STYLE),
    ("cargo-black-1.jpg", "黑色多口袋工装休闲长裤，正面挂拍" + STYLE),
    ("cargo-black-2.jpg", "黑色多口袋工装休闲长裤，侧面挂拍，口袋细节特写" + STYLE),
    # 外套
    ("blazer-grey-1.jpg", "浅灰色落肩廓形西装外套，正面挂拍" + STYLE),
    ("blazer-grey-2.jpg", "浅灰色落肩廓形西装外套，平铺拍摄，翻领与纽扣细节特写" + STYLE),
    ("trench-cream-1.jpg", "米白色中长款翻领风衣，正面挂拍" + STYLE),
    ("trench-cream-2.jpg", "米白色中长款翻领风衣，背面挂拍展示整体廓形" + STYLE),
    # 配饰
    ("scarf-grey-1.jpg", "浅灰色羊毛针织围巾，整齐叠放拍摄" + STYLE),
    ("scarf-grey-2.jpg", "浅灰色羊毛针织围巾，针织纹理特写" + STYLE),
    ("tote-cream-1.jpg", "米白色帆布托特包，正面立放拍摄" + STYLE),
    ("tote-cream-2.jpg", "米白色帆布托特包，袋口与提手细节特写" + STYLE),
]


def run(cmd):
    p = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", errors="replace")
    out = (p.stdout or "").strip()
    try:
        return json.loads(out)
    except Exception:
        return {"error": "RAW", "stdout": out, "stderr": (p.stderr or "")[-500:]}


def main():
    token = os.environ.get("BUDDY_CLOUD_TOKEN", "")
    os.makedirs(OUT_DIR, exist_ok=True)

    # 1. 提交所有任务（限制并发提交间隔）
    jobs = {}
    for name, prompt in TASKS:
        res = run(["python", SKILL_SCRIPT, "image", prompt, "--token", token, "--no-poll"])
        jid = res.get("job_id") or res.get("jobId")
        if jid:
            jobs[jid] = name
            print(f"submitted {name} -> {jid}", flush=True)
        else:
            print(f"submit failed {name}: {json.dumps(res, ensure_ascii=False)[:300]}", flush=True)
        time.sleep(1)

    # 2. 轮询等待
    pending = dict(jobs)
    urls = {}
    deadline = time.time() + 600
    while pending and time.time() < deadline:
        time.sleep(6)
        for jid, name in list(pending.items()):
            res = run(["python", SKILL_SCRIPT, "status", jid, "--type", "image", "--token", token])
            status = str(res.get("status", "")).upper()
            url = res.get("result_url") or res.get("resultUrl")
            if status in ("SUCCESS", "DONE") and url:
                urls[name] = url
                del pending[jid]
                print(f"done {name}", flush=True)
            elif status in ("FAIL", "FAILED", "ERROR"):
                print(f"failed {name}: {json.dumps(res, ensure_ascii=False)[:200]}", flush=True)
                del pending[jid]

    # 3. 下载
    ok, fail = [], []
    import urllib.request
    for name, url in urls.items():
        dest = os.path.join(OUT_DIR, name)
        try:
            urllib.request.urlretrieve(url, dest)
            ok.append(name)
            print(f"saved {name}", flush=True)
        except Exception as e:
            fail.append(name)
            print(f"download failed {name}: {e}", flush=True)

    print(json.dumps({"ok": ok, "fail": fail, "not_finished": list(pending.values())}, ensure_ascii=False))


if __name__ == "__main__":
    main()
