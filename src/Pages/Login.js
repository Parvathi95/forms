import { LoginApi } from '../Services/Api';
import './Login.css';
import { useState } from 'react';
import { storeUserData } from '../Services/Storage';
import { isAuthenticated } from '../Services/Auth';
import {Link, Navigate} from 'react-router-dom'
import Navbar from '../Components/Navbar';

export default function Login(){

    const initialStateErrors={
        email:{required:false},
        password:{required:false},
        custom_error:null
    };
   const [errors,setErrors]=useState(initialStateErrors);

   const [loading,setLoading]=useState(false);

   const [inputs,setInputs]=useState({
    email:"",
    password:""
 })

 const handleInputs=(event)=>{
    setInputs({...inputs,[event.target.name]:event.target.value})
 }

   const handleSubmit=(event)=>{
    console.log(inputs);
    event.preventDefault();
    let errors=initialStateErrors;
    let hasError=false;

     if(inputs.email==""){
       errors.email.required=true;
       hasError=true;
    }
     if(inputs.password==""){
       errors.password.required=true;
       hasError=true;
    }

    if(!hasError){
       setLoading(true)
       LoginApi(inputs).then((resp)=>{
          storeUserData(resp.data.idToken);
       }).catch((err)=>{
          if(err.code="ERR_BAD_REQUEST"){
            setErrors({...errors,custom_error:"Invalid Credentials."})

          }
        }).finally(()=>{
          setLoading(false)
        })
    }
    setErrors({...errors});
    }

    if(isAuthenticated()){
        return <Navigate to="/dashboard" />
       }


    return (
        <div>
             <Navbar/>
        <section className="login-block">
        <div className="container">
            <div className="row ">
                <div className="col login-sec">
                    <h2 className="text-center">Login</h2>
                    <form onSubmit={handleSubmit} className="login-form" action="">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1" className="text-uppercase">Email</label>
                        <input type="email"  className="form-control" onChange={handleInputs} name="email"  id="" placeholder="email"  />
                        {errors.email.required?
                    (<span className="text-danger" >
                        Email is required.
                    </span>):null
                       }
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1" className="text-uppercase">Password</label>
                        <input  className="form-control" type="password" onChange={handleInputs} name="password" placeholder="password" id="" />
                        {errors.password.required?
                    (<span className="text-danger" >
                        Password is required.
                    </span>):null
                    }
                    </div>
                    <div className="form-group">
                    {loading?
                    (<div  className="text-center">
                      <div className="spinner-border text-primary " role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>):null
                       }
                        <span className="text-danger" >
                        {errors.custom_error?
                       (<p>{errors.custom_error}</p>)
                       :null
                       }
                        </span>
                        <input  type="submit" className="btn btn-login float-right" disabled={loading} value="Login" />
                    </div>
                    <div className="clearfix"></div>
                    <div className="form-group">
                    Create new account ? Please <Link to="/register">Register</Link>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    </section>

        </div>
       
       
    )
}