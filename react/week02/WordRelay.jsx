// 쪼갠 파일에서 필요로 하는 패키지나 라이브러리를 가져옴
const React = require('react');
const { Component } = React;

class WordRelay extends Component {
	state = {
		text: 'Hello, webpack',
	};
	render() {
		return <h1>{this.state.text}</h1>;
	}
}

// 쪼갠 파일에서 쓰는 component를 바깥에서도 사용할 수 있게 해 줌
module.exports = WordRelay;