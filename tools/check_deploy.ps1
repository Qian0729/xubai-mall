# 查询 xubai-mall 仓库的 Actions 运行状态，必要时手动触发部署
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

$r = Invoke-RestMethod -Uri "https://api.github.com/repos/Qian0729/xubai-mall/actions/runs?per_page=5" -Headers $headers
foreach ($x in $r.workflow_runs) {
  Write-Output ("RUN id=" + $x.id + " name=" + $x.name + " status=" + $x.status + " conclusion=" + $x.conclusion)
}
