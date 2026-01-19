# PowerShell script to build and open in Chrome
Write-Host "Building project..." -ForegroundColor Green
npm run build

Write-Host ""
Write-Host "Opening in Chrome..." -ForegroundColor Green
$distPath = Join-Path $PSScriptRoot "dist\index.html"
Start-Process "chrome.exe" -ArgumentList "file:///$($distPath.Replace('\', '/'))"

Write-Host ""
Write-Host "Done! The game should open in Chrome." -ForegroundColor Green

