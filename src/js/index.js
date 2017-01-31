import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../scss/app.scss';

console.log('abc');

ReactDOM.render(
	<div>
		<h1>React, Redux & Webpack boilerplate</h1>
		<div className="secondary">
			Everything you need to build React Redux web application is here! <br />

			This boilerplate include <a href="https://facebook.github.io/react/" target="_blank">React</a>, <a href="http://redux.js.org/" target="_blank">Redux</a>, <a href="https://github.com/reactjs/react-redux" target="_blank">React-Redux</a>, <a href="https://webpack.js.org/" target="_blank">Webpack 2</a> & <a href="https://github.com/webpack/webpack-dev-server" target="_blank">Webpack-Dev-Server 2</a> package. <br /> <br />

			Want to see the whole package? Please go <a href="https://github.com/vanjunior/react-boilerplate/blob/master/package.json" target="_blank">here</a> <br /><br />

			Any question? Please direct message me in <a href="https://www.facebook.com/vanjunior89" target="_blank">here</a>
		</div>
		<div className="ivan">
			<a href="https://www.facebook.com/vanjunior89" target="_blank">by vanjunior</a>
		</div>
	</div>,
	document.querySelector('.root-container')
);
