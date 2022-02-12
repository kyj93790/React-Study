import React, { useReducer } from 'react';
import Table from './Table';

const initialState = {
    TableData: [],
    timer: 0,
    result: '',
};

const reducer = (state, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

const MineSearch = () => {
    const [state, dispath] = useReducer(reducer, initialState);

    return (
        <>
            <Form />
            <div>{state.timer}</div>
            <Table />
            <div>{state.result}</div>
        </>
    );
};

export default MineSearch;