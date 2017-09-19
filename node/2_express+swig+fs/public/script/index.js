function ajaxFn(){
	ajax().then(function(data){
		console.log(data)
	})
}
function ajax(){
	return new Promise(function(resolve,reject){
		$.ajax({
			url:'/insert',
			data:{username:123},
			success:function(data){
				resolve(data)
			},
			error:function(error){
				reject(error)
			}
		});
	})
}