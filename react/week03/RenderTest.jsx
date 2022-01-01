import React, { Component } from 'react';

class Test extends Component {
    state = {
        counter : 0,
    };

    // Component 대신 PureComonent에서 extends 하면 shouldComponentUpdate를 알아서 해줌.
    // -> shouldComponentUpdate가 없어도 렌더링 방지가 됨.
    shouldComponentUpdate(nextProps, nextState, nextConetext) {
        if (this.state.counter !== nextState.counter) {
            return true;
        }
        return false;
    }

    onClick = () => {
        // state를 바꾸지 않았음. -> 그래도 렌더링이 됨.
        this.setState({});
    };

    render() {
        console.log('렌더링', this.state);
        return (<div>
            <button onClick={this.onClick}>클릭</button>
        </div>
        );
    }
}

export default Test;