<script>
import {
  shareHelp
} from './wx'
export default {
  name: 'App',
  mounted () {
    // 分享
    shareHelp({
      link: location.href,
      success: () => {
        console.log('分享成功')
      }
    }, () => this.$axios.get(`/wechat/get_signature_config/?url=${location.href}`))
  }
}
</script>