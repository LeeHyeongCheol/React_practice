import React, {Component} from 'react';

class Subject extends Component { //사용자 정의 태그
    //이 태그의 내용은 아래와 같아.
      render(){
        return (
          <header>
            <h1><a href="/" onClick={function(ev){
              ev.preventDefault();
              this.props.onClick();
            }.bind(this)}>{this.props.title}</a></h1>
              {this.props.sub}
            </header>
        );
      } 
    }
export default Subject;