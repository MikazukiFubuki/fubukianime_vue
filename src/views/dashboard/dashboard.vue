<template>
  <div class="app-container">
    <iframe ref="iframe" src="http://wyx.mikazukifubukianime.com/" style="width:100%; border:none;" scrolling="no"></iframe>
  </div>
</template>

<style scoped>
.app-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>

<script>
export default {
  name: 'MyComponent',
  mounted() {
    window.addEventListener('resize', this.resizeIframe);
    this.resizeIframe();
  },
  methods: {
    resizeIframe() {
      this.$refs.iframe.style.height = `${window.innerHeight}px`;
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeIframe);
  }
}
</script>
