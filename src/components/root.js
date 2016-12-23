import React, { Component } from 'react';

class Root extends Component {

	render() {
		return (
			<div>
				{ this.props.children }
			</div>
		);
	}

}

export default Root;
