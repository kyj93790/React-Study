// 쪼갠 파일에서 필요로 하는 패키지나 라이브러리를 가져옴
const React = require('react');
// 아래에서 extends React.Component를 Component로 쓸 수 있게 해줌
const { useState, useRef } = React;

const WordRelay = () => {
	const [word, setWord] = useState('기차');
	const [value, setValue] = useState('');
	const [result, setResult] = useState('');
	const inputRef = useRef(null);

	const onSubmitForm = (e) => {
		e.preventDefault();
		if (word[word.length - 1] === value[0]){
			setResult('딩동대앵');
			setWord(value);
			setValue('');
			inputRef.current.focus();
		}
		else {
			setResult('땡');
			setValue('');
			inputRef.current.focus();
		}
	};

	const onChangeInput = (e) => {
		setValue(e.target.value);
	};

	return (
		<>
			<div>{word}</div>
			<form onSubmit={onSubmitForm}>
				<input ref={inputRef} value={value} onChange={onChangeInput} />
				<button>입력!</button>
			</form>
			<div>{result}</div>
		</>
	);
}

// 쪼갠 파일에서 쓰는 component를 바깥에서도 사용할 수 있게 해 줌
module.exports = WordRelay;