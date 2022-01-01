import React, { PureComponent } from 'react';

class Try extends PureComponent {
    // 부모의 props를 state로 만듦.
    state = {
        result: this.props.result,
        try : this.props.try,
    };

    render() {
        return (
            <li>
                <div>{this.props.tryInfo.try}</div>
                <div>{this.props.tryInfo.result}</div>
            </li>
        );
    }
}

export default Try;