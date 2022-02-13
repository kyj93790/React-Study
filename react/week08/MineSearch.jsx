import React, { useReducer, createContext, useMemo } from 'react';
import Table from './Table';
import Form from './Form';

export const CODE = {
    MINE: -7,
    NORMAL: -1,
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    CLICKED_MINE: -6,
    OPENED: 0,  // 0 이상이면 다 opened
};

export const TableContext = createContext({
    // 기본값이 들어옴.
    tableData: [],
    dispatch: () => {},
});

const initialState = {
    TableData: [],
    timer: 0,
    result: '',
};

const plantMine = (row, cell, mine) => {
    console.log(row, cell, mine);
    const candidate = Array(row * cell).fill().map((arr, i) => {
        return i;
    });
    const shuffle = [];
    while (candidate.length > row * cell - mine) {
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
        shuffle.push(chosen);
    }
    const data = [];
    for (let i=0; i<row; i++) {
        const rowData = [];
        data.push(rowData);
        for (let j=0; j<cell; j++) {
            rowData.push(CODE.NORMAL);
        }
    }

    for (let k=0; k<shuffle.length; k++) {
        const ver = Math.floor(shuffle[k] / cell);
        const hor = shuffle[k] % cell;
        data[ver][hor] = CODE.MINE;
    }

    console.log(data);
    return data;
};

export const START_GAME = 'START_GAME';

const reducer = (state, action) => {
    switch (action.type) {
        case START_GAME:
            return {
                ...state,
                tableData: plantMine(action.row, action.cell, action.mine),
            };
        default:
            return state;
    }
};

const MineSearch = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // useMemo를 통해 캐싱 진행 -> context API 최적화
    const value = useMemo(() => ({ tableData: state.tableData, dispatch }), [state.tableData]);
    
    return (
        // "context API에서 접근할 수 있는 데이터"에 접근하고 싶어하는 컴포넌트를 context API의 Provider로 묶어줘야 함.
        // 데이터는 value에 넣음. (자식 컴포넌트들에 바로 전해줄 데이터)
        <TableContext.Provider value={value}>
            <Form />
            <div>{state.timer}</div>
            <Table />
            <div>{state.result}</div>
        </TableContext.Provider>
    );
};

export default MineSearch;