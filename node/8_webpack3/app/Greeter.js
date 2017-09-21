import React, { Component } from 'react';
import config from './config.json';
import styles from './Greeter.css';//导入
import a from './a.less';//导入

class Greeter extends Component{
	render(){
		return (
			<div className={styles.root}>
				<div className={a.root}>
					{config.greetText}
				</div>
			</div>
		)
	}
}

export default Greeter;

// var g=function(){
// 	var greet=document.createElement('div');
// 	greet.textContent =config.greetText;
// 	return greet;
// }
// module.exports=g;