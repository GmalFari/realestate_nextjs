import  { createContext,useContext, useState, useEffect, use } from "react";
import jwt_decode from "jwt-decode";
// import { useHistory } from "react-router-dom";
import api from "../services/api"
const AuthContext = createContext();
import { useRouter } from "next/router";
export default AuthContext;

export const AuthProvider = ({ children }) => {
  let myAuthToken = null;
  let myUser = null;
  const router = useRouter()
  const [errors,setErrors] = useState()
  useEffect(()=>{
     myAuthToken = localStorage.getItem('authTokens')?
          JSON.parse(localStorage.getItem('authTokens')):null
    
    myUser = localStorage.getItem('authTokens')?
          jwt_decode(localStorage.getItem('authTokens')):null
  },[])
  const [authTokens, setAuthTokens] = useState(()=> myAuthToken);
  const [user, setUser] = useState(()=>myUser);
  const [loading, setLoading] = useState(true);
  // const history = useHistory();
useEffect(()=>{
  setAuthTokens(localStorage.getItem("authTokens")
  ? JSON.parse(localStorage.getItem("authTokens"))
  : null)
  setUser(  localStorage.getItem("authTokens")
  ? jwt_decode(localStorage.getItem("authTokens"))
  : null)
},[])
  let loginUser = async (e) => {
    e.preventDefault()
    console.log("form submitted")
    
   try{
    const response = await fetch("http://127.0.0.1:8000/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
       "email":e.target.email.value,"password":e.target.password.value
      })
    });
    
    const data = await response.json();
    if (response.status === 200) {
        setAuthTokens(data);
      setUser(jwt_decode(data.access));
      console.log(user)
      localStorage.setItem("authTokens", JSON.stringify(data));
      console.log(response.status)
      alert("لقد تم تسجيل الدخول")
      router.push('/accounts/profile')
      // history.back();
      // Router.back()
    } else {
        // alert("Something went wrong!");
        alert(`${data.detail} 
        خطأ في تسجيل الدخول
        `)
        setErrors(data)

      }
   }catch(errors){
    alert(` ${errors}`)
    // AlertBox({jamal:1})

   }
    };
  const registerUser = async (firstname,lastname,email,password) => {
    // e.preventDefault()
    try{
      const response = await fetch("http://127.0.0.1:8000/api/users/register/", {
      method: "POST",
      headers: {
        "Accept": 'application/json',
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "first_name":firstname,
        "last_name":lastname,
        "email":email,
        "password":password
        // "re_password":e.target.password2.value
      })
    })
    const data = await response.json()
    console.log(response.json)
    // return response.status


    if (response.status === 201) {
      console.log(response.status)
      router.push('/accounts/login')
    } else {
      setErrors(data)
      // alert("Something went wrong!");
      // console.log(response.status)
      // console.log(data)

    }
    }catch(err){
     alert(err)
    }
  };
  
  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    // Router.push('/accounts/login')
    // if(!localStorage.getItem("authTokens")){
    //   router.push("/")
    // }

    
  };
  let updateToken = async ()=>{
    console.log('update tokens')
    try{
      let response = await fetch('http://127.0.0.1:8000/api/token/refresh/',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({'refresh':authTokens?.refresh})
    })
    let data = await response.json()
    if (response.status === 200) {
      setAuthTokens(data)
      setUser(jwt_decode(data.access))
      localStorage.setItem('authTokens',JSON.stringify(data))
      router.push("/")
    }else {
      logoutUser() 
    } if (loading) {
        setLoading(false)
    }
    }catch(errors){
      alert(errors)
    }
  };
  // useEffect(()=>{    
  //   let FiveMinutes = 1000 * 60 * 5
  //   let interval =  setInterval(()=>{
  //     if(authTokens){
  //       updateToken()
  //     }
  //   },FiveMinutes)
  //   return ()=> clearInterval(interval)
  // },[authTokens,loading])

  const contextData = {
    user:user,
    // setUser,
    // setAuthTokens,
    registerUser:registerUser,
    loginUser:loginUser,
    authTokens:authTokens,
    logoutUser:logoutUser,
    errors:errors,
  };
  useEffect(() => {
    if (authTokens) {
      setUser(jwt_decode(authTokens.access));
    }
    setLoading(false);
  }, [authTokens, loading]);
  
  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
// export const ProtectRoute = ({ children }) => {
//   const { isAuthenticated, isLoading } = useAuth();
//   if (isLoading || (!isAuthenticated && window.location.pathname !== 'accounts/login')){
//     return <LoadingScreen />; 
//   }
//   return children;
// };