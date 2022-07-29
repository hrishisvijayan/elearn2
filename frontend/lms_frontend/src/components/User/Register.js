import {Link}  from 'react-router-dom'
import {useEffect,useState} from 'react'
import axios from 'axios'

const baseUrl='http://127.0.0.1:8000/api'

function Register(){

    useEffect(()=>{
        document.title='User Register'
    })

    if(localStorage.teacherLoginStatus=='success'){
        window.location.href='/student-dashboard'
    }
    
    const [studentData,setStudentData]=useState({        //we usually write useState(null) by default but here we are setting all the corresponding data to null specificly
        
    });

    const handleChange=(event)=>{                      // whenever the onChange iside the form is calling the handleChanger then it will call 'setTeacherData' data and the all the values will be saved in 'teacherData'
        
        setStudentData({                                // this set teacher data is responisble for setting the data into teacherData
            ...studentData,                             //this is the spread operator  so that we can add the key values pair to teacherData
            [event.target.name] : event.target.value
        });
    }


    //submit form start
    const submitform=(event)=>{             //////////////////this event is my experiment should be removed
        event.preventDefault();             ///////////////////this one also 
        const studentfomdata = new FormData();                     // here we are actually creating the a new form and in this form we are adding the values by appending it. this will only get called when the user hit the submit button
        studentfomdata.append("full_name",studentData.full_name)   //from the state 'teacherData' we are fetching the name and other below values
        studentfomdata.append("email",studentData.email)
        studentfomdata.append("password",studentData.password)
        studentfomdata.append("qualification",studentData.qualification)
        studentfomdata.append("mobile_no",studentData.mobile_no)
        studentfomdata.append("address",studentData.address)
        studentfomdata.append("interested_categories",studentData.interested_categories)


        try{
             //after appending the the values from teacher data to the form we can post this form to the backend using 'axios'
        axios.post(baseUrl + '/student/',studentfomdata).then((response)=>{      //after sending the request to the server the response will be received inside 'then()' 
            console.log(response.data)                              //inside the response there will be other things such as config, status, headers etc
            setStudentData({
                'full_name'              : '',                            
                'email'                  : '',                            
                'password'               : '',
                'qualification'          : '',
                'mobile_no'              : '',
                'address'                : '',
                'interested_categories'  : '',
                'status'                 : 'success' ,
            })
        })
        }catch(error){
            console.log('what to do')
            setStudentData({'status':'error'})
        }
       
    }
    //submit form end


    return(
        <div className='container mt-4' >
        <div className='row' >
            <div className='col-6 offset-3' >
                {studentData.status=='success' && <p className='text-success' > Registration Successfull </p>}    {/* this is used to print message on the registration form according to the submit form response       */}
                {studentData.status=='error' && <p className='text-danger' > something went wrong </p>}                {/* this is used to print message on the registration form according to the submit form response       */}

                <div className='card' >
                    <h3 className='card-header' > User Login </h3>
                    <div className='card-body' >

                        <form>
                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label"> Full Name </label>
                                <input onChange={handleChange} name='full_name' type="text" className="form-control"  aria-describedby="emailHelp" />
                                    
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label">Email </label>
                                <input onChange={handleChange} name='email' type="email" className="form-control"  aria-describedby="emailHelp" />
                                    
                            </div>
                            
                            <div className="mb-3">
                                <label for="exampleInputPassword1" className="form-label">Password</label>
                                <input onChange={handleChange} name='password' type="password" className="form-control" id="exampleInputPassword1" />
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label"> Address </label>
                                <input onChange={handleChange} name='address' type="text" className="form-control"  aria-describedby="emailHelp" />    
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label"> Mobile Number </label>
                                <input onChange={handleChange} name='mobile_no' type="text" className="form-control"  aria-describedby="emailHelp" />    
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label"> Qualification </label>
                                <input onChange={handleChange} name='qualification' type="text" className="form-control"  aria-describedby="emailHelp" />    
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label"> Interest </label>
                                <input onChange={handleChange} name='interested_categories' type="text" className="form-control"  aria-describedby="emailHelp" />
                                <div id="emailHelp" class="form-text"> Python,JavaScript,Php,etc. </div>    
                            </div>
                            
                            <button onClick={submitform} type="submit" className="btn btn-primary"> Register </button>
                        </form>

                    </div>

                </div>
            </div>
        </div>
    </div>
    )
   
}
export default Register;


