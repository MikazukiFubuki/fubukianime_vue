<template>
  <div class="login-container pull-height" @keyup.enter.native="handleLogin">
    <video autoplay muted loop class="bg-video show">-->
      <source src="../../icons/vedio/1.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <video autoplay muted loop class="bg-video">
      <source src="../../icons/vedio/2.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <video autoplay muted loop class="bg-video">
      <source src="../../icons/vedio/3.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <div class="login-info text-white animated fadeInLeft">
      <div class="logo" style="margin-top:-426px">
          <img src="../../assets/images/home/logo.png" width="720px" height="220px" alt="logo" style="vertical-align: middle;" />
      </div>
      <h2 class="login-info-title">{{website.info.title}}</h2>
      <ul class="login-info-list">
        <li class="login-info-item" v-for="item in website.info.list">
          <i class="el-icon-check"></i>&nbsp;{{item}}
        </li>
      </ul>
    </div>
    <div class="login-border  animated fadeInRight">
      <div class="login-main">
        <h1 class="login-title">登录{{website.title}}
        </h1>
        <el-tabs v-model="activeName">
          <el-tab-pane label="用户密码" name="user" text-color="#ffffff">
            <userLogin></userLogin>
          </el-tab-pane>
<!--          <el-tab-pane label="短信验证码" name="code">-->
<!--            <codeLogin></codeLogin>-->
<!--          </el-tab-pane>-->
        </el-tabs>
      </div>
    </div>

  </div>
</template>
<script>
import userLogin from './userlogin'
// import codeLogin from './codelogin'
import { mapGetters } from 'vuex'
export default {
  name: 'login',
  components: {
    userLogin
    // codeLogin
  },
  data() {
    return {
      activeName: 'user'
    }
  },
  created() {
    // 初始化点击事件，控制视频的切换和渐变效果
    let clickCount = 0
    document.body.addEventListener('click', () => {
      clickCount++
      const videos = document.querySelectorAll('.bg-video')
      videos.forEach(video => {
        video.classList.remove('show')
      })
      videos[clickCount % videos.length].classList.add('show')
    })
  },
  mounted() {},
  computed: {
    ...mapGetters(['website'])
  },
  props: [],
  methods: {}
}
</script>

<style lang="scss">
.login-container {
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: rgba(0, 0, 0, 0.2);
  position: relative;
  height: 100%;
}

.login-container::before {
  z-index: -999;
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: url("../../assets/images/top_images/login.png");
  background-size: cover;
}
.login-info {
  padding-left: 60px;
}
.login-info-title {
  line-height: 90px;
}
.login-info-item {
  font-size: 14px;
}
.login-border {
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 60px 50px 60px 50px;
  /*background-color: #fff;*/
  border-radius: 8px;
  box-shadow: 1px 1px 2px #eee;
  background-color: rgba(75, 81, 95, 0.3);
}
.login-main {
  border-radius: 3px;
  box-sizing: border-box;

}
.login-main > h3 {
  margin-bottom: 20px;
}
.login-main > p {
  color: #76838f;
}
.login-title {
  margin: 0 0 20px;
  text-align: center;
  color: #409eff;
  letter-spacing: 3px;
}
.login-submit {
  margin-top: 20px;
  width: 100%;
  border-radius: 28px;
}
.login-form {
  margin: 10px 0;
  .el-form-item__content {
    width: 270px;
  }
  .el-form-item {
    margin-bottom: 12px;
  }
  .el-input {
    input {
      text-indent: 5px;
      border-color: #dcdcdc;
      border-radius: 3px;
    }
    .el-input__prefix {
      i {
        padding: 0 5px;
        font-size: 16px !important;
      }
    }
  }
}
.login-code {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0 0 0 10px;
}
.login-code-img {
  margin-top: 2px;
  width: 100px;
  height: 32px;
  background-color: #fdfdfd;
  border: 1px solid #f0f0f0;
  color: #333;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 5px;
  line-height: 32px;
  text-indent: 5px;
  text-align: center;
}

/* 控制视频显示 */
.bg-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* 铺满页面 */
  opacity: 0;
  z-index: -1;
  transition: opacity 2s ease-in-out;
}

.bg-video.show {
  opacity: 1;
}

/* 基础样式调整 */
.el-input__inner {
  border-radius: 8px !important; /* 强制圆角边框 */
  background-color: transparent !important; /* 初始状态透明背景 */
  border: 1px solid #ccc !important; /* 边框颜色 */
  transition: background-color 0.3s, border-color 0.3s; /* 平滑过渡效果 */
  color:  #7B7DE5;
}

/* 聚焦时的样式调整 */
.el-input__inner:focus {
  background-color: white !important; /* 聚焦时白色背景 */
  border-color: #409EFF !important; /* 聚焦时边框颜色 */
}

.el-tabs__item.is-active {
  color: #ffeecc;
}
</style>

