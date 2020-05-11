import React, { Component } from "react";
import axios from "axios";

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
    axios
      .post("http://apiyoba.pp.ua/api/warehouse", data)
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