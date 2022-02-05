import React, { useEffect, useReducer, useCallback } from 'react';
import Table from './Table';

// state를 하나로 모아두고 action을 통해서만 바꿈
const initialState = {
    winner : '',
    turn: 'O',
    tableData: [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ],
    recentCell: [-1, -1],
    draw: false,
};

export const SET_WINNER = 'SET_WINNER';
export const SET_DRAW = 'SET_DRAW';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';

const reducer = (state, action) => {
    switch (action.type) {
        // state.winner = action.winner; 이렇게 하면 안됨.
        // 항상 새로운 객체를 만들어서 바뀐 값만 바꿔줘야 함.
        case SET_WINNER: {
            return {
                ...state,
                winner: action.winner,
            };
        }
        case SET_DRAW: {
            return {
                ...state,
                draw: true,
            }
        }
        case CLICK_CELL: {
            const tableData = [...state.tableData]; // 기존 tableData에 대한 얕은 복사
            tableData[action.row] = [...tableData[action.row]]; // immer라는 라이브러리로 가독성 해결
            tableData[action.row][action.cell] = state.turn;
            return {
                ...state,
                tableData,
                recentCell: [action.row, action.cell],
            };
        }
        case CHANGE_TURN: {
            return {
                ...state,
                turn: state.turn === 'O' ? 'X' : 'O',
            };
        }
        case RESET_GAME: {
            return {
                ...state,
                winner : '',
                turn: 'O',
                tableData: [
                    ['', '', ''],
                    ['', '', ''],
                    ['', '', ''],
                ],
                recentCell: [-1, -1],
                draw: false,
            };
        }
        default:
            return state;
    }
};

const TicTacToe = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { tableData, turn, winner, draw, recentCell } = state;
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

    // state - 비동기
    // 비동기인 state에서 처리를 하려면 useEffect를 써야함.
    useEffect(() => {
        const [row, cell] = recentCell;
        if (row < 0) { // 처음 컴포넌트가 렌더링될 때는 로직(승자 체크)이 진행되지 않도록 함.
            return;
        }
        let win = false;
        if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {
            win = true;
        }
        if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) {
            win = true;
        }
        if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
            win = true;
        }
        if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
            win = true;
        }
        console.log(win);
        if (win) {  // 승리 시
            dispatch({ type: SET_WINNER, winner: turn });
        } else {
            // 무승부 검사 - table이 전부 차 있는지 check
            let all = true;
            tableData.forEach((row) => {
                row.forEach((cell) => {
                    if (!cell) {
                        all = false;
                    }
                });
            });
            if (all) { // 무승부인 경우
                dispatch({ type: SET_DRAW });
            } else {
                dispatch({ type: CHANGE_TURN });
            }
        }
    }, [recentCell]);

    const onClickReset = () => {
        alert('게임을 리셋합니다 !');
        dispatch({ type: RESET_GAME });
    }

    return (
        <>
            <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch}/>
            {winner && <div>{winner}님의 승리</div>}
            {draw && <div>무승부입니다 :)</div>}
            {(draw || winner) && <button onClick={onClickReset}>리셋</button>}
        </>
    )
};

export default TicTacToe;