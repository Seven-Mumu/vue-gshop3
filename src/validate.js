import Vue from 'vue';
import VeeValidate from 'vee-validate';
import zh_CN from 'vee-validate/dist/locale/zh_CN'
Vue.use(VeeValidate)


VeeValidate.Validator.localize('zh_CN', {
  messages: zh_CN.messages,
  attributes: {
    phone: '手机号码',
    code: '短信验证码',
    name: '用户名',
    pwd: '密码',
    captcha: '图形验证码'
  }
})

// 扩展方法
VeeValidate.Validator.extend('phone', {
  getMessage: () => `请输入正确的手机号码`,
  validate: (value) => {
    return /^1\d{10}$/.test(value)
  }
})

VeeValidate.Validator.extend('code', {
  getMessage: () => `请输入正确的短信验证码`,
  validate: (value) => {
    return /\d{6}/.test(value)
  }
})