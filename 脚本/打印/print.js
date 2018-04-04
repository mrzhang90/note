var hkey_root, hkey_path, hkey_key
hkey_root = "HKEY_CURRENT_USER"
hkey_path = "\\software\\Microsoft\\Internet Explorer\\PageSetup\\"
//设置网页打印的页眉页脚边距为空 
function pagesetup_null() {
    try {
        var RegWsh = new ActiveXObject("WScript.Shell");
        hkey_key = "header";
        RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, "");
        hkey_key = "footer";
        RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, "");
        hkey_key = "margin_left";
        RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, "0.0");
        hkey_key = "margin_right";
        RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, "0.0");
        hkey_key = "margin_top";
        RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, "0.0");
        hkey_key = "margin_bottom";
        RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, "0.0");
    } catch (e) { }
}
//设置网页打印的页眉页脚边距为默认值 
function pagesetup_default() {
    try {
        var RegWsh = new ActiveXObject("WScript.Shell");
        hkey_key = "header";
        RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, "&w&b页码，&p/&P");
        hkey_key = "footer";
        RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, "&u&b&d");
        hkey_key = "margin_left";
        RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, "0.750000");
        hkey_key = "margin_right";
        RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, "0.750000");
        hkey_key = "margin_top";
        RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, "0.750000");
        hkey_key = "margin_bottom";
        RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, "0.750000");
    } catch (e) { }
}
function setdivhidden(id) {//把指定id以外的层统统隐藏 
    // document.getElementById('div2').style.display="none";
    // var divs = document.getElementsByTagName("DIV");
    // for (var i = 0; i < divs.length; i++) {
    //     if (divs.item(i).id != id)
    //         divs.item(i).style.display = "none";
    // }
}
function setdivvisible(id) {//把指定id以外的层统统显示 
    document.getElementById('div2').style.display="block";
    // var divs = document.getElementsByTagName("DIV");
    // for (var i = 0; i < divs.length; i++) {
    //     if (divs.item(i).id != id)
    //         divs.item(i).style.display = "block";
    // }
}
function printpr() //预览函数 
{
    pagesetup_null(); //预览之前去掉页眉页脚边距
    // setdivhidden("div1"); //打印之前先隐藏不想打印输出的元素
    var WebBrowser = '<OBJECT ID="WebBrowser1" WIDTH=0 HEIGHT=0 CLASSID="CLSID:8856F961-340A-11D0-A96B-00C04FD705A2"></OBJECT>';
    document.body.insertAdjacentHTML('beforeEnd', WebBrowser); //在body标签内加入html（WebBrowser activeX控件） 
    WebBrowser1.ExecWB(7, 1); //打印预览 
    WebBrowser1.outerHTML = ""; //从代码中清除插入的html代码 
    // pagesetup_default(); //预览结束后页眉页脚恢复默认值 
    // setdivvisible("div1"); //预览结束后显示按钮 
}
function printIE() //打印函数
{
    pagesetup_null(); //打印之前去掉页眉，页脚
    var WebBrowser = '<OBJECT ID="WebBrowser1" WIDTH=0 HEIGHT=0 CLASSID="CLSID:8856F961-340A-11D0-A96B-00C04FD705A2"></OBJECT>';
    document.body.insertAdjacentHTML('beforeEnd', WebBrowser); //在body标签内加入html（WebBrowser activeX控件）
    WebBrowser1.ExecWB(6, 1); //打印
    WebBrowser1.outerHTML = ""; //从代码中清除插入的html代码
    // pagesetup_default(); //打印结束后页眉页脚恢复默认值
}