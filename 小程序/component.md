###多层组件传值

####孙子级
1. 定义按钮组件-获取用户电话
```html
<button 
  open-type="getPhoneNumber"
  bindgetphonenumber="bindgetphonenumber"
>
```
2. 子级事件内调用triggerEvent方法，通知父级的事件
```js
    bindgetphonenumber(e) {
      this.triggerEvent('getPhone',e);
    }
```


####子级
1. 
```html
<zan-button
          class="zan-dialog__button"
          custom-class="{{ index === 0 ? 'zan-dialog__button-inside--first' : 'zan-dialog__button-inside' }}"
          data-type="{{ item.type }}"
          open-type="{{ item.openType }}"
          bind:btnclick="handleButtonClick"
          bind:getPhone="handleGetPhone"
        >
```

```js
handleGetPhone(e){
      this.triggerEvent('childGetPhone',e)
    }
```
####父级
```html
  <zan-dialog id="zan-dialog2" bind:childGetPhone="childGetPhone"></zan-dialog>
```
```js
  childGetPhone(e){
    console.log('hi phone')
    console.log(e);
  }
```