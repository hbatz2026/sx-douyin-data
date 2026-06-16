@echo off
REM 抖本内容工坊 · Windows 计划任务脚本
REM 用法：设置环境变量 DEEPSEEK_API_KEY 后，用任务计划程序每周一9:00运行此脚本
REM 脚本依次执行：选题更新 → BGM更新 → 热点更新

cd /d "D:\Temp\WorkBuddy\douyin-cloud-auto"

echo [%date% %time%] 开始更新选题库...
node scripts/update-data.mjs topics
if %ERRORLEVEL% neq 0 echo [ERROR] 选题库更新失败

echo [%date% %time%] 开始更新BGM...
node scripts/update-data.mjs bgm
if %ERRORLEVEL% neq 0 echo [ERROR] BGM更新失败

echo [%date% %time%] 开始更新热点...
node scripts/update-data.mjs hotspot
if %ERRORLEVEL% neq 0 echo [ERROR] 热点更新失败

echo [%date% %time%] 全部更新完成
