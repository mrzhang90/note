var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('Chrome')
    .build();

driver.get('http://www.baidu.com/');
driver.findElement(By.name('wd')).sendKeys('html');
driver.findElement(By.id('su')).click();
driver.wait(until.titleIs('html_百度搜索'), 1000);
driver.quit();