@echo off
echo ========================================
echo   HEROKU DEPLOYMENT SCRIPT
echo ========================================
echo.

echo [1/6] Logging into Heroku...
heroku login

echo.
echo [2/6] Creating Heroku app...
heroku create fosse-equipment-monitor

echo.
echo [3/6] Setting environment variables...
heroku config:set SECRET_KEY=your-super-secret-key-change-this-in-production
heroku config:set DEBUG=False

echo.
echo [4/6] Adding files to Git...
git add .
git commit -m "Deploy to Heroku with production settings"

echo.
echo [5/6] Pushing to Heroku...
git push heroku main

echo.
echo [6/6] Setting up database...
heroku run python manage.py migrate

echo.
echo [7/7] Creating superuser...
heroku run python manage.py createsuperuser

echo.
echo ========================================
echo     DEPLOYMENT COMPLETE!
echo ========================================
echo.
echo Your app is live at:
echo https://fosse-equipment-monitor.herokuapp.com
echo.
echo API endpoints:
echo https://fosse-equipment-monitor.herokuapp.com/api/
echo https://fosse-equipment-monitor.herokuapp.com/admin/
echo.
echo Next steps:
echo 1. Visit your app URL
echo 2. Create test users
echo 3. Update frontend API URL
echo.
pause
