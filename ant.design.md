## 表单校验
功能：校验用户地址
条件：校验级联选择和输入框，要么同时有值，要么都为空，否则报错
```html
<a-form :form="form" @submit="handleSubmit">
    <a-col :xs="24" :xl="14">
        <a-form-item
            label="居住地址"
            :help="formInfo['addressMsg']"
            :validate-status="formInfo['addressStatus']"
        >
            <!-- cascader-input是自定义组件 -->
            <!-- 子组件内通过change通知到decorator指令上 this.$emit('change', data)-->
            <cascader-input
                class="someInput"
                :options="addressOptions"
                placeholder="请选择国家/省/市"
                
                v-decorator="['city',cityConfig]"
            />
            <a-input
                class="someInput"
                placeholder="请输入详细地址 "
                v-decorator="['address',addressConfig]"
            />
        </a-form-item>
    </a-col>
    <button-primary htmlType="submit" value="提交"/>
</a-form>
```
```js
// 封装校验地址方法
const Validate={
    validateAddress (address, city) {
      const hasCity = Array.isArray(city) && city.length > 0
      const hasError = (address && !hasCity) || (!address && hasCity)
      const addressMsg = hasError ? (!hasCity ? '请选择国家/省/市' : '请输入详细地址') : ''
      return {
        addressMsg,
        addressStatus: hasError ? 'error' : 'success'
      }
    }
}
data(){
    // 校验级联
    cityConfig: {
        rules: [{
          validator: this.handleCityChange
        }]
    },
    // 校验详细地址
    addressConfig: {
        rules: [{
          validator: this.handleAddressChange
        }]
    }
    // 表单状态
    formInfo: {
        //状态success或error，error则标红
        addressStatus: 'success',
        addressMsg:''
    },
    formInformation:{
        city:['北京','北京']
        address: '123',
    }
},
created () {
    this.form = this.$form.createForm(this, {
      name: 'xxxx',
      mapPropsToFields: () => {
        const formInformation = this.formInformation
        const _form = {}
        // 将数据遍历，通过createFormField将数据渲染到控件上
        Object.keys(formInformation).forEach(key => {
          Object.assign(_form, {
            [key]: this.$form.createFormField({
              value: formInformation[key]
            })
          })
        })
        return _form
      }
    })
},
methods:{
    // 校验级联
    handleCityChange (rule, value, callback) {
      const address = this.form.getFieldsValue().address
      const city = value
      const validateInfo = Validate.validateAddress(address, city)
      this.formInfo = {
        ...validateInfo
      }
      validateInfo['addressMsg']
        ? callback(validateInfo['addressMsg'])
        : callback()
    },
    // 校验详细地址
    handleAddressChange (rule, value, callback) {
      const address = value
      const city = this.form.getFieldsValue().city
      const validateInfo = Validate.validateAddress(address, city)
      this.formInfo = {
        ...validateInfo
      }
      validateInfo['addressMsg']
        ? callback(validateInfo['addressMsg'])
        : callback()
    }
}
```