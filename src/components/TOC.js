import React, {Component} from 'react';

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
export default TOC;