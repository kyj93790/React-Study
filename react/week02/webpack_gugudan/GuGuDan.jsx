const React = require('react');
// 구조분해 문법
const { useState, useRef } = React

const GuGuDan = () => {
    // state를 하나씩 분리
    const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
    const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const inputRef = useRef(null);

    const onChangeInput = (e) => {
        setValue(e.target.value);
    };
    
    const onSubmitForm = (e) => {
        e.preventDefault();
        if (parseInt(value) === first * second) {
            // state를 set하는 작업이 1번 발생하지만 렌더링은 1번만 발생 (비동기이므로)
            setResult((prevResult) => {	// 함수형으로 작성함으로써 state가 비동기인 문제 발생을 제거
                return '정답: ' + value
            });
            setFirst(Math.ceil(Math.random() * 9));
            setSecond(Math.ceil(Math.random() * 9));
            setValue(' ');
            inputRef.current.focus();
        }
        else {
            setResult('땡');
            setValue('');
            inputRef.current.focus();
        }
    }

    return (
        <>
            <div>{first} 곱하기 {second}는?</div>
            <form onSubmit={onSubmitForm}>
                <input ref={inputRef} onChange={onChangeInput} value={value} />
                <button>입력!</button>
            </form>
            <div id="result">{result}</div>
        </>
    );
};

module.exports = GuGuDan;