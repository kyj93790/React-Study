import React, { PureComponent } from 'react';

class Average extends PureComponent {
    render() {
        return (
            this.props.avgInfo.length === 0
            ? null : <>
                <div>평균 시간: {this.props.avgInfo.reduce((a,c) => a + c) / this.props.avgInfo.length}ms</div>
            </>
        );
    }
}

export default Average;