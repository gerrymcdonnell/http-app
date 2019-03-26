import "./App.css";

import React, { Component } from "react";
import http from './services/httpService';

//import api endpoint address
import config from './config.json';

/**npm i axios@0.18 */

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
    const { data: posts } = await http.get(config.apiEndpoint);

    //await the promise for the result,must use async keyword
    //console.log(posts);

    this.setState({ posts });
  }


  //handleAdd is prop set to a function so the async syntax is different
  handleAdd = async () => {
    console.log("Add");

    const obj = {
      title: 'a',
      body: 'b'
    };

    //returns a promise so should use await and alos the function should be async
    const { data: post } = await http.post(config.apiEndpoint, obj);
    console.log(post);

    // add post to array, create a new array and use spread operator.
    // the new post is added to the start
    const posts = [post, ...this.state.posts];
    this.setState({ posts });
  };

  handleUpdate = async post => {
    console.log("Update", post);
    post.title = "updated";

    //PUT send whole post object
    const { data } = await http.put(config.apiEndpoint + '/' + post.id, post);
    console.log(data);

    //create new posts array with the new post
    const posts = [...this.state.posts];

    //find the index of current post in array
    const index = posts.indexOf(post);

    //vid 142
    //confused:!!! go to the index create new object and spread post argument
    posts[index] = { ...post };
    this.setState({ posts });

    //PATCH send only fields to be updated
    //axios.patch(apiEndpoint+'/'+post.id,{title:post.title});
  };

  handleDelete = async post => {
    console.log("Delete", post);

    //copy of posts before the deletion
    const origPosts = this.state.posts;

    //filter the posts by not including the one we deleted
    const posts = this.state.posts.filter(p => p.id !== post.id);
    this.setState({ posts });

    //test an error
    //throw new Error("");

    try {
      await http.delete(config.apiEndpoint + '/' + post.id);
    }
    catch (ex) {
      if (ex.response && ex.response.status === 404)
        alert('error');
      //revert change due to error
      this.setState({ posts: origPosts });
    }

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
