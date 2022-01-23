import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import Ball_hooks from './Ball_hooks';

// state 안쓰는 것들은 분리를 해두면 hooks 변환 시 처리해주지 않아도 돼서 편리
function getWinNumbers() {
    console.log('getWinNumbers');
    const candidate = Array(45).fill().map((v, i) => i+1);
    const shuffle = [];
    while (candidate.length > 0) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length - 1];
    //console.log('bonus' + bonusNumber);
    const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
    return [...winNumbers, bonusNumber];
}

const Lotto_hooks = () => {
    // useMemo : 복잡한 함수 결과값을 기억
    // useRef  : 일반 값을 기억
    const lottoNumbers = useMemo(() => getWinNumbers(), []); // 두 번째 인자가 바뀌지 않는 한 다시 실행되지 않도록 함
    const [winNumbers, setWinNumbers] = useState(lottoNumbers);
    const [winBalls, setWinBalls] = useState([]);
    const [bonus, setBonus] = useState(null);
    const [redo, setRedo] = useState(false);
    const timeouts = useRef([]);

    useEffect(() => {
        console.log('useEffect');
        for (let i=0; i<winNumbers.length-1; i++){
            timeouts.current[i] = setTimeout(() => {
                setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]]);
            }, (i + 1) * 1000);
        }
        timeouts.current[6] = setTimeout(() => {
            setBonus(winNumbers[6]);
            setRedo(true);
        }, 7000);
        return () => {
            timeouts.current.forEach((v) => {
                clearTimeout(v);
            });
        };
    }, [timeouts.current]); // 빈 배열이면 componentDidMount와 동일
    // 배열에 요소가 있으면 componentDidMount랑 componentDidUpdate 둘 다 수행

    const onClickRedo = useCallback(() => {
        console.log('onClickRedo');
        console.log(winNumbers);
        setWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);
        timeouts.current = [];
    }, [winNumbers]);
    // useCallback 안에서 state를 쓸 때에는 항상 input에도 넣어야 함.
    // [] 안의 것이 바뀌면 새로 실행해서 기억하도록 함.
    // 만약 자식 컴포넌트에 함수를 props로 넘기는 경우에는 반드시 useCallback 사용 -> 계속해서 동일한 함수가 재생성되지 않도록 함

    return (
        <>
            <div>당첨 숫자</div>
            <div id="결과창">
                {winBalls.map((v) => <Ball_hooks key={v} number={v} />)}
            </div>
            {bonus && <div>보너스!</div>}
            {bonus && <Ball_hooks number={bonus} />}
            {redo && <button onClick={onClickRedo}>한 번 더!</button>}
        </>
    );
};

export default Lotto_hooks;