import React, {Component} from 'react';

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
  export default Content;