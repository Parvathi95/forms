import { useEffect, useState } from "react"
import { UserDetailsApi } from "../Services/Api";
import Navbar from '../Components/Navbar'
import { logout,isAuthenticated } from "../Services/Auth";
import { useNavigate,Navigate } from "react-router-dom";
import Image from '../images/image.jpg'
import './Dashboard.css'

export default function Dashboard(){
 const navigate= useNavigate();
   const [user,setUser]=useState({name:"",email:"",localId:""});

  useEffect(()=>{
    if(isAuthenticated){
      UserDetailsApi().then((response)=>{
        setUser({
            name:response.data.users[0].displayName,
            email:response.data.users[0].email,
            localId:response.data.users[0].localId,
           })
           })
          }
 },[])

  const logoutUser=()=>{
    logout();
    navigate('/login')
}


if(!isAuthenticated()){
  return <Navigate to="/login" />
 }
     
   return (
    <div>
       <Navbar logoutUser={logoutUser}/>
       <div>
        
       </div>
       <div>
        <img src={Image} alt="image..." />
       </div>
    </div>
   

    )
}