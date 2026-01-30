@echo off
echo === Git Status ===
git status
echo.
echo === Git Remote ===
git remote -v
echo.
echo === Git Branch ===
git branch -a
echo.
echo === Git Log ===
git log --oneline -5
