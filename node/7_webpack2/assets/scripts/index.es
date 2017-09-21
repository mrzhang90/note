require('../styles/index.less');
import {data} from './data.es';
import('./async.es').then(function(res){
	res.defaule();
})
console.log(data);