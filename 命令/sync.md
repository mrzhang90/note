##rsync命令行
####设置忽略规则
1. rsync -razv --exclude-from=/**/ignore.list ./service "root@192.168.0.0:/data/www/bk_campaign"
1. ignore.list文件里写忽略规则，例如: /node_modules