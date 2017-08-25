var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('firefox')
    .build();

driver.get('http://localhost:9000/karma_test/index.html');
// driver.findElement(By.name('wd')).sendKeys('html');
driver.findElement(By.id('j_finger')).click();
driver.wait(until.titleIs('点赞1'), 5000);
driver.quit();