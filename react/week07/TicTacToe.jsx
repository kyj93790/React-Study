import React, { useState, useReducer, useCallback } from 'react';
import Table from './Table';

const initialState = {
    winner : '',
    turn: 'o',
    tableData: [['', '', ''], ['', '', ''], ['', '', '']],
};

const SET_WINNER = 'SET_WINNER'

const reducer = (state, action) => {
    switch (action.type) {
        // state.winner = action.winner; 이렇게 하면 안됨.
        // 항상 새로운 객체를 만들어서 바뀐 값만 바꿔줘야 함.
        case SET_WINNER:
            return {
                ...state,
                winner: action.winner,
            };
        
    }
};

const TicTacToe = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    // const [winner, setWinner] = useState('');
    // const [turn, setTurn] = useState('o');
    // const [tableDate, setTableDate] = useState([['', '', '',], ['', '', ''], ['', '', '']]);
    
    // component에 넣는 이벤트(함수)들은 모두 useCallback
    const onClickTable = useCallback(() => {
        dispatch({ type: SET_WINNER, winner: 'O' })
    }, []);
    // dispatch 안에 action 객체를 만들어 넣음.
    // dispatch -> 내부 action을 실행함.
    // action을 해석해서 state를 바꿔주는 역할을 하는 것이 reducer
    // action을 dispatch할 때마다 reducer가 실행됨.

    return (
        <>
            <Table onClick={onClickTable} tableData={state.tableData}/>
            {state.winner && <div>{state.winner}님의 승리</div>}
        </>
    )
};

export default TicTacToe;