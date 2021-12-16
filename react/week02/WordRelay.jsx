// 쪼갠 파일에서 필요로 하는 패키지나 라이브러리를 가져옴
const React = require('react');
// 아래에서 extends React.Component를 Component로 쓸 수 있게 해줌
const { Component } = React;

class WordRelay extends Component {
	state = {
		word: '기차',
		value: '',
		result: '',
	};

	// 직접 만드는 함수는 화살표 함수로 구현해야 함
	onSubmitForm = (e) => {
		e.preventDefault();
		if (this.state.word[this.state.word.length - 1] === this.state.value[0]){
			this.setState({
				result: '딩동댕',
				word: this.state.value,
				value: '',
			})
			this.input.focus();
		}
		else {
			this.setState({
				result: '땡',
				value: '',
			})
			this.input.focus();
		}
	};

	onChangeInput = (e) => {
		this.setState({value: e.target.value});
	};

	input;
	onRefInput = (c) => {
		this.input = c;
	};

	render() {
		return (
			<>
				<div>{this.state.word}</div>
				<form onSubmit={this.onSubmitForm}>
					<input ref={this.onRefInput} value={this.state.value} onChange={this.onChangeInput} />
					<button>입력!</button>
				</form>
				<div>{this.state.result}</div>
			</>
		);
	}
}

// 쪼갠 파일에서 쓰는 component를 바깥에서도 사용할 수 있게 해 줌
module.exports = WordRelay;