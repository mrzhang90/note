#### selenium
**概念：** selenium用于测试web应用，运行在浏览器中，支持的浏览器包括IE（7, 8, 9, 10, 11），Mozilla Firefox，Safari，Google Chrome，Opera等。包含了测试的录制（selenium IDE）,编写及运行（Selenium Remote Control）和测试的并行处理（Selenium Grid）。
**作用：** Selenium的核心Selenium Core基于JsUnit
**PhantomJS** 一个而基于WebKit的服务端JavaScript API,支持Web而不需要浏览器支持，其快速、原生支持各种Web标准：Dom处理，CSS选择器，JSON等等。PhantomJS可以用用于页面自动化、网络监测、网页截屏，以及无界面测试
**使用：** [更多使用方法：selenium库的基本使用](https://www.jianshu.com/p/3aa45532e179)
```js
//声明并调用浏览器
from selenium import webdriver
browser = webdriver.Chrome()
browser = webdriver.Firefox()

//自动打开Chrome浏览器，并登陆百度打印百度首页的源代码，然后关闭浏览器
from selenium import webdriver //导入库
browser = webdriver.Chrome()   //声明浏览器
url = 'https:www.baidu.com'
browser.get(url)               //打开浏览器预设网址
print(browser.page_source)     //打印网页源代码
browser.close()                //关闭浏览器

//单个元素查找
from selenium import webdriver //导入库
browser = webdriver.Chrome()   //声明浏览器
url = 'https:www.taobao.com'
browser.get(url)               //打开浏览器预设网址
input_first = browser.find_element_by_id('q')
input_two = browser.find_element_by_css_selector('#q')
print(input_first)
print(input_two)
```