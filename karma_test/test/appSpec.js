describe("这是我的第一个断言", function () {  
  it("判断点赞两次是不是等于2", function () {
  	var str;
  	$(document.body).append('<div id="aa"></div>');
  	var element=$('#aa');
	var t=new $.thumb(element);
	str=t.plus1();
	str=t.plus1();
	expect(2).toEqual(str);
  });
}); 