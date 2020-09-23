<template>
 <div>
 <QRcode :url='url'/>
 </div>
</template>
<script>
import QRcode from '../../components/QRcode.vue'
export default {
components: {
 QRcode
},
data() {
 return {
 url:'(需要生成二维码的网址)'
 }
}
}
</script>