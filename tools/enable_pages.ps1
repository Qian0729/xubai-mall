# 验证令牌 → 启用 GitHub Pages（workflow 模式）→ 查询状态
$ErrorActionPreference = "Stop"

$lines = "protocol=https", "host=github.com", ""
$tmp = [System.IO.Path]::GetTempFileName()
Set-Content -Path $tmp -Value ($lines -join "`r`n") -NoNewline -Encoding ascii
$raw = cmd /c "type `"$tmp`" | git credential fill" 2>$null
Remove-Item $tmp -Force
$cands = @($raw | Where-Object { $_ -match '^password=' } | ForEach-Object { $_.Substring(9).Trim() })
$token = @($cands | Sort-Object Length -Descending | Select-Object -First 1)[0]
if (-not $token -or $token.Length -lt 10) { Write-Output ("NO_TOKEN cands=" + ($cands | ForEach-Object { $_.Length }) -join ','); exit 1 }
Write-Output ("TOKEN head=" + $token.Substring(0,4) + " len=" + $token.Length)
Write-Output ("USER_LINE " + (($raw | Where-Object { $_ -match '^username=' }) -join ' '))

$headers = @{
  Authorization = "token $token"
  Accept        = "application/vnd.github+json"
  "User-Agent"  = "codebuddy"
}

# 1. 验证令牌
try {
  $u = Invoke-RestMethod -Uri "https://api.github.com/user" -Headers $headers
  Write-Output ("USER_OK " + $u.login)
} catch {
  Write-Output ("USER_ERR " + $_.Exception.Message)
  exit 1
}

# 2. 启用 Pages（409 = 已启用）
$enabled = $false
for ($i = 0; $i -lt 3 -and -not $enabled; $i++) {
  try {
    Invoke-RestMethod -Uri "https://api.github.com/repos/Qian0729/xubai-mall/pages" -Method Post -Headers $headers -Body '{"build_type":"workflow"}' -ContentType "application/json" | Out-Null
    Write-Output "PAGES_ENABLED(workflow)"
    $enabled = $true
  } catch {
    $code = $null
    if ($_.Exception.Response) { $code = [int]$_.Exception.Response.StatusCode }
    if ($code -eq 409) { Write-Output "PAGES_ALREADY_ENABLED"; $enabled = $true }
    else { Write-Output ("PAGES_RETRY " + $code); Start-Sleep -Seconds 3 }
  }
}

# 3. 查询状态
try {
  $st = Invoke-RestMethod -Uri "https://api.github.com/repos/Qian0729/xubai-mall/pages" -Method Get -Headers $headers
  Write-Output ("PAGES_STATUS " + $st.status + " url=" + $st.html_url)
} catch {
  Write-Output ("STATUS_ERR " + $_.Exception.Message)
}
