import React, { Component } from 'react';

// 클래스의 경우 -> constructor(state이나 메소드들) -> render -> ref 설정 -> componentDidMount
// (setState/props 바뀔 때) -> shouldComponentUpdate(true) -> render -> componentDidUpdate
// 부모가 나를 없앴을 때 -> componentWillUnmount -> 소멸

const rspCoords = {
    바위: '0',
    가위: '-142px',
    보: '-284px',
};

const scores = {
    가위: 1,
    바위: 0,
    보: -1,
};

const computerChoice = (imgCoord) => {
    return Object.entries(rspCoords).find(function(v) {
        return v[1] === imgCoord;
    })[0];
};

class RSP extends Component {
    state = {
        result: '',
        imgCoord: '0',
        score: 0,
    };
    
    interval;

    // 렌더가 처음 실행되고나서 실행됨.
    // 리렌더링이 일어날 때는 실행되지 않음.
    // 렌더될 때 setState를 하고 싶을 수 있는데, render() 안에 setState를 사용하면 무한 반복 -> componentDidMount()와 같은 함수를 활용
    componentDidMount() { // 컴포넌트가 첫 렌더링된 후. 여기에 비동기 요청을 많이 함.
        this.interval = setInterval(this.changeHand, 100);
    }

    // 부모 컴포넌트에 의해 '나' 컴포넌트를 없어질 때 실행
    componentWillUnmount() { // 컴포넌트가 제거되기 직전. 비동기 요청 정리를 많이 함.
        clearInterval(this.interval);
    }

    changeHand = () => {
        const { imgCoord } = this.state; // -142px
        if (imgCoord === rspCoords.바위) {
            this.setState({
                imgCoord: rspCoords.가위,
            });
        } else if (imgCoord === rspCoords.가위) {
            this.setState({
                imgCoord: rspCoords.보,
            });
        } else if (imgCoord === rspCoords.보) {
            this.setState({
                imgCoord: rspCoords.바위,
            });
        }
    }

    // 메소드 안에 함수 호출이 있는 경우 호출하는 부분의 "() =>" 이 부분을 빼서 고차함수 패턴을 만들 수 있음
    onClickBtn = (choice) => () => {
        const { imgCoord } = this.state;
        clearInterval(this.interval); //시각적으로 이긴 사람을 보게 할 수 있도록 멈춤
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;
        if (diff == 0) {
            this.setState({
                result: '비겼습니다!',
            });
        } else if ([-1, 2].includes(diff)) {
            this.setState((prevState) => {
                return {
                    result: '이겼습니다!',
                    score: prevState.score + 1,
                };
            });
        } else {
            this.setState((prevState) => {
                return {
                    result: '졌습니다!',
                    score: prevState.score - 1,
                };
            });
        }
        setTimeout(() => {
            this.interval = setInterval(this.changeHand, 100);  
        }, 1000);
    };

    onClickReset = () => () => {
        clearInterval(this.interval);
        alert('게임을 리셋합니다!');
        this.setState(() => {
            return {
                result: '',
                imgCoord: '0',
                score: 0,
            };
        });
        setTimeout(() => {
            this.interval = setInterval(this.changeHand, 100);  
        }, 1000);
    };

    render() {
        const { result, score, imgCoord } = this.state;
        return (
            <>
                <div id="computer" style={{ background: `url(http://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
                <div>
                    <button id="rock" className="btn" onClick={this.onClickBtn('바위')}>바위</button>
                    <button id="scissor" className="btn" onClick={this.onClickBtn('가위')}>가위</button>
                    <button id="paper" className="btn" onClick={this.onClickBtn('보')}>보</button>
                </div>
                <div>{result}</div>
                <div>현재 {score}점</div>
                <button id="reset" onClick={this.onClickReset()}>리셋</button>
            </>
        );
    }
}

export default RSP;