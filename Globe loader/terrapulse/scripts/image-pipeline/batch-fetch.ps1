# Batch-fetch all 78 cities (Commons rate-limited). Re-run manifest after each batch.
$ErrorActionPreference = "Continue"
Set-Location $PSScriptRoot

$batches = @(0, 8, 16, 24, 32, 40, 48, 56, 64, 72)
foreach ($offset in $batches) {
  $limit = [Math]::Min(8, 78 - $offset)
  if ($limit -le 0) { break }
  Write-Host "`n========== offset=$offset limit=$limit ==========" -ForegroundColor Cyan
  node run.js fetch --offset=$offset --limit=$limit
  node run.js manifest
  Start-Sleep -Seconds 5
}

Write-Host "`nAll batches complete." -ForegroundColor Green
node run.js manifest
