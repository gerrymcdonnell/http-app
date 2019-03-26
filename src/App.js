import React, { Component } from "react";
import axios from 'axios';

/**npm i axios@0.18 */
import "./App.css";

const apiEndpoint = 'https://jsonplaceholder.typicode.com/posts';

class App extends Component {
  state = {
    posts: []
  };

  //shortcut 'comp did mount' cdm
  /**returns a promise which returns the result of async operation
   * the data propery contaisn the data from server
   */
  async componentDidMount() {

    //const response=await axios.get('https://jsonplaceholder.typicode.com/posts');

    //object destructing: get the data property and rename it as posts
    const { data: posts } = await axios.get(apiEndpoint);

    //await the promise for the result,must use async keyword
    //console.log(posts);

    this.setState({ posts });
  }


  //handleAdd is prop set to a function so the async syntax is different
  handleAdd = async() => {
    console.log("Add");

    const obj = {
      title: 'a',
      body: 'b'
    };

    //returns a promise so should use await and alos the function should be async
    const{data:post}=await axios.post(apiEndpoint, obj);
    console.log(post);

    // add post to array, create a new array and use spread operator.
    // the new post is added to the start
    const posts=[post,...this.state.posts];
    this.setState({posts});
  };

  handleUpdate = post => {
    console.log("Update", post);
  };

  handleDelete = post => {
    console.log("Delete", post);
  };

  render() {
    return (
      <React.Fragment>
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
