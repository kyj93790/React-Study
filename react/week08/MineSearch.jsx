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
    halted: true,
    dispatch: () => {},
});

const initialState = {
    TableData: [],
    timer: 0,
    result: '',
    halted: true,
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
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_CELL';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';

const reducer = (state, action) => {
    switch (action.type) {
        case START_GAME:
            return {
                ...state,
                tableData: plantMine(action.row, action.cell, action.mine),
                halted: false,
            };
        case OPEN_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            let around = [];
            if (tableData[action.row - 1]) {
                around = around.concat(
                    tableData[action.row-1][action.cell-1],
                    tableData[action.row-1][action.cell],
                    tableData[action.row-1][action.cell+1],
                );
            }
            console.log(around);
            around = around.concat(
                tableData[action.row][action.cell-1],
                tableData[action.row][action.cell+1],
            );
            console.log(around);
            if (tableData[action.row + 1]) {
                around = around.concat(
                    tableData[action.row+1][action.cell-1],
                    tableData[action.row+1][action.cell],
                    tableData[action.row+1][action.cell+1],
                );
            }
            console.log(around);
            const count = around.filter((v) => [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)).length;
            tableData[action.row][action.cell] = count;
            return {
                ... state,
                tableData,
            };
        }
        case CLICK_MINE: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            tableData[action.row][action.cell] = CODE.CLICKED_MINE;
            return {
                ...state,
                tableData,
                halted: true,
            };
        }
        case FLAG_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if (tableData[action.row][action.cell] === CODE.MINE) {
                tableData[action.row][action.cell] = CODE.FLAG_MINE;
            } else {
                tableData[action.row][action.cell] = CODE.FLAG;
            }
            return {
                ...state,
                tableData,
            };
        }
        case QUESTION_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if (tableData[action.row][action.cell] === CODE.FLAG_MINE) {
                tableData[action.row][action.cell] = CODE.QUESTION_MINE;
            } else {
                tableData[action.row][action.cell] = CODE.QUESTION;
            }
            return {
                ...state,
                tableData,
            };
        }
        case NORMALIZE_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if (tableData[action.row][action.cell] === CODE.QUESTION_MINE) {
                tableData[action.row][action.cell] = CODE.MINE;
            } else {
                tableData[action.row][action.cell] = CODE.NORMAL;
            }
            return {
                ...state,
                tableData,
            };
        }
        default:
            return state;
    }
};

const MineSearch = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { tableData, halted, timer, result } = state;
    // useMemo를 통해 캐싱 진행 -> context API 최적화
    const value = useMemo(() => ({ tableData: tableData, halted: halted, dispatch }), [tableData, halted]);
    
    return (
        // "context API에서 접근할 수 있는 데이터"에 접근하고 싶어하는 컴포넌트를 context API의 Provider로 묶어줘야 함.
        // 데이터는 value에 넣음. (자식 컴포넌트들에 바로 전해줄 데이터)
        <TableContext.Provider value={value}>
            <Form />
            <div>{timer}</div>
            <Table />
            <div>{result}</div>
        </TableContext.Provider>
    );
};

export default MineSearch;