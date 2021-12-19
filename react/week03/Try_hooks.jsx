import React from 'react';

// const Try = (props) => {}
// props 자리에 구조 분해하여 넣을 수 있음.
const Try_hooks = ({ tryInfo }) => {
    return (
        <li>
            <div>{tryInfo.try}</div>
            <div>{tryInfo.result}</div>
        </li>
    );
};

export default Try_hooks;