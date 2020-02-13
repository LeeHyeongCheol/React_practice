import React, {Component} from 'react';
// import logo from './logo.svg';
import './App.css';
import TOC from "./components/TOC"
import Content from "./components/Content"
import Subject from "./components/Subject"
// import { waitForElementToBeRemoved } from '@testing-library/react';

//리액트야 Subject라는 이름의 태그를 나는 만들꺼야.
// class Subject extends Component { //사용자 정의 태그
// //이 태그의 내용은 아래와 같아.
//   render(){
//     return (
//       <header>
//         <h1><a href="/" onClick={function(ev){
//           ev.preventDefault();
//           this.props.onClick();
//         }.bind(this)}>{this.props.title}</a></h1>
//           {this.props.sub}
//         </header>
//     );
//   } 
// }

// class TOC extends Component {
//   render(){
//     var i = 0;
//     var list = [];
//     while(i<this.props.data.length){
//       var data = this.props.data[i];
//     list.push(
//     <li key={data.id}>
//       <a href={data.id+'.html'} onClick={function(id,ev){
//         ev.preventDefault();
//         this.props.onSelect(id);
//       }.bind(this, data.id)}>
//         {data.title}
//         </a>
//         </li>
//       );
//       i = i + 1;
//     }
//     // var list = [
//     //   <li><a href="1.html">html</a></li>,
//     //   <li><a href="2.html">css</a></li>,
//     //   <li><a href="3.html">javascript</a></li>
//     // ];
//     return (
//       <nav>
//         <ol>
//           {list}
//         </ol>
//         </nav>
//     );
//   }
// }



// class Content extends Component {
//   render() {
//     return (
//       <article>
//         <h2>{this.props.data.title}</h2>
//         {this.props.data.desc}
//         </article>
//     );
//   }
// }

class ContentCreate extends Component {
  state = {
    title:'',
    desc:''
  }
  changeFormHandler(ev){
    this.setState({[ev.target.name]:ev.target.value});
  }
    render(){
      return (
        <article>
          <form onSubmit={function(ev){
            ev.preventDefault();
            this.props.onSubmit(this.state);
          }.bind(this)}>
            <p><input type="text" placeholder="title" name="title" value={this.state.title} onChange={this.changeFormHandler.bind(this)}></input></p>
            <p><textarea placeholder="description" name="desc" value={this.state.desc} onChange={this.changeFormHandler.bind(this)}></textarea></p>
            <p><input type="submit"></input></p>
          </form>
        </article>
      );
    }
}
class ContentUpdate extends Component {
  constructor(props){
    super(props);
    this.state = {
      id:this.props.data.id,
      title:this.props.data.title,
      desc:this.props.data.desc
    }
    this.changeFormHandler = this.changeFormHandler.bind(this);
  }
  changeFormHandler(ev){
    this.setState({[ev.target.name]:ev.target.value});
  }
    render(){
      return (
        <article>
          <form onSubmit={function(ev){
            ev.preventDefault();
            this.props.onSubmit(
              this.state.id,
              this.state.title,
              this.state.desc
              );
          }.bind(this)}>
            <input type="hidden" name="id" value={this.state.id}></input>
            <p><input type="text" placeholder="title" name="title" value={this.state.title} onChange={this.changeFormHandler}></input></p>
            <p><textarea placeholder="description" name="desc" value={this.state.desc} onChange={this.changeFormHandler}></textarea></p>
            <p><input type="submit"></input></p>
          </form>
        </article>
      );
    }

}
class App extends Component {
  last_content_id= 3;
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
      return <Content data={this.getSelectedContent()} ></Content>
    } else if(this.state.mode === 'welcome'){
    return <Content data={{
      title:'Welcome',
      desc:'Hello, React'
    }}></Content>
  }else if(this.state.mode === 'create'){
    return <ContentCreate onSubmit={function(formData){
      console.log(formData);
      this.last_content_id = this.last_content_id + 1;
      formData.id = this.last_content_id;
      var newContents = Object.assign([], this.state.contents);
      newContents.push(formData);
      this.setState({
        contents:newContents,
        selected_content_id:this.last_content_id,
        mode:'read'
      });
    }.bind(this)}></ContentCreate>
  }else if(this.state.mode === 'update'){
    return <ContentUpdate data={this.getSelectedContent()} onSubmit={function(_id,_title,_desc){
      var _contents = Array.from(this.state.contents);
      var i = 0;
      while(i < _contents.length){
        if(_contents[i].id === _id){
          _contents[i] = {id:_id,title:_title,desc:_desc};
          break;
        }
        i = i+1;
      }
      this.setState({
        contents:_contents,
        mode:'read'
      });
    }.bind(this)}></ContentUpdate>
    }
  }
  getControlComponent(){
    return [
        <a key="1" type="button" href="/create" onClick={function(ev){
          ev.preventDefault();
          this.setState({mode:'create'})
        }.bind(this)}>create</a>,
        <a key="2" type="button" href="/update" onClick={function(ev){
          ev.preventDefault(ev);
          this.setState({mode:'update'})
        }.bind(this)}>update</a>,
        <input key="3" type="button" href="/delete" onClick={function(){
          var newContents = this.state.contents.filter(function(el){
            if(el.id !== this.state.selected_content_id){
              return el;
            }
          }.bind(this));
          this.setState({
            contents:newContents,
            mode:'welcome'
          });
        }.bind(this)} value='delete'></input>,
      ];
  }
  render() {
    return (
      <div className="App">
        <Subject onClick={function(){
          this.setState({
            mode:'welcome'
          })
        }.bind(this)} title="Web" sub="Hello, React"> </Subject>
        <TOC onSelect={function(id){
          //this.state.selected_content_id 의 값을 id으로 바꿔라
          this.setState({
            selected_content_id:id,
            mode:'read'
          });
        }.bind(this)} data={this.state.contents}></TOC>
        {this.getControlComponent()}
        {this.getContentComponent()}
      </div>
    );
  }
}
export default App;
