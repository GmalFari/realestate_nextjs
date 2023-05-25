import React from 'react';
import { useState,useEffect } from 'react';
import { Button } from '@chakra-ui/react';
import Multistep from "../../../components/MultiSteps";
import { fetchApi} from '../../../utils/fetchApi';
const UpdateProperty= ({propertyDetails}) => {
  const [loading,setLoading]=useState(true)
  const [data,setData] = useState(
  {...propertyDetails}
  )
  // let GetProperty = async()=>{
  //   // e.preventDefault();
  //   let token = JSON.parse(localStorage.getItem("authTokens"))
  //   let accessToken = token?.access
  //   const url = 'http://127.0.0.1:8000/api/list-properties/193/'
  //       const options = {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         // 'Content-Disposition':"none",
  //         // 'Accept-Encoding': 'gzip',
  //         // 'content-type': 'application/x-www-form-urlencoded',
  //         // 'Content-Type':'application/x-www-form-urlencoded',
  //         "Authorization" : `Bearer ${accessToken}`,
  //       },
      
  //     };
  //     try {
  //       const response = await fetch(url, options);
  //       const result = await response.json();
  //       if (response.status ===200){
  //         setData({...result,coverPhoto:null})
  //         console.log({...data})

  //       }else {
  //       }
  //     } catch (error) {
  //       console.log(error)
  //       alert(error)
  //     }
  //   }
  
  // useEffect(()=>{
  //   if(loading){
  //     GetProperty();
  //   }
  // },[loading])


    let EditProperty = async(e)=>{
        e.preventDefault();
        let token = JSON.parse(localStorage.getItem("authTokens"))
        let accessToken = token?.access
        e.preventDefault();
        const url = `http://127.0.0.1:8000/api/list-properties/${propertyDetails.id}/`
            const options = {
            method: 'PUT',
            headers: {

              'Accept': 'application/json',
              'Content-Type': 'application/json',              // 'Content-Disposition':"none",
              // 'Accept-Encoding': 'gzip',
              // 'content-type': 'application/x-www-form-urlencoded',
              // 'Content-Type':'application/x-www-form-urlencoded',
              "Authorization" : `Bearer ${accessToken}`,
            },
            body: JSON.stringify(
              { 
                ...data

                // 'property_title':'newTitle',
                // ,
               }
            )
          };
          try {
            const response = await fetch(url, options);
            const result = await response.json();
            if (response.status ===200){
              // setSubmitted(true)
              // setApiMessage(result)
              // console.log(result)
              console.log(data.coverPhoto)

            }else {
              // setSubmitted(false)
              // setApiMessage(result)
              console.log(result)
            }
            console.log(result);
          } catch (error) {
            // setApiMessage(error)
            console.log(error)
            // setSubmitted(false)
            alert(error)
          }
        }
  return (
    <>
      <Multistep  myData={data} setData={setData} />
      <form onSubmit={EditProperty}>
                  <Button type="submit">update property</Button>
        </form>
        {/* <form onSubmit={GetProperty}>
                  <Button type="submit">get property</Button>
        </form> */}
        
    </>
  )
}

export default UpdateProperty
export async function getServerSideProps({params: {update}}){
  const data = await fetchApi(`http://127.0.0.1:8000/api/list-properties/${update}/`)
  return {
      props : {
          propertyDetails:data
      }
  }
}
