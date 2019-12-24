1. 拉新分支
  基于最新tag，创建新分支，hotfix-20191224
2. 合并test
  将修复代码提交到hotfix-20191224，再通过gitlab的merge Requests将代码合并到test分支
3. 测试发版 code review
  通知测试人员 jenkins发版，然后**自测，再测试code review**
4. 提测文档
  * 12.24 线上bug-内容修复统计
  * 12.24 线上bug-提测文档
  * 12.24 线上bug-上线文档
  * 12.24 线上bug-技术文档
5. 发测试邮件
6. 上线code reivew
  通过**测试后，再上线code review**
7. 发上线邮件
  基于hotfix-20191224合master,再打新tag，然后发上线邮件