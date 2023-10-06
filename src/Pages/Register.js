import { useState } from 'react'
import './Register.css'
import { RegisterApi } from '../Services/Api';
import { storeUserData } from '../Services/Storage';
import { isAuthenticated } from '../Services/Auth';
import {Link, Navigate} from 'react-router-dom'
import Navbar from '../Components/Navbar';

export default function Register(){
   const initialStateErrors={
        name:{required:false},
        email:{required:false},
        password:{required:false},
        custom_error:null
    };
   const [errors,setErrors]=useState(initialStateErrors);

    const [loading,setLoading]=useState(false);

    const handleSubmit=(event)=>{
      event.preventDefault();
      let errors=initialStateErrors;
      let hasError=false;
      if(inputs.name==""){
         errors.name.required=true;
         hasError=true;
      }
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
         RegisterApi(inputs).then((resp)=>{
            storeUserData(resp.data.idToken);
         }).catch((err)=>{
            if(err.response.data.error.message=="EMAIL_EXISTS"){
               setErrors({...errors,custom_error:"Already this email has been registered!"})
            }else if(String(err.response.data.error.message).includes('WEAK_PASSWORD')){
               setErrors({...errors,custom_error:"Password should be at least 6 characters!"})

            }
          }).finally(()=>{
            setLoading(false)
          })
      }
      setErrors(errors);
      }

      const [inputs,setInputs]=useState({
         name:" ",
         email:" ",
         password:" "
      })

      const handleInputs=(event)=>{
         setInputs({...inputs,[event.target.name]:event.target.value})
      }

      if(isAuthenticated()){
         return <Navigate to="/dashboard"/>
        }


    return (
      <div>
         <Navbar/>
        <section className="register-block">
            <div className="container">
               <div className="row ">
                  <div className="col register-sec">
                     <h2 className="text-center">Register</h2>
                     <form onSubmit={handleSubmit} className="register-form" action="" >
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1" className="text-uppercase">Name</label>
          
                        <input type="text" className="form-control" onChange={handleInputs} name="name" id=""  />
                        {errors.name.required?
                        (<span className="text-danger" >
                            Name is required.
                        </span>):null
                        }
                     </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1" className="text-uppercase">Email</label>
          
                        <input type="text"  className="form-control" onChange={handleInputs} name="email" id="" />
                        {errors.email.required?
                        (<span className="text-danger" >
                            Email is required.
                        </span>):null
                           }
                     </div>
                     <div className="form-group">
                        <label htmlFor="exampleInputPassword1" className="text-uppercase">Password</label>
                     <input  className="form-control" type="password" onChange={handleInputs} name="password" id="" />
                        {errors.password.required?
                        (<span className="text-danger" >
                            Password is required.
                        </span>):null
                        }
                     </div>
                     <div className="form-group">
          
                        <span className="text-danger" >
                           {errors.custom_error?
                           (<p>{errors.custom_error}</p>)
                           :null
                           }
                        </span>
                        {loading?
                        (<div  className="text-center">
                          <div className="spinner-border text-primary " role="status">
                            <span className="sr-only">Loading...</span>
                          </div>
                        </div>):null
                           }
          
                        <input type="submit" className="btn btn-login float-right" disabled={loading} value="Register"/>
                     </div>
                     <div className="clearfix"></div>
                     <div className="form-group">
                       Already have account ? Please <Link to="/login">Login</Link>
                     </div>
          
          
                     </form>
          
          
                  </div>
          
               </div>
          
          
            </div>
          </section>

      </div>
      

    )
}