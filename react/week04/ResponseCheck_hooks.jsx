import React, { useState, useRef } from 'react';

const ResponseCheck_hooks = () => {
    // useState로 state를 바꾸면 return 부분이 다시 실행됨.
    // useRef로 값을 바꿀 때는 return 부분이 다시 실행되지 않음.
    // -> 불필요한 렌더링을 막을 수 있음.
    // 값이 바뀌어도 렌더링이 필요하지 않으면(값이 바뀌어도 화면에는 영향이 필요 없는 경우) Ref에 넣어서 사용.
    const [state, setState] = useState('waiting');
    const [message, setMessage] = useState('클릭해서 시작하세요.');
    const [result, setResult] = useState([]);
    const timeout = useRef(null);
    const startTime = useRef();
    const endTime = useRef();

    const onClickScreen = () => {
        if (state === 'waiting') {
            setState('ready');
            setMessage('초록색이 되면 클릭하세요.');
            // Ref이므로 current로 접근해줘야 함.
            timeout.current = setTimeout(() => {
                setState('now');
                setMessage('지금 클릭');
                startTime.current = new Date();
            }, Math.floor(Math.random() * 1000) + 2000); // 2초~3초 랜덤 -> 예측이 불가하도록 함
        }
        else if (state === 'ready') { // 성급하게 클릭
            // 위에서 실행한 setTimeout 초기화
            clearTimeout(timeout.current);
            setState('waiting');
            setMessage('너무 성급하시군요! 초록색이 된 후에 클릭하세요.');
        }
        else if (state === 'now') { // 반응속도 체크
            endTime.current = new Date();
            setState('waiting');
            setMessage('클릭해서 시작하세요.');
            setResult((prevResult) => {
                return [...prevResult, endTime.current - startTime.current];
            });
        }
    };
    const onReset = () => {
        setResult([]);
    };
    const renderAverage = () => {
        // false, undefined, null은 jsx에서 태그없음을 의미함
        return result.length === 0
        ? null : <>
            <div>평균 시간: {result.reduce((a,c) => a + c) / result.length}ms</div>
            <button onClick={onReset}>리셋</button>
        </>
    };
    return (
        <>
            <div
                id="screen"
                className={state}
                onClick={onClickScreen}
            >
            {message}
            </div>
            {renderAverage()}
        </>
    );
};

export default ResponseCheck_hooks;