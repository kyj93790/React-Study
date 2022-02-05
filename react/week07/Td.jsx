import React, { useCallback, memo } from 'react';
import { CLICK_CELL } from './TicTacToe';

const Td = memo(({ rowIndex, cellIndex, dispatch, cellData }) => {
    // 렌더링 유발하는 데이터 찾는 방법
    /*
    console.log('td rendered');

    const ref = useRef([]);
    useEffect(() => {
        console.log(rowIndex === ref.current[0], cellIndex === ref.current[1], dispatch === ref.current[2], cellData === ref.current[3]);
        console.log(cellData, ref.current[3]);
        ref.current = [rowIndex, cellIndex, dispatch, cellData];
    }, [rowIndex, cellIndex, dispatch, cellData]);
    */
    const onClickTd = useCallback(() => {
        console.log(rowIndex, cellIndex);
        if (cellData) {
            return;
        }
        dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });
    }, [cellData]); // 함수 안에서 바뀔 여지가 있는 값을 input에 넣어줌.

    return (
        // props로 넘겨주는 data는 웬만하면 useCallback으로 감싸주는게 좋음.
        <td onClick={onClickTd}> {cellData}</td>
    )
});

export default Td;