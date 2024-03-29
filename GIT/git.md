# ssh 与 https
git可以工作在ssh和https两种协议上，但为了安全性，更多会选择ssh
**如果采用https，则每次git push都需要验证身份**

# 一、先注册一个github用户
    https://github.com/join

# 二、命令行安装(MAC 安装)
    访问 http://brew.sh,
    1.拷贝首页代码到命令行,等待后,提示密码输入"123456",提示成功则表示OK;
    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
    2.然后在终端执行 "brew install git" 命令安装 *git

# 三、安装git
    在命令行中分别配置用户名和邮箱
    git config --global user.name "mrzhang90" //你的github用户名
    git config --global user.email "sp6688@vip.qq.com" //你的github邮箱
    git config --global user.name 查看用户邮箱
    git config --list

# 四、初始化仓库
    windows下:先在任意目录右键打开`git-bash`
    mkdir 201602git 创建空目录
    cd 201602git    进入此目录
    git init       初始化GIT仓库 //输入git init命令把这个目录变成Git可以管理的仓库
    PS:如果你没有看到.git目录，那是因为这个目录默认是隐藏的，用ls -al命令就可以看见。

# 工作流程
git clone [地址] :把自己的项目下载到本地
```js
git clone ssh://user:pssword@url
//其中user是你的账号
//password是你的密码
//url是远程git库地址
```
ps:Git支持多种协议，包括https(速度慢)，但通过ssh支持的原生git协议速度最快。
touch 1.txt :创建一个名字叫 1.txt的文件

# 删除：
```js
git rm [文件名] //删除本地文件
git rm -f [文件名] //删除本地文件,以及暂存区中的文件
git rm --cached [文件名] //删除暂存区文件
git rm -r //目录名
```

# 查看:
```js
git status //查看工作区的状态
git reflog //查看命令历史记录(方便回滚用),以便确定要回到未来的哪个版本
git log //查看暂存区的记录
git log --pretty 文件名   //查看文件的修改记录
git log --pretty=oneline //查看暂存区记录的简介
git log --graph //可以看到分支合并图
git remote  //默认为origin,说明连接成功;查看当前远程仓库
git remote -v //查看当前项目对应的地址;查看当前本地仓库关联了哪些远程仓库
git diff //查看本地与暂存区的区别
git diff HEAD -- [文件名] //查看工作区与版本库的区别
git diff --cached //查看暂存区与版本区的区别
git diff master //查看工作区与版本去的区别
```

# 提交到版本库:
```js
git add . //[等同于] git add -A 把工作区中的所有的修改添到暂存区
git add 1.txt //添加暂存区,添加文件
git commit -m "注释" //把文件提交到缓存区
git commit -a -m "注释" //工作区直接到到版本区
```

# 撤销：
1. 回滚
    ```js
        git reset --hard commitID
        git push -f origin
    ```
1. 撤销，放弃本地修改，放弃已提交修改
    ```js
        git reset HEAD . //从暂存区撤回到工作区 (git reset HEAD filepathname)
        git checkout .  //从工作区放弃所有的文件修改 (git checkout -- filepathname 不要忘记中间的“--”,不写就就成了检出分支了)
    ```
2. 将工作区的代码还原成版本库的代码:
    ```js
    git checkout -- [文件名] //撤销,讲版本区撤销到工作区
    git checkout [历史记录] [文件名] //恢复某个指定的文件
    ```
3. 在已经提交到版本库的时候，如果遗漏了某个文件，那么先将这个遗漏文件放到
    - 暂存区，然后git commit -m "新的注释" --amend
    - 就能将之前提交到版本库的文件与遗漏的文件一起保存到版本库。

# 恢复：
1. git checkout -- [文件名]
    把指定文件在工作区的修改全部撤销,两种情况:1.修改后还没有被放到暂存区,那么撤销和版本库一样;2.已经添加到暂存区后，又作了修改,那么撤销回新添加暂存区后的状态
1. git checkout 历史记录（git log）
    指定文件名;要恢复某个指定文件
1. git reset HEAD file :把暂存区的修改撤销掉，重新放回工作区
1. git reset --hard commit_id :恢复到指定版本
1. git reset --hard HEAD^  :恢复当前版本的上一个版本（prev）
1. git reset --hard HEAD~1(prev)[~2(prev的prev)] :恢复当前版本的上某个版本
1. PS:git reset命令既可以回退版本，也可以把暂存区的修改回退到工作区。当我们用HEAD时，表示最新的版本。
1. PS:git checkout其实是用版本库里的版本替换工作区的版本，无论工作区是修改还是删除，都可以“一键还原”。

