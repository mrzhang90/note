$(function(){
    var arr=[];
    $('[data-file=file]').each(function(){
        arr.push({
            'element':$(this),
            'index':$(this).index('[data-file=file]'),
            'address':'/img/userphoto/uploadImg.do'
            // ,'callback':function(data){
            //     console.log(data);
            // }
        })
    })
    for(var i=0;i<arr.length;i++){
        fileUpload(arr[i]);
    }
})
function isRequired(element){
    var bool=true;
    element.find('input[data-required=1]').each(function(){
        if(!$(this).val()){
            bool=false;
            return false;
        }
    })
    element.find('input[data-sign=uploading]').each(function(){
        bool=false;
        return false;
    })
    return bool;
}
function fileUpload(config){
    var element=config['element'];
    element.attr({'id':'file'+config.index,'name':'file'+config.index});//swfUp下需要id和name，用来点击和提交
    var type=config['element'].attr('data-type') || '';
    var uploadFile=$('<input type="file" class="uploadFile" style="display:none;" accept="'+type+'">');
    var require=element.attr('data-required')?'data-required="'+element.attr('data-required')+'"':"";
    var dataVal=element.attr('data-name') || 'file';
    var hide=$('<input type="hidden" name="'+dataVal+'" value="" '+require+'/>');
    element.after(uploadFile);
    element.after(hide);
    var imgView=$('[data-name='+dataVal+']');
    var browsers=browser();
    if(!Boolean(window.FormData) || (browsers.msie && parseInt(browsers.version)<10)){
        swfUp({
            'name':dataVal,
            'index':'file'+config.index,
            'text':element.text(),
            'address':config['address'],
            'handler':function(obj, data, response){
                fn(data);
            }
        });
    }else{
        element.click(function(){
            uploadFile.click();
        })
        uploadFile.on('change',function(){
            uploadImage($(this)[0])
        })
        function uploadImage(obj) {
            if(validateImage(obj)) {
                var data = new FormData();
                data.append('file', obj.files[0]);
                data.append('field', element.attr('data-filed'));
                hide.attr('data-sign','uploading');//图片上传标记，有此标记表示图片上传中
                ajax({
                    url:config['address'],
                    data:data,
                    contentType: false,    //不可缺
                    processData: false,    //不可缺
                    success:function(data){
                        hide.attr('data-sign','');
                        fn(data);
                    }
                })
            }
        }
    }
    function fn(){
        data=JSON.parse(data);
        data=JSON.parse(data);
        hide.val(data.id).attr('data-sign','');
        imgView.attr('src',data.url).show();
        config['callback'] && config['callback'](data);
    }
}
function swfUp(config){
    new SWFUpload({
        upload_url: config['address'],
        file_post_name:config['name'],
        use_query_string:false,
        // File Upload Settings
        file_size_limit : "2 MB",   // 文件大小控制
        file_types : "*.jpg;*.gif;*.png;*.jpeg;*.bmp",
        file_types_description : "仅支持jpg,png,gif格式文件",
        file_upload_limit : "0",////0代表不受上传个数的限制
        file_queue_limit:1,//队列1，每次只能上传1个
//            file_queue_error_handler: fileQueueError,
        file_queue_error_handler : function(){
            alert('只能上传一张图');
        },
        file_dialog_complete_handler:function(){//选择好文件后提交
            this.startUpload();//开始上传文件
        },
        file_queued_handler : fileQueued,
        upload_progress_handler : uploadProgress,//处理上传进度
        upload_error_handler : uploadError,//错误处理事件
        upload_success_handler : config['handler'], //上传成功够,所处理的时间
        //upload_complete_handler : uploadComplete,//上传结束后,处理的事件
        //button_image_url: "images/upload.png",//设置图片
        button_placeholder_id : config['index'],
        button_width: 72,
        button_height: 20,
        button_text : '<span class="button">'+config['text']+'</span>',
        button_text_style : '.button {} .buttonSmall { font-size: 10pt; }',
        button_text_top_padding: 0,
        button_text_left_padding: 18,
        button_window_mode: SWFUpload.WINDOW_MODE.TRANSPARENT,
        button_cursor: SWFUpload.CURSOR.HAND,

        // Flash Settings
        flash_url : "swfupload/swfupload.swf",

        // Debug Settings
        debug: false  //是否显示调试窗口
    });
}