import React, { Component } from 'react';
import axios from 'axios';

class Testings extends Component {

  state = {
    property_title: '',
    content: '',
    main_image: null,
    token:'',
    accessToken:''
  };

  token = JSON.parse(localStorage.getItem("authTokens"))
   accessToken = token?.access
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  };

  handleImageChange = (e) => {
    this.setState({
      main_image: e.target.files[0]
    })
  };
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    let form_data = new FormData();
    form_data.append('image', this.state.main_image, this.state.main_image.name);
    form_data.append('title', this.state.title);
    form_data.append('content', this.state.content);
    let url = 'http://localhost:8000/api/list-properties/';
    axios.post(url, form_data, {
      headers: {
        'content-type': 'multipart/form-data',
        "Authorization" : `Bearer ${accessToken}`,

      }
    })
        .then(res => {
          console.log(res.data);
        })
        .catch(err => console.log(err))
  };

  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <p>
            <input type="text" placeholder='Title' id='title' value={this.state.title} onChange={this.handleChange} required/>
          </p>
          <p>
            <input type="text" placeholder='Content' id='content' value={this.state.content} onChange={this.handleChange} required/>

          </p>
          <p>
            <input type="file"
                   id="image"
                   accept="image/png, image/jpeg"  onChange={this.handleImageChange} required/>
          </p>
          <input type="submit"/>
        </form>
      </div>
    );
  }
}

export default Testings;
