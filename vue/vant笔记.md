弹出提示，然后跳转页面
```js
    Dialog.alert({
        message: '弹出一段消息'
    }).then(() => {
        this.$router.push('address');
    });
```