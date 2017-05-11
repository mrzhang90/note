<%@ page language="java" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<base href="<%=basePath%>">
		<title>SWFUpload Demos</title>
		<link href="/ceshi/css/default.css" rel="stylesheet" type="text/css" />
		<link rel="stylesheet" href="/ceshi/css/button.css" type="text/css" />
		<script type="text/javascript" src="/ceshi/js/swfupload/swfupload.js"></script>
		<script type="text/javascript" src="/ceshi/js/swfupload/swfupload.queue.js"></script>
		<script type="text/javascript" src="/ceshi/js/swfupload/handlers.js"></script>
		<script type="text/javascript">
			var swfu;
			window.onload = function () {
				swfu = new SWFUpload({
					upload_url: "/img/userphoto/uploadImg.do",
		            file_post_name:"uploadFile",
		            use_query_string:false,
		            // File Upload Settings
		            file_size_limit : "2 MB",   // 文件大小控制
		            file_types : "*.jpg;*.gif;*.png;*.jpeg;*.bmp",
		            file_types_description : "仅支持jpg,png,gif格式文件",
		            file_upload_limit : "1",
		                            
		            file_queue_error_handler : function(){
		                console.log(arguments)
		            },
		            file_dialog_complete_handler:function(){//选择好文件后提交
		                this.startUpload(); 
		            },
		            file_queued_handler : fileQueued,
		            upload_progress_handler : uploadProgress,
		            upload_error_handler : uploadError,
		            upload_success_handler : function(obj, data, response){
		                data=JSON.parse(data);
		                data=JSON.parse(data);
		                imgUrl=data.url;
		                successFn(data);
		            },
		            upload_complete_handler : uploadComplete,
		            button_placeholder_id : "spanButtonPlaceholder",
		            button_width: 72,
		            button_height: 20,
		            button_text : '<span class="button">上传图片</span>',
		            button_text_style : '.button {} .buttonSmall { font-size: 10pt; }',
		            button_text_top_padding: 0,
		            button_text_left_padding: 18,
		            button_window_mode: SWFUpload.WINDOW_MODE.TRANSPARENT,
		            button_cursor: SWFUpload.CURSOR.HAND,
					
					// Flash Settings
					flash_url : "/ceshi/js/swfupload/swfupload.swf",
	
					custom_settings : {
						upload_target : "divFileProgressContainer"
					},
					// Debug Settings
					debug: false  //是否显示调试窗口
				});
			};
			function startUploadFile(){
				swfu.startUpload();
			}
			
		</script>
	</head>
	<body style="background-color: #C0D1E3; padding: 2px;">
		<div id="content">
			<form>
				<div
					style="display: inline; border: solid 1px #7FAAFF; background-color: #C5D9FF; padding: 2px;">
					<span id="spanButtonPlaceholder"></span>
					<input id="btnUpload" type="button" value="上  传"
						onclick="startUploadFile();" class="btn3_mouseout" 
						/>
					<input id="btnCancel" type="button" value="取消所有上传"
						onclick="cancelUpload();" disabled="disabled" class="btn3_mouseout" 
						/>
				</div>
			</form>
			<div id="divFileProgressContainer"></div>
			<div id="thumbnails">
				<table id="infoTable" border="0" width="530" style="display: inline; border: solid 1px #7FAAFF; background-color: #C5D9FF; padding: 2px;margin-top:8px;">
				</table>
			</div>
		</div>	
	</body>
</html>