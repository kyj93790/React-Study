import React, { memo } from 'react';

const Average_hooks = memo(({ avgInfo }) => {
    return (
        avgInfo.length === 0
        ? null : <>
            <div>평균 시간: {avgInfo.reduce((a,c) => a + c) / avgInfo.length}ms</div>
        </>
    );
});

export default Average_hooks;