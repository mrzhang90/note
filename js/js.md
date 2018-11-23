## 方法
1. eval(arr.join("+"))
        数组快速相加-得相加之合
1. 数组快速删除
```js
//清空
arr.length=0
//只保留前三个
arr.length=3
```
## 能力
1.  javascript获取 CPU/GPU/memory 信息
```html
<!-- 参考：https://ask.helplib.com/others/post_12581088 -->
<html>
<body>
 <canvas id="glcanvas" width="0" height="0"></canvas>
 <script>
 var performance = window.performance || window.mozPerformance || window.msPerformance || window.webkitPerformance || {};
 document.write("<br>");
 for (var value in performance) {
 document.write(value +"<br>");
 }
 document.write("<br><br><br>");
 var canvas;
 canvas = document.getElementById("glcanvas");
 var gl = canvas.getContext("experimental-webgl");
 document.write(gl.getParameter(gl.RENDERER) +"<br>");
 document.write(gl.getParameter(gl.VENDOR) +"<br>");
 document.write(getUnmaskedInfo(gl).vendor +"<br>");
 document.write(getUnmaskedInfo(gl).renderer +"<br>");
 function getUnmaskedInfo(gl) {
 var unMaskedInfo = {
 renderer: '',
 vendor: ''
 };
 var dbgRenderInfo = gl.getExtension("WEBGL_debug_renderer_info");
 if (dbgRenderInfo!= null) {
 unMaskedInfo.renderer = gl.getParameter(dbgRenderInfo.UNMASKED_RENDERER_WEBGL);
 unMaskedInfo.vendor = gl.getParameter(dbgRenderInfo.UNMASKED_VENDOR_WEBGL);
 }
 return unMaskedInfo;
 }
 </script>
</body>
```