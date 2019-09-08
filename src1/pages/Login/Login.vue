<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;"
             :class="{on:loginWay}"
             @click="loginWay=true">短信登录</a>
          <a href="javascript:;"
             :class="{on:!loginWay}"
             @click="loginWay=false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{on:loginWay}">
            <section class="login_message">
              <input type="tel"
                     maxlength="11"
                     placeholder="手机号"
                     v-model="phone"
                     name="phone"
                     v-validate="'required|phone'">
              <span style="color:red"
                    v-show="errors.has('phone')"
                    class="help is-danger">{{ errors.first('phone') }}</span>
              <button :disabled="!isRightPhone||time>0"
                      :class="{right:isRightPhone}"
                      @click.prevent="sendCode"
                      class="get_verification">{{time>0?`已发送(${time})s`:'获取验证码'}}</button>
            </section>
            <section class="login_verification">
              <input type="tel"
                     maxlength="8"
                     placeholder="验证码"
                     v-model="code"
                     name="code"
                     v-validate="'required|code'">
              <span style="color:red"
                    v-show="errors.has('code')"
                    class="help is-danger">{{ errors.first('code') }}</span>
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on:!loginWay}">
            <section>
              <section class="login_message">
                <input type="tel"
                       maxlength="11"
                       placeholder="手机/邮箱/用户名"
                       v-model="name"
                       name="name"
                       v-validate="'required'">
                <span style="color:red"
                      v-show="errors.has('name')"
                      class="help is-danger">{{ errors.first('name') }}</span>
              </section>
              <section class="login_verification">
                <input :type="isShowPwd?'text':'password'"
                       maxlength="8"
                       placeholder="密码"
                       v-model="pwd"
                       name="pwd"
                       v-validate="'required'">
                <span style="color:red"
                      v-show="errors.has('pwd')"
                      class="help is-danger">{{ errors.first('pwd') }}</span>
                <div class="switch_button"
                     :class="isShowPwd?'on':'off'"
                     @click="isShowPwd=!isShowPwd">
                  <div class="switch_circle"
                       :class="{rights:isShowPwd}"></div>
                  <span class="switch_text">{{isShowPwd?'abc':''}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text"
                       maxlength="11"
                       placeholder="验证码"
                       name="captcha"
                       v-model="captcha"
                       v-validate="'required'">
                <span style="color:red"
                      v-show="errors.has('captcha')"
                      class="help is-danger">{{ errors.first('captcha') }}</span>
                <img class="get_verification"
                     src="http://localhost:5000/captcha"
                     alt="captcha"
                     @click="sendCaptcha"
                     ref="captcha">
              </section>
            </section>
          </div>
          <button class="login_submit"
                  @click.prevent="login">登录</button>
        </form>
        <a href="javascript:;"
           class="about_us">关于我们</a>
      </div>
      <a href="javascript:"
         class="go_back"
         @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
  </section>
</template>
<script>
import { reqSendCode, reqSmsLogin, reqPwdLogin } from '../../api';
// 引入mutations的type
import { RECEIVE_USER } from '../../store/mutation-type'
export default {
  data () {
    return {
      loginWay: true, // 切换登录方式的flag
      phone: '', // 用户输入的手机号
      time: 0,  // 倒计时
      isShowPwd: false, // 显示明文密码
      code: '', // 验证码
      name: '', // 用户名
      pwd: '', // 密码
      captcha: '' // 图形验证码
    }
  },
  computed: {
    /* 
    是否是一个正确的手机号
    */
    isRightPhone () {
      return /^1\d{10}$/.test(this.phone)
    }
  },
  methods: {
    async sendCode () {
      // 倒计时的操作
      this.time = 30
      const timeId = setInterval(() => {
        if (this.time === 0) {
          window.clearInterval(timeId)
        } else {
          this.time--
        }
      }, 1000);
      // 进入倒计时，进行发送短信验证码的操作
      const result = await reqSendCode(this.phone)
      // 判断是否发送验证码成功
      if (result.code === 0) {
        // 成功
        alert('发送短信验证码成功')
      } else {
        // 失败
        alert('发送短信验证码失败')
        // 倒计时归零
        this.time = 0
        // 清空定时器
        window.clearInterval(timeId)
      }
    },
    //点击登录按钮 进行 登录操作
    async login () {
      // 定义一个变量存储登录方式的名字，用来进行表单验证
      let names
      const { loginWay, phone, code, name, pwd, captcha } = this
      // 判断是哪种登录方式
      if (loginWay) {
        // 手机号登录
        names = ['phone', 'code']
      } else {
        // 用户名密码登录
        names = ['name', 'pwd', 'captcha']
      }
      // 登录前判断表单验证是否全部通过 验证通过返回true，否则返回false
      const success = await this.$validator.validateAll(names)
      // 进行判断  是否验证通过
      if (success) {
        // 验证通过
        let result
        // 再次判断是那种登录方式，然后调用对应的接口请求函数
        if (loginWay) {
          // 手机号码登录
          result = await reqSmsLogin(phone, code)
          // 停止计时
          this.time = 0
        } else {
          // 用户名密码登录
          result = await reqPwdLogin({ name, pwd, captcha })
        }
        if (result.code === 0) {
          // 登录成功，跳转到个人中心页面
          this.$router.replace('/profile')
          // 拿到用户的登录信息
          const user = result.data
          // console.log(user);
          // 更新vuex中的user
          this.$store.commit(RECEIVE_USER, user)
        } else {
          alert('登录失败')
        }
      }
    },
    sendCaptcha () {
      this.$refs.captcha.src = 'http://localhost:5000/captcha?time=' + Date.now()
    }
  },
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins.styl'
.loginContainer
  width 100%
  height 100%
  background #fff
  .loginInner
    padding-top 60px
    width 80%
    margin 0 auto
    .login_header
      .login_logo
        font-size 40px
        font-weight bold
        color #02a774
        text-align center
      .login_header_title
        padding-top 40px
        text-align center
        >a
          color #333
          font-size 14px
          padding-bottom 4px
          &:first-child
            margin-right 40px
          &.on
            color #02a774
            font-weight 700
            border-bottom 2px solid #02a774
    .login_content
      >form
        >div
          display none
          &.on
            display block
          input
            width 100%
            height 100%
            padding-left 10px
            box-sizing border-box
            border 1px solid #ddd
            border-radius 4px
            outline 0
            font 400 14px Arial
            &:focus
              border 1px solid #02a774
          .login_message
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .get_verification
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              border 0
              color #ccc
              font-size 14px
              background transparent
              &.right
                color black
          .login_verification
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .switch_button
              font-size 12px
              border 1px solid #ddd
              border-radius 8px
              transition background-color 0.3s, border-color 0.3s
              padding 0 6px
              width 30px
              height 16px
              line-height 16px
              color #fff
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              &.off
                background #fff
                .switch_text
                  float right
                  color #ddd
              &.on
                background #02a774
              >.switch_circle
                // transform translateX(27px)
                position absolute
                top -1px
                left -1px
                width 16px
                height 16px
                border 1px solid #ddd
                border-radius 50%
                background #fff
                box-shadow 0 2px 4px 0 rgba(0, 0, 0, 0.1)
                transition transform 0.3s
                &.rights
                  transform translateX(27px)
          .login_hint
            margin-top 12px
            color #999
            font-size 14px
            line-height 20px
            >a
              color #02a774
        .login_submit
          display block
          width 100%
          height 42px
          margin-top 30px
          border-radius 4px
          background #4cd96f
          color #fff
          text-align center
          font-size 16px
          line-height 42px
          border 0
      .about_us
        display block
        font-size 12px
        margin-top 20px
        text-align center
        color #999
    .go_back
      position absolute
      top 5px
      left 5px
      width 30px
      height 30px
      >.iconfont
        font-size 20px
        color #999
</style>
 