import React, { useState, useRef, useEffect } from 'react';

// 클래스의 경우 -> constructor(state이나 메소드들) -> render -> ref 설정 -> componentDidMount
// (setState/props 바뀔 때) -> shouldComponentUpdate(true) -> render -> componentDidUpdate
// 부모가 나를 없앴을 때 -> componentWillUnmount -> 소멸

const rspCoords = {
    바위: '0',
    가위: '-142px',
    보: '-284px',
};

const scores = {
    가위: 1,
    바위: 0,
    보: -1,
};

const computerChoice = (imgCoord) => {
    return Object.entries(rspCoords).find(function(v) {
        return v[1] === imgCoord;
    })[0];
};

//                          result    imgCoord    score
// componentDidMount
// componentDidUpdate
// componentWillUnmount

/*  class형 -> 위의 table에서 가로로 영향
    componentDidMount, componentDidUpdate, componentWillUnmount가 각각 result, imgCoord, score를 모두 조작할 수 있음 */

/*  함수형 -> 위의 table에서 세로로 영향
    useEffect 하나가 result 하나를 담당하고, useEffect 하나가 score 하나를 담당하는 것과 같은 방식
    useEffect 하나가 동시에 여러 개를 담당할 수 있지만 대략적인 활용 방식은 위와 같음 */

const RSP_hooks = () => {
    const [result, setResult] = useState('');
    const [imgCoord, setImgCoord] = useState(rspCoords.바위);
    const [score, setScore] = useState(0);
    const interval = useRef();

    // 함수 component의 경우 렌더링 될 때마다 통째로 다시 실행됨. -> useEffect도 렌더링마다 실행됨.
    // 두 번째 인수 배열에 넣은 값(현재 코드에서는 imgCoord)들이 바뀔 때 useEffect가 실행. -> 빈 배열을 넣으면 한 번만 실행되고 더 이상 실행 x (어떤 것이 바뀌든 상관하지 않음)
    useEffect(() => { // componentDidMount, componentDidUpdate 역할 (1대1 대응은 아님)
        interval.current = setInterval(changeHand, 100);
        return () => { // componentWillUnMount 역할
            clearInterval(interval.current);
        }
    }, [imgCoord]);
    
    /* state 별로 별도의 처리를 하고 싶은 경우 useEffect 함수를 여러 개 만들 수 있음.
    useEffect(() => {

    }, [score]);
    */

    const changeHand = () => {
        if (imgCoord === rspCoords.바위) {
            setImgCoord(rspCoords.가위);
        } else if (imgCoord === rspCoords.가위) {
            setImgCoord(rspCoords.보);
        } else if (imgCoord === rspCoords.보) {
            setImgCoord(rspCoords.바위);
        }
    }

    const onClickBtn = (choice) => () => {
        clearInterval(interval.current); //시각적으로 이긴 사람을 보게 할 수 있도록 멈춤
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;
        if (diff == 0) {
            setResult('비겼습니다!');
        } else if ([-1, 2].includes(diff)) {
            setResult('이겼습니다!');
            setScore((prevScore) => prevScore + 1);
        } else {
            setResult('졌습니다!');
            setScore((prevScore) => prevScore - 1);
        }
        setTimeout(() => {
            interval.current = setInterval(changeHand, 100);  
        }, 1000);
    }

    return (
        <>
            <div id="computer" style={{ background: `url(http://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
            <div>
                <button id="rock" className="btn" onClick={onClickBtn('바위')}>바위</button>
                <button id="scissor" className="btn" onClick={onClickBtn('가위')}>가위</button>
                <button id="paper" className="btn" onClick={onClickBtn('보')}>보</button>
            </div>
            <div>{result}</div>
            <div>현재 {score}점</div>
        </>
    );
}

export default RSP_hooks;