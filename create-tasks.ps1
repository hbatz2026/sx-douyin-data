# 一键创建抖本工坊云端自动化计划任务
# 以管理员身份运行：powershell -ExecutionPolicy Bypass -File create-tasks.ps1

$actionPath = "D:\Temp\WorkBuddy\douyin-cloud-auto"
$nodeExe = (Get-Command node.exe -ErrorAction SilentlyContinue).Source
if (-not $nodeExe) {
    Write-Host "错误: 未找到 node.exe，请确认 Node.js 已安装" -ForegroundColor Red
    exit 1
}

function New-DouyinTask {
    param($Name, $Script, $Time)
    
    $existing = Get-ScheduledTask -TaskName $Name -ErrorAction SilentlyContinue
    if ($existing) { Unregister-ScheduledTask -TaskName $Name -Confirm:$false }
    
    $action = New-ScheduledTaskAction -Execute $nodeExe `
        -Argument "scripts/update-data.mjs $Script" `
        -WorkingDirectory $actionPath
    
    $trigger = New-ScheduledTaskTrigger -Weekly -DaysOfWeek Monday -At $Time
    
    $principal = New-ScheduledTaskPrincipal -UserId "SYSTEM" -LogonType ServiceAccount -RunLevel Highest
    
    $settings = New-ScheduledTaskSettingsSet `
        -AllowStartIfOnBatteries `
        -DontStopIfGoingOnBatteries `
        -StartWhenAvailable `
        -MultipleInstances IgnoreNew
    
    Register-ScheduledTask -TaskName $Name -Action $action -Trigger $trigger `
        -Principal $principal -Settings $settings -Force
    
    Write-Host "✅ $Name - 每周一 $Time" -ForegroundColor Green
}

Write-Host "=== 创建抖本工坊自动化任务 ===" -ForegroundColor Cyan

New-DouyinTask "Douyin-UpdateTopics" "topics" "09:00"
New-DouyinTask "Douyin-UpdateBGM" "bgm" "09:00"
New-DouyinTask "Douyin-UpdateHotspot" "hotspot" "09:30"

Write-Host ""
Write-Host "完成！三个任务已创建：" -ForegroundColor Green
Write-Host "  选题库更新  - 每周一 09:00" 
Write-Host "  BGM推荐更新 - 每周一 09:00"
Write-Host "  热点跟拍更新 - 每周一 09:30"
Write-Host ""
Write-Host "⚠️ 前提：需要设置环境变量 DEEPSEEK_API_KEY" -ForegroundColor Yellow
Write-Host "  以管理员身份运行 PowerShell 执行："
Write-Host "  [Environment]::SetEnvironmentVariable('DEEPSEEK_API_KEY','你的Key','Machine')" -ForegroundColor Gray
Write-Host ""
Write-Host "验证方式：打开 '任务计划程序' (taskschd.msc) 查看" -ForegroundColor Gray
