import React, {Component} from 'react';
// import logo from './logo.svg';
import './App.css';
import { waitForElementToBeRemoved } from '@testing-library/react';

//리액트야 Subject라는 이름의 태그를 나는 만들꺼야.
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

class TOC extends Component {
  render(){
    var i = 0;
    var list = [];
    while(i<this.props.data.length){
      var data = this.props.data[i];
    list.push(
    <li key={data.id}>
      <a href={data.id+'.html'} onClick={function(id,ev){
        ev.preventDefault();
        this.props.onSelect(id);
      }.bind(this, data.id)}>
        {data.title}
        </a>
        </li>
      );
      i = i + 1;
    }
    // var list = [
    //   <li><a href="1.html">html</a></li>,
    //   <li><a href="2.html">css</a></li>,
    //   <li><a href="3.html">javascript</a></li>
    // ];
    return (
      <nav>
        <ol>
          {list}
        </ol>
        </nav>
    );
  }
}

class Content extends Component {
  render() {
    return (
      <article>
        <h2>{this.props.data.title}</h2>
        {this.props.data.desc}
        </article>
    );
  }
}

class App extends Component {
  state = {
    mode:'read',
    selected_content_id:3,
    contents:[
      {id:1, title:'HTML',desc:"HTML is for information"},
      {id:2, title:'CSS',desc:"CSS is for information"},
      {id:3, title:'Javascript',desc:"Javascript is for information"}
    ]
  }
  getSelectedContent(){
    var i = 0;
    while(i<this.state.contents.length){
      var data = this.state.contents[i];
      if(this.state.selected_content_id === data.id){
        return data;
      }
      i = i+1;
    }
  }
  getContentComponent(){
    if(this.state.mode === 'read'){
      return <Content data={this.getSelectedContent()}></Content>
    } else if(this.state.mode === 'welcome')
    return <Content data={{
      title:'Welcome',
      desc:'Hello, React'
    }}></Content>
  }
  render() {
    return (
      <div className="App">
        <Subject onClick={function(){
          this.setState({
            mode:'welcome'
          })
        }.bind(this)} title="Web" sub="Hello, React"></Subject>
        <TOC onSelect={function(id){
          //this.state.selected_content_id 의 값을 id으로 바꿔라
          this.setState({
            selected_content_id:id
          });
        }.bind(this)} data={this.state.contents}></TOC>
        {this.getContentComponent()}
      </div>
    );
  }
}
export default App;
