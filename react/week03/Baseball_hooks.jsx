import React, { useState } from 'react';
import Try_hooks from './Try_hooks';

function testForRendering() { // 숫자 네 개를 겹치지 않고 랜덤하게 뽑는 함수
    const candidate = [1,2,3,4,5,6,7,8,9];
    const array = [];
    for (let i=0; i<4; i+=1) {
        const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
    }
    console.log("testForRendering");
    return array;
}

// this를 안쓰므로 밖으로 뺄 수 있음
// 밖으로 빼놓으면 class와 독립적으로 존재 -> hooks로 바꿀 때 영향이 없음.
function getNumbers() { // 숫자 네 개를 겹치지 않고 랜덤하게 뽑는 함수
    const candidate = [1,2,3,4,5,6,7,8,9];
    const array = [];
    for (let i=0; i<4; i+=1) {
        const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
    }
    console.log("array generation");
    console.log(array);
    return array;
}

const Baseball_hooks = () => {
    const [result, setResult] = useState('');
    const [value, setValue] = useState('');
    const [answer, setAnswer] = useState(getNumbers());
    const [tries, setTries] = useState([]);

    // 화살표 함수를 쓰지 않으면 this 사용 불가.
    // 화살표 함수를 쓰지 않으면 constructor를 써야 함.
    const onSubmitForm = (e) => {
        e.preventDefault();
        console.log("answer");
        console.log(answer);
        if (value === answer.join('')) {
            // 옛날 state로 현재 state를 만들 때에는 함수형 setState를 사용
            setResult('홈런!');
            setTries((prevTries) => {
                return [...prevTries, { try: value, result: '홈런!' }]
            });
            alert('게임을 다시 시작합니다!');
            setValue('');
            setAnswer(getNumbers());
            setTries([]);
        }
        else {
            const answerArray = value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if (tries.length >= 9) { // 10번 이상 틀렸을 때   
                setResult(`10번 넘게 틀려서 실패 ! 답은 ${answer.join('')}였습니다!`);
                alert('게임을 다시 시작합니다!');
                setValue('');
                setAnswer(getNumbers());
                setTries([]);
            }
            else {
                for (let i=0; i<4; i+=1) {
                    if (answerArray[i] === answer[i]) {
                        strike += 1;
                    } else if (answer.includes(answerArray[i])) {
                        ball += 1;
                    }
                }
                setTries((prevTries) => {
                    return [...prevTries, {try: value, result: `${strike} 스트라이크, ${ball} 볼입니다`}]
                });
                setValue('');
            }
        }
    };

    const onChangeInput = (e) => {
        console.log("answer in onChangeInput")
        console.log(answer);
        setValue(e.target.value);
        console.log("check timing");
    };

    return (
        <>
            <h1>{result}</h1>
            <form onSubmit={onSubmitForm}>
                <input maxLength={4} value={value} onChange={onChangeInput} />
            </form>
            <div>시도 : {tries.length}</div>
            <ul>
                {tries.map((v, i) => {
                    return (
                        // props -> 부모 자식 관계가 생김
                        // Baseball 이 Try 의 부모가 됨. (부모가 자식에게 props를 물려줌)
                        <Try_hooks key={`${i + 1}차 시도: `} tryInfo={v} />
                    );
                })}
            </ul>
        </>
    );
};

export default Baseball_hooks;