import React, { Component } from "react";
import axios from "axios";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Post extends Component {
  state = {
    warehouseName: "",
    address: ""
  };

  onTitleChange = e => {
    this.setState({
        warehouseName: e.target.value
    });
  };

  onBodyChange = e => {
    this.setState({
        address: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const data = {
        warehouseName: this.state.warehouseName,
        address: this.state.address
    };
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + cookies.get('cool-jwt');
    axios
      .post("http://localhost:54889/api/warehouse", data, {
        headers: {
        "Access-Control-Allow-Origin" : "*"
      }
    })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="post">
        <form className="post" onSubmit={this.handleSubmit}>
          <input
            placeholder="warehouseName" value={this.state.warehouseName}
            onChange={this.onTitleChange} required
          />
          <textarea
            placeholder="address" value={this.state.address}
            onChange={this.onBodyChange} required
          />
          <button type="submit">Create Post</button>
        </form>
      </div>
    );
  }
}

export default Post;