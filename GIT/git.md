#### 拉去代码，提示Git pull error: unable to create file (Invalid argument)
我遇到的问题，是因为一些文件（没有扩展名或者是其他问题）导致无法同步到windows机器上
解决方案：
1. 进入 .git目录并打开 config文件。在[core]段添加下面的行：
```
  sparsecheckout = true
```
.git/info目录并创建 sparse-checkout文件。加入下面这些：
```
*
!kickstarter/parsers/data/kickstarter/campaigndetails/*
```
第一行包含任何字符，
第二行不包含在 kickstarter/parsers/data/kickstarter/campaigndetails/里面的所有文件