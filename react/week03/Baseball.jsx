import React, { Component } from 'react';
import Try from './Try';

function getNumbers() { // 숫자 네 개를 겹치지 않고 랜덤하게 뽑는 함수

}

class Baseball extends Component {
    state = {
        result: '',
        value: '',
        answer: getNumbers(),
        tries: [],
    };

    // 화살표 함수를 쓰지 않으면 this 사용 불가.
    // 화살표 함수를 쓰지 않으면 constructor를 써야 함.
    onSubmitForm = (e) => {
        e.preventDefault();
        
    };

    onChangeInput = (e) => {

    };

    fruits = [
        { fruit: '사과', taste: '맛있다'},
        { fruit: '감', taste: '시다'},
        { fruit: '귤', taste: '달다'},
        { fruit: '밤', taste: '떫다'},
        { fruit: '배', taste: '맛있다'},
        { fruit: '무', taste: '맛있다'},
        { fruit: '사과', taste: '맛없다'},
    ];

    render() {
        return (
            <>
                <h1>{this.state.result}</h1>
                <form onSubmit={this.onSubmitForm}>
                    <input maxLength={4} value={this.state.value} onChange={this.onChangeInput} />
                </form>
                <div>시도 : {this.state.tries.length}</div>
                <ul>
                    {this.fruits.map((v, i) => {
                        return (
                            // props -> 부모 자식 관계가 생김
                            // Baseball 이 Try 의 부모가 됨. (부모가 자식에게 props를 물려줌)
                            <Try key={v.fruit + v.taste} value={v} index={i} />
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