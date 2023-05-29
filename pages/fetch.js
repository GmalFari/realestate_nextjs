// import React, { Component } from 'react';
// import axios from 'axios';
// import { useState } from 'react';
// const Testings=()=>  {
//   const [state,setState]=useState({
//     property_title: '',
//     coverPhoto: null
//   })
//   console.log(state)
//   const token = JSON.parse(localStorage.getItem("authTokens"))
//   const handleChange = (e) => {
//     setState({
//       [e.target.id]: e.target.value
//     })
//   };

//   const handleImageChange = (e) => {
//     setState({
//       coverPhoto: e.target.files[0]
//     })
//   };
//   console.log(state.coverPhoto)
//   const handleSubmit = (e) => {

// e.preventDefault()
// const myform = new FormData();
// myform.append("coverPhoto",state.coverPhoto);
// myform.append("property_title", "propertytitle");
// const options = {
//   method: 'POST',
//   headers: {
//     // cookie: 'csrftoken=7XvsJazYILn3EmqvpHHgYkntRSxpq56N',
//     // 'Content-Type': 'multipart/form-data; boundary=---DSsdklweewioewioewD',
//     Authorization: `Bearer ${token?.access}`,
//   },
  

// };
// options.body = myform
// // options.body = form;

// fetch('http://127.0.0.1:8000/api/list-properties/', options)
//   .then(response => response.json())
//   .then(response => console.log(response))
//   .catch(err => console.error(err));
//   }

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   console.log(state);
//   //   let form_data = new FormData();
//   //   form_data.append('coverPhoto',state.main_image);
//   //   form_data.append('property_title', state.title);
//   //   let url = '127.0.0.1:8000/api/list-properties/';
//   //   axios.post(url, state, {
//   //     headers: {
//   //       'content-type': 'multipart/form-data',
//   //       "Authorization" : `Bearer ${accessToken}`,
//   //       'Content-Encoding':' br'


//   //     }
//   //   })
//   //       .then(res => {
//   //         console.log(res.data);
//   //         console.log(form_data)
//   //       })
//   //       .catch(err => {
//   //         console.log(err)
//   //         console.log(form_data)
//   //       }
//   //       )
//   // };

//     return (
//       <div className="App">
//         <form onSubmit={handleSubmit} enctype="multipart/form-data">
//           <p>
//             <input type="text" name="property_title" placeholder='title' id='property_title' value={state['property_title']} onChange={handleChange} required/>

//           </p>
//           <p>
//             <input
//               name="main_img" type="file"
//                    id="image"
//                    accept="image/png, image/jpeg"  onChange={handleImageChange} />
//           </p>
//           <input type="submit"/>
//         </form>
//       </div>
//     );
//   }

// export default Testings;
//
