import React, { memo } from 'react';

// const Try = (props) => {}
// props 자리에 구조 분해하여 넣을 수 있음.
const Try_hooks = memo(({ tryInfo }) => {
    // tryInfo.try = 'hello'; <- 이렇게 자식에서 props를 직접 바꾸면 안됨.
    // props는 부모가 바꿔야 함.

    // 부모로 부터 받은 props의 값을 바꿔야 하는 경우가 생기면 state를 만들고 그 state를 바꿈.
    // -> 그래야 부모에 영향이 미치지 않음.
    const [result, setResult] = useState(tryInfo.result);

    const onClick = () => {
        setResult('1');
    };

    return (
        <li>
            <div>{tryInfo.try}</div>
            <div onClick={onClick}>{result}</div>
        </li>
    );
});

export default Try_hooks;