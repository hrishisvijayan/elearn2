import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';

const baseUrl='http://127.0.0.1:8000/api'



function TeacherLogin() {


    const [teacherLoginData,setteacherLoginData]=useState({
        email      : '',
        password   : ''
    })



    const handleChange=(event)=>{
        setteacherLoginData({
            ...teacherLoginData,
            [event.target.name] : event.target.value
        })
    }

    const submitform=(e)=>{
        e.preventDefault(); 
        // console.log(teacherLoginData)
        const teacherFormData=new FormData;
        teacherFormData.append('email',teacherLoginData.email)
        teacherFormData.append('password',teacherLoginData.password)
        
        try{
            axios.post(baseUrl+'/teacher-login',teacherFormData).then((res)=>{
                console.log(res.data)
                if (res.data.bool==true){                             //1. if boolean is true then we will store the data inside the local storage.
                    localStorage.setItem('teacherLoginStatus','true')
                    localStorage.setItem('teacherId',res.data.teacher_id)   //we are saving the teacher's id from the backend in the local storage.
                    window.location.href='/teacher-dashboard'
                    
                }else{
                    setErrorMsg('Entered Email or Password incorrect !')    // we are setting the error message here. it is set if the bool is false which comes from the backend.
                }
            });
        }catch(error){
            console.log(error);
        }

    }
    // var teacherLoginStatus
    // localStorage.teacherLoginStatus= 'false'                     //this is my own modification due to error occured in initialization of login status
    // teacherLoginStatus = localStorage.getItem(teacherLoginStatus)  //2. by using the localstorage status we will direct the url to the desired page
    if(localStorage.teacherLoginStatus=='hello'){
        window.location.href='/teacher-dashboard'
    }

    const [erroMsg,setErrorMsg]=useState();     // this is set the error message if the user is inputting a wrong credentials

    useEffect(()=>{
        document.title='Teacher Login'
        console.log(localStorage.teacherLoginStatus)
        console.log(erroMsg)
    })

    return (
        <div className='container mt-4' >
            <div className='row' >
                <div className='col-6 offset-3' >
                    <div className='card' >
                        <h3 className='card-header' > Teacher Login </h3>
                        {erroMsg &&  <p className='text-danger' > {erroMsg} </p> }
                        <div className='card-body' >

                            <form>
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                                    <input onChange={handleChange} name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputPassword1" className="form-label">Password</label>
                                    <input onChange={handleChange} name="password" type="password" className="form-control" id="exampleInputPassword1" />
                                </div>
                                
                                <button onClick={submitform} type="submit" className="btn btn-primary"> Login </button>
                            </form>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )


}


export default TeacherLogin;