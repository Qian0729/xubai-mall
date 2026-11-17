# 创建 GitHub 仓库并推送 xubai-mall（凭证来自 Windows 凭据管理器，不回显密钥）
$ErrorActionPreference = "Stop"

$lines = "protocol=https", "host=github.com", ""
$tmp = [System.IO.Path]::GetTempFileName()
Set-Content -Path $tmp -Value ($lines -join "`r`n") -NoNewline -Encoding ascii

$raw = cmd /c "type `"$tmp`" | git credential fill" 2>$null
Remove-Item $tmp -Force
$pwLines = @($raw | Where-Object { $_ -match '^password=' })
Write-Output ("RAW_LINES=" + @($raw).Count + " PW_LINES=" + $pwLines.Count)
$token = ($pwLines[0] -replace '^password=', '').Trim()
if (-not $token) { Write-Output "NO_TOKEN"; exit 1 }
Write-Output ("TOKEN_OK len=" + $token.Length + " head=" + $token.Substring(0, [Math]::Min(4, $token.Length)) + "...")

$headers = @{
  Authorization = "token $token"
  Accept        = "application/vnd.github+json"
  "User-Agent"  = "codebuddy"
}

# 1. 创建新仓库
$body = @{
  name        = "xubai-mall"
  description = "序白 XU BAI · 简约服装品牌商城（uni-app + Vue3 + TS，支持微信小程序与 H5）"
  private     = $false
  auto_init   = $false
} | ConvertTo-Json

$bodyBytes = [System.Text.Encoding]::UTF8.GetBytes($body)
$resp = Invoke-RestMethod -Uri "https://api.github.com/user/repos" -Method Post -Headers $headers -Body $bodyBytes -ContentType "application/json"
Write-Output ("REPO_CREATED " + $resp.full_name + " " + $resp.html_url)
