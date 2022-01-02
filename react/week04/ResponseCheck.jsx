import React, { PureComponent } from 'react';
import Average from './Average'

class ResponseCheck extends PureComponent {
    state = {
        state: 'waiting',
        message: '클릭해서 시작하세요.',
        result : [],
    };

    timeout;
    startTime; // 렌더링이 일어나게 하고 싶지 않으므로 this.startTime으로 만듦.
    endTime;

    onClickScreen = () => {
        const { state, message, result } = this.state;
        if (state === 'waiting') {
            this.setState({
                state: 'ready',
                message: '초록색이 되면 클릭하세요.',
            });
            this.timeout = setTimeout(() => {
                this.setState({
                    state: 'now',
                    message: '지금 클릭',
                });
                this.startTime = new Date();
            }, Math.floor(Math.random() * 1000) + 2000); // 2초~3초 랜덤 -> 예측이 불가하도록 함
        }
        else if (state === 'ready') { // 성급하게 클릭
            // 위에서 실행한 setTimeout 초기화
            clearTimeout(this.timeout);
            this.setState({
                state: 'waiting',
                message: '너무 성급하시군요! 초록색이 된 후에 클릭하세요.',
            });
        }
        else if (state === 'now') { // 반응속도 체크
            this.endTime = new Date();
            this.setState((prevState) => {
                return {
                    state: 'waiting',
                    result: [...prevState.result, this.endTime - this.startTime],
                    message: '클릭해서 시작하세요.',
                };
            });
        }
    };

    onReset = () => {
        this.setState({
            result: [],
        });
    }

    render() {
        const { state, message, result } = this.state;
        return (
            <>
                <div
                    id="screen"
                    className={state}
                    onClick={this.onClickScreen}
                >
                    {message}
                </div>
                <Average avgInfo={result} />
                <button onClick={this.onReset}>리셋</button>
            </>
        );
    }
}

export default ResponseCheck;