npx tsc --build -w &
npm run build:css:watch &
sh .build/copy.sh
chokidar "./src/**/*.html" -c "sh .build/copy.sh"

