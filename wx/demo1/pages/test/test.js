var param={
  data: {
    prevDisabled: true,
    prevType:'default',
    nextDisabled:false,
    nextType:'primary',
    nextText:'下一题',
    result:[],
    items: '',
    pageNo:1,
    pageTotal:0,
    selectedVal:[]
  },
  onLoad:function(){
    var result = [
      {
        "title": "这是第1个问题，请给出答案",
        "id": "1",
        "content": [
          { "text": "中国", "id": "001" },
          { "text": "美国", "id": "002" },
          { "text": "英国", "id": "003" },
          { "text": "俄罗斯", "id": "004" }
        ]
      }, {
        "title": "这是第2个问题，请给出答案",
        "id": "2",
        "content": [
          { "text": "中国2", "id": "001" },
          { "text": "美国", "id": "002" },
          { "text": "英国", "id": "003" },
          { "text": "俄罗斯", "id": "004" }
        ]
      }, {
        "title": "这是第3个问题，请给出答案",
        "id": "3",
        "content": [
          { "text": "中国3", "id": "001" },
          { "text": "美国", "id": "002" },
          { "text": "英国", "id": "003" },
          { "text": "俄罗斯", "id": "004" }
        ]
      }
    ];
    this.setData({
      result: result,
      items: result[0],
      pageTotal:result.length
    })
  },
  checkboxChange: function (e) {
    var _arr=[];
    var selectVal = { 'askID': this.data.items['id'], 'answerID': e.detail.value };
    var result = this.data.result;
    var items=result[this.data.pageNo-1];
    for(let i=0,len=items.content.length;i<len;i++){
      if (items.content[i]['id'] === selectVal.answerID){
        items.content[i]['checked']=true;
      }else{
        items.content[i]['checked'] = false;
      }
    }
    result[this.data.pageNo-1] = items;
    if (this.data.pageNo==1){
      _arr.push(selectVal)
    } else {
      _arr = this.data.selectedVal;
      _arr[this.data.pageNo - 1]=selectVal;
    }
    this.setData({
      selectedVal: _arr,
      result: result
    })
    
  },
  prevBtn:function(e){
    this.renderPage(this.data.pageNo - 1)
  },
  nextBtn:function(e){
    if(!this.data.selectedVal[this.data.pageNo - 1]){
      wx.showToast({
        icon:'none',
        title: '请选择一个答案'
      })
      return;
    }
    this.renderPage(this.data.pageNo + 1)
  },
  submitBtn:function(){
    this.setData({
      prevDisabled: true,
      nextDisabled: true
    })
    console.log(this.data.selectedVal)
  },
  renderPage: function (pageNo){
    if(pageNo==1){
      this.setData({
        prevDisabled: true,
        prevType: 'default'
      })
    }else if (pageNo == this.data.pageTotal){
      this.setData({
        // nextDisabled: true,
        // nextType: 'default',
        nextText: '提交'
      })
    } else if (pageNo > this.data.pageTotal){
      this.submitBtn();
      return;
    }else {
      this.setData({
        prevDisabled: false,
        prevType: 'primary',
        // nextDisabled: false,
        // nextType: 'primary',
        nextText: '下一题'
      })
    }
    this.setData({
      items: this.data.result[pageNo - 1],
      pageNo: pageNo
    })
  }
} 

Page(param);
