import React, { Component } from 'react';
import Try from './Try';

function getNumbers() { // 숫자 네 개를 겹치지 않고 랜덤하게 뽑는 함수
    const candidate = [1,2,3,4,5,6,7,8,9];
    const array = [];
    for (let i=0; i<4; i+=1) {
        const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
    }
    return array;
}

class Baseball extends Component {
    state = {
        result: '',
        value: '',
        answer: getNumbers(), // ex: [1, 3, 5, 7]
        tries: [], // push 쓰면 안됨. (참조가 바뀌지 않아서 react가 변화를 감지하지 못함 -> 렌더링이 진행되지 않음)
    };

    // 화살표 함수를 쓰지 않으면 this 사용 불가.
    // 화살표 함수를 쓰지 않으면 constructor를 써야 함.
    onSubmitForm = (e) => {
        e.preventDefault();
        if (this.state.value === this.state.answer.join('')) {
            this.setState({
                result: '홈런!',
                tries: [...this.state.tries, { try: this.state.value, result: '홈런!' }]
            })
            alert('게임을 다시 시작합니다!');
            this.setState({
                value: '',
                answers: getNumbers(),
                tries: [],
            });
        }
        else {
            const answerArray = this.state.value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if (this.state.tries.length >= 9) { // 10번 이상 틀렸을 때
                this.setState({
                    result : `10번 넘게 틀려서 실패 ! 답은 ${this.state.answer.join(',')}였습니다!`,
                });
                alert('게임을 다시 시작합니다!');
                this.setState({
                    value: '',
                    answers: getNumbers(),
                    tries: [],
                });
            }
            else {
                for (let i=0; i<4; i+=1) {
                    if (answerArray[i] === this.state.answer[i]) {
                        strike += 1;
                    } else if (this.state.answer.includes(answerArray[i])) {
                        ball += 1;
                    }
                }
                this.setState({
                    tries: [...this.state.tries, {try: this.state.value, result: `${strike} 스트라이크, ${ball} 볼입니다`}],
                });
            }
        }
    };

    onChangeInput = (e) => {
        console.log(this.state.answer);
        this.setState({
            value: e.target.value,
        });
    };

    render() {
        return (
            <>
                <h1>{this.state.result}</h1>
                <form onSubmit={this.onSubmitForm}>
                    <input maxLength={4} value={this.state.value} onChange={this.onChangeInput} />
                </form>
                <div>시도 : {this.state.tries.length}</div>
                <ul>
                    {this.state.tries.map((v, i) => {
                        return (
                            // props -> 부모 자식 관계가 생김
                            // Baseball 이 Try 의 부모가 됨. (부모가 자식에게 props를 물려줌)
                            <Try key={`${i + 1}차 시도: `} tryInfo={v} />
                        );
                    })}
                </ul>
            </>
        );
    }
}

// export const hello = 'hello'; // import { hello }
// 노드 모듈 시스템 -> exports.hello = 'hello' 또는 module.exports = {hello: 'hello'};

export default Baseball; // import Baseball
// 노드 모듈 시스템 -> module.exports = Baseball;