1. 拉新分支
  基于最新tag，创建新分支，hotfix-功能名
2. 合并test
  将修复代码提交到hotfix-分支，再通过gitlab的merge Requests将代码合并到test分支
3. 测试发版
  通知测试人员 jenkins发版，然后自测
4. 提测文档
  * 12.24 线上bug-内容修复统计
  * 12.24 线上bug-提测文档
  * 12.24 线上bug-上线文档
  * 12.24 线上bug-技术文档
5. 发测试邮件