# 远程仓库:
1. git push origin master  //上传到版本区
1. git pull origin master  //pull与push相反，是将代码从远程仓库同步至本地仓库并merge的命令;pull=fetch+merge 获取代码并且自动合并
1. git remote add teacher https://github.com/mrzhang90/nodejs //关联一个已有的仓库,把内容推送的空仓库中
1. PS:要关联一个远程库，使用命令git remote add origin git@server-name:path/repo-name.git；
    - 关联后，使用命令git push -u origin master第一次推送master分支的所有内容；
    - 此后，每次本地提交后，只要有必要，就可以使用命令git push origin master推送最新修改；

# 分支：
1. git push origin 本地分支:线上分支
1. git branch newbranch v1.0 会以tag v1.0创建新的分支newbranch
1. git branch  查看分支
1. git branch move  新建了move这个分支
1. git checkout move  切换到move分支
1. git checkout -b move  新建move并且切换到move分支;git checkout -b dev origin/dev:创建origin的dev分支
1. git merge dev :合并dev分支到当前分支
1. git branch -D up  (强行删除--还没合并的分支就要强行删除)
1. git branch -d move (合并过的分支，-d就可以删除了)
### 给Node提交分支-遵循以下规范
1. branch name:fix/gh-{num}
1. commit message:"module name:description"
1. test/parallel/test-*.js

# 解决问题:
#### 如果说在push的时候，发现了冲突:
1. git fetch :(将远程的代码拉取下来) fetch是单纯将代码从远程仓库同步至本地仓库，并不作merge。
1. git diff master origin/master :对比(查看冲突)
1. 合并代码:
    - git merge origin/master
        人为解决冲突HEAD 版本库中的代码
        origin   远程仓库的代码
        人为修改完之后，保存版本库，上传（解决了冲突就能成功上传了）

#### 没权限也想维护别人的带码：
1. 先找到想维护的项目
2. fork --点“Fork”就在自己的账号下克隆了一个别人的仓库
3. 将fork的项目clone到本地开发 -- 一定要从自己的账号下clone仓库，这样你才能推送修改
4. push
5. new pull request
6. 留言
7. 等待别人同意
8. 如果你收到了别人fork你的项目：
    1. 先查看别人改了啥？
    2. 如果可以合并new pull request
    3. 留言

# 总结:
- 场景1：当你改乱了工作区某个文件的内容，想直接丢弃工作区的修改时，用命令git checkout -- file。
- 场景2：当你不但改乱了工作区某个文件的内容，还添加到了暂存区时，想丢弃修改，分两步，第一步用命令git reset HEAD file，就回到了场景1，第二步按场景1操作。
- 场景3：多人协作的工作模式通常是这样：
    - 首先，可以试图用git push origin branch-name推送自己的修改；
        - 如果推送失败，则因为远程分支比你的本地更新，需要先用git pull试图合并；
        - 如果合并有冲突，则解决冲突，并在本地提交；
        - 没有冲突或者解决掉冲突后，再用git push origin branch-name推送就能成功！
        - 如果git pull提示“no tracking information”，则说明本地分支和远程分支的链接关系没有创建，用命令git branch --set-upstream branch-name origin/branch-name。
    - 从本地推送分支，使用git push origin branch-name，如果推送失败，先用git pull抓取远程的新提交；
    - 在本地创建和远程分支对应的分支，使用git checkout -b branch-name origin/branch-name，本地和远程分支的名称最好一致；
    - 建立本地分支和远程分支的关联，使用git branch --set-upstream branch-name origin/branch-name；
    - 从远程抓取分支，使用git pull，如果有冲突，要先处理冲突。
        - git fetch + git merge 等同于 git pull
        - 标签:
        - git tag v1.0 :添加一个标签
        - git tag :查看所有标签
        - git show v1.0 :查看标签信息

# 冲突解决：
- 放弃本地修改，直接覆盖：[参考](http://blog.csdn.net/lincyang/article/details/21519333)
    - git reset --hard
    - git pull
- 出现 POST git-receive-pack (chunked) 错误：[参考](http://blog.csdn.net/chenshun123/article/details/52334250)
    - 原因就是 当使用 HTTPS 提交到 Git 上时使用不检查加密要是东西过多将导致提交停止
    - 编辑.git配置文件，加入
        - [http] 
            - postBuffer = 524288000

```
红色:本地
绿色:暂存区
PS: 注意不能只有一个空文件夹，必须包含文件  
```    
