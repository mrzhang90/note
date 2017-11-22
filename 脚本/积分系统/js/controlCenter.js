function fontInit() {
    var val1 = resetFontBox($("#homeTeam>.fa"));
    var val2 = resetFontBox($("#guestTeam>.fa"));
    var values = {};
    values.lineHeight = val1.lineHeight > val2.lineHeight ? val2.lineHeight : val1.lineHeight;
    values.fontSize = val1.fontSize > val2.fontSize ? val2.fontSize : val1.fontSize;
    setFaBox($("#guestTeam>.fa"), values);
    setFaBox($("#homeTeam>.fa"), values);

    $(".scoreTitle .fa").each(function() {
        resetFontBox(this);
    });

    resetFontBox($("#strInfo>.fa"));

    var fsValues = resetFontBox($(".fsVal>.fa"));
    $(".fsVal").css("line-height", fsValues.lineHeight + "px");
    $(".fsVal").css("font-size", fsValues.fontSize + "px");

    var fsTitleValues = resetFontBox($(".fsTitle>.fa"));
    $(".fsTitle").css("line-height", fsTitleValues.lineHeight + "px");
    $(".fsTitle").css("font-size", fsTitleValues.fontSize + "px");

    // var scoreBoxValue = resetFontBox($("#homeScoreBox>.fa"));
    // $(".scoreBox input").css("font-size", scoreBoxValue.fontSize);
    // $(".scoreBox input").css("line-height", scoreBoxValue.lineHeight);
    var scoreBox =$('.scoreBox');
    var scoreElement=select(scoreBox);
    // resetFontBox($("#barContent>.fa"));
    //  resetFontBox($("#selectPhase"));
    var barContent = $("#barContent");
    var barElement=select(barContent);
    var selectPhase=$("#selectPhase");

    change(scoreBox,scoreElement);
    change(barContent,barElement);
    change(selectPhase,barElement);

    // $("#gamePhase").css("line-height", barValues.lineHeight + "px");
    // $("#gamePhase").css("font-size", barValues.fontSize + "px");

    resetFontBox($("#scTitle>.fa"));
    resetFontBox($("#foulStatisticsTitle>.fa"));
    resetFontBox($("#timeOutStatisticsTitle>.fa"));

    var tmTitleValue = resetFontBox($("#timerTitleInner>.fa"));
    $("#tmTitle").css("line-height", tmTitleValue.lineHeight + "px");
    $("#tmTitle").css("font-size", tmTitleValue.fontSize + "px");

    var tmInnerValue = resetFontBox($("#timerValueInner>.fa"));
    $("#tmValueInner").css("line-height", tmInnerValue.lineHeight + "px");
    $("#tmValueInner").css("font-size", tmInnerValue.fontSize + "px");


    var timerButtonValues = resetFontBox($("#timerButton"));
    $(".timerButtonInner").css("line-height", timerButtonValues.lineHeight + "px");
    $(".timerButtonInner").css("font-size", timerButtonValues.fontSize + "px");

    var sdValues = resetFontBox($("#sd"));
    $(".sd").css("line-height", sdValues.lineHeight + "px");
    $(".sd").css("font-size", sdValues.fontSize + "px");

    var sbButtonValue = resetFontBox($("#submitButton"));
    $(".sbButtonValue").css("line-height", sbButtonValue.lineHeight + "px");
    $(".sbButtonValue").css("font-size", sbButtonValue.fontSize + "px");

    $(".nav .fa").each(function() {
        resetFontBox(this);
    });

    var scButton=$('.scButton');
    scButton.height(scButton.width())

    // resetFontBox($(".scButtonValueOuter"));
    // var scValues = resetFontBox($("#sbv"));
    // $(".scButtonValueOuter").css("line-height", scValues.lineHeight + "px");
    // $(".scButtonValueOuter").css("font-size", scValues.fontSize + "px");
    var scButtonValueOuter = $('.scButtonValueOuter');
    var scHeight=scButtonValueOuter.eq(0).height();
    scButtonValueOuter.css({'line-height':scHeight+'px','font-size':scHeight})

    // var fsbfValues = resetFontBox($("#fsbf"));
    // $(".fsButtonInner").css("line-height", fsbfValues.lineHeight + "px");
    // $(".fsButtonInner").css("font-size", fsbfValues.fontSize + "px");
    var fsButtonInner=$('.fsButtonInner');
    var fsHeight=fsButtonInner.parent().height();
    var fswidth=fsButtonInner.width();
    fsButtonInner.css({'line-height':fsHeight+'px','font-size':fswidth<fsHeight?fswidth:fsHeight})

    // 发球权
    ServeRight($('#disabledStr'),48);
    ServeRight($('#homeStr'),83);
    ServeRight($('#guestStr'),83);
}
function select(element){
    var height=element.height();
    var width=element.width();
    return {'line-height':height+'px','font-size':width<height?width:height};
}
function change(element,obj){
    element.css(obj);
}
function ServeRight(homeStr,current){
    var iHome=homeStr.children('i');
    var _width=homeStr.width();
    var _height=homeStr.height();
    var num=_width<_height ? _width :_height;
    var _scale=num / current;
    iHome.css('transform','scale('+_scale+')');
}
function setFaBox(obj, values) {
    var $this = $(obj);
    var $parent = $this.parents("div:first");
    $this.css("font-size", values.fontSize + "px");
    $parent.css("line-height", values.lineHeight + "px");
}

function resetFontBox(obj) {
    var $this = $(obj);
    var $parent = $this.parents("div:first");
    var maxSize = 130;
    var fontSize = 1;
    var parentWidth = $parent.width();
    var parentHeight = $parent.height();
    $this.css("line-height", parentHeight + "px");
    for (var i = fontSize; i < maxSize; i+=2) {
        fontSize=i;
        $this.css("font-size", i + "px");
        var curWidth = $this.get(0).scrollWidth;
        if (curWidth > parentWidth + 2) {
            fontSize = i - 1;
            $this.css("font-size", fontSize + "px");
            break;
        }

        var curHeight = $this.get(0).scrollHeight;
        if (curHeight > parentHeight + 2) {
            fontSize = i - 1;
            $this.css("font-size", fontSize + "px");
            break;
        }
    }

    /*for (var i = fontSize; i > 0; i--) {
    	
    	$this.css("font-size", i + "px");
    	var curHeight = $this.get(0).scrollHeight;
    	
    	if (curHeight <= parentHeight) {
    		fontSize = i;							
    		break;
    	}
    }*/



    return {
        lineHeight: parentHeight,
        fontSize: fontSize
    };
}
$(function() {
    // $("body").height(window.screen.height-210).show();
    // var _height = window.screen.height-210-75;
    // var _height = window.screen.height-210-75;
    // $("#mainFrame", window.parent.document).height(_height);
    // $("body").height(_height).show();
    fontInit();
});


$(window).resize(function() {
    fontInit();
});