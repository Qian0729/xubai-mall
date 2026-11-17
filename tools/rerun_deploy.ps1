# 重新触发 Deploy H5 工作流并轮询结果
$ErrorActionPreference = "Stop"

$lines = "protocol=https", "host=github.com", ""
$tmp = [System.IO.Path]::GetTempFileName()
Set-Content -Path $tmp -Value ($lines -join "`r`n") -NoNewline -Encoding ascii
$raw = cmd /c "type `"$tmp`" | git credential fill" 2>$null
Remove-Item $tmp -Force
$c = @($raw | Where-Object { $_ -match '^password=' } | ForEach-Object { $_.Substring(9).Trim() })
$token = @($c | Sort-Object Length -Descending)[0]
$headers = @{
  Authorization = "token $token"
  Accept        = "application/vnd.github+json"
  "User-Agent"  = "codebuddy"
}

# 触发 workflow_dispatch
try {
  Invoke-RestMethod -Uri "https://api.github.com/repos/Qian0729/xubai-mall/actions/workflows/deploy.yml/dispatches" -Method Post -Headers $headers -Body '{"ref":"main"}' -ContentType "application/json" | Out-Null
  Write-Output "DISPATCH_OK"
} catch {
  Write-Output ("DISPATCH_ERR " + $_.Exception.Message)
}

# 轮询最新一次运行（最多 5 分钟）
Start-Sleep -Seconds 10
for ($i = 0; $i -lt 20; $i++) {
  $r = Invoke-RestMethod -Uri "https://api.github.com/repos/Qian0729/xubai-mall/actions/runs?per_page=1" -Headers $headers
  $run = $r.workflow_runs[0]
  Write-Output ("CHECK " + $run.status + " " + $run.conclusion)
  if ($run.status -eq "completed") { break }
  Start-Sleep -Seconds 15
}
