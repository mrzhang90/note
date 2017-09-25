1.开发者模式
	$_config['plugindeveloper'] = 1;//开发者
	路径：
		/config/config_global.php
2.插件地址
	http://localhost:8050/plugin.php?id=唯一标识符

mysql
	新增
		DB:insert('表明',$data,true);
	查找
		$sql=DB:query('select * from '.DB::table('表明'));
		while($my=DB:fetch($mysql)){

		}
		include template('niu_new:list');
		list.htm:		
			{loop $mys $k $my}
				<li>{$my['title']} - {$my['dataline']}</li>
			{loop}
	修改
		if(submitcheck('applysubmit')){//如果提交表单
			$sql=DB:update(“表明”,$data,"id=1");
		}
		
		include template('niu_new:edit');

控制积分增减
	updatemembercount($_G['uid'], array($extcredits => +5);
显示消息
	showmessage('发布成功','plugin.php?id=qypay:index',array(),array('showdialog'=>true,'locationtime'=>true));
模板引用
	include template('niu_new:list');
模板表单
	很重要的一句
	<input type="hidden" name="formhash" value="{FORMHASH}">