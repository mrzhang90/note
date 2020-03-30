查看本地是否存在SSH密匙
ls -al ~/.ssh

生成ssh密钥
ssh-keygen -t rsa -C "sp6688@vip.qq.com"

查看密匙
cat ~/.ssh/id_rsa.pub

GIT版本
git version

ssh版本
ssh -V

登陆
ssh name@192.168.0.10

登出
logout 192.168.0.10