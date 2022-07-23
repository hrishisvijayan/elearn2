import axios from 'axios';
import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom'
import Sidebar from './Sidebar';

const baseUrl = 'http://127.0.0.1:8000/api'

var studentId
function Profilesetting() {

    const [teacherData,setTeacherData] = useState([0])

    useEffect(()=>{
       
        studentId = localStorage.getItem('studentId')
        console.log('here the local studentId',localStorage.getItem('studentId'))

        try{
            axios.get(baseUrl+'/student/'+studentId).then((res)=>{
                console.log(res.data)
                setTeacherData(res.data)
            })
        }catch(error){
            console.log(error)
        }
        
    },[])

    const handleChange = (event)=>{
        setTeacherData({
            ...teacherData,
            [event.target.name] : [event.target.value]
        });
    }

           
    const handleFileChange = (event) => {
        setTeacherData({
            ...teacherData,
            [event.target.name]: event.target.files[0]
        })
        console.log('image checking', teacherData)
    }

    const _formData = null
    const formSubmit = () => {                     //************** the key point to note here is if we don't give the name is append as exactly the same name as per seializer of backend then the response will be having a null values so be careful
        const _formData = new FormData();
        _formData.append('id', teacherData.studentId);
        _formData.append('full_name', teacherData.full_name);
        _formData.append('email', teacherData.email);
        _formData.append('mobile_no', teacherData.mobile_no);
        _formData.append('password', teacherData.password);
        _formData.append('qualification', teacherData.qualification);
        _formData.append('address', teacherData.address);
        // _formData.append('video', chapterData.video, chapterData.video.name); //have to do some research on this syntax on how to upload images
        _formData.append('interested_categories', teacherData.interested_categories);

        console.log('submit button on', formSubmit)

        try {
            axios.put(baseUrl + '/student/' + studentId +'/' , _formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }).then((res) => {
                console.log(res.data)
                window.location.href = '/mycourses/'
            });
        } catch (error) {
            console.log(error)
        }

    
    }
    

    return (
        <div className='container mt-4' >
            <div className='row' >
                <aside className='col-md-3' >
                    <Sidebar />
                </aside>
                <section className='col-md-9' >
                    <div className='card' >
                        <h5 className='card-header' > Profile Setting </h5>
                        <div className='card-body' >


                            <div class="mb-3 row">
                                <label for="staticEmail" class="col-sm-2 col-form-label"  > Full Name </label>
                                <div class="col-sm-10">
                                    <input onChange={handleChange} type="text" name="full_name" readonly class="form-control" id="staticEmail" value={teacherData.full_name} />
                                </div>
                            </div>
                            <div class="mb-3 row">
                                <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
                                <div class="col-sm-10">
                                    <input onChange={handleChange} name="email"  type="text" readonly class="form-control" id="staticEmail" value={teacherData.email} />
                                </div>
                            </div>
                            {/* <div class="mb-3 row">
                                <label for="staticEmail" class="col-sm-2 col-form-label"> Profile Photo </label>
                                <div class="col-sm-10">
                                    <input onChange={handleFileChange} name="Profile Photo" type="file" readonly class="form-control" id="staticEmail" />
                                </div>
                            </div> */}
                            <div class="mb-3 row">
                                <label for="inputPassword"  class="col-sm-2 col-form-label"  >Password</label>
                                <div class="col-sm-10">
                                    <input onChange={handleChange} name="password" type="password" class="form-control" id="inputPassword" value={teacherData.password} />
                                </div>
                            </div>

                            <div class="mb-3 row">
                                <label for="staticEmail" class="col-sm-2 col-form-label"> Qualification </label>
                                <div class="col-sm-10">
                                    <input onChange={handleChange} name="qualification" type="text" readonly class="form-control" id="staticEmail" value={teacherData.qualification} />
                                </div>
                            </div>

                            <div class="mb-3 row">
                                <label for="staticEmail" class="col-sm-2 col-form-label"> Address </label>
                                <div class="col-sm-10">
                                    <input onChange={handleChange} name="address" type="text" readonly class="form-control" id="staticEmail" value={teacherData.address} />
                                </div>
                            </div>

                            <div class="mb-3 row">
                                <label for="staticEmail" class="col-sm-2 col-form-label"> mobile number </label>
                                <div class="col-sm-10">
                                    <input onChange={handleChange} name="mobile_no" type="text" readonly class="form-control" id="staticEmail" value={teacherData.mobile_no} />
                                </div>
                            </div>

                            <div class="mb-3 row">
                                <label for="staticEmail" class="col-sm-2 col-form-label"> Interests </label>
                                <div class="col-sm-10">
                                    <input onChange={handleChange} name="interested_categories" type="text" readonly class="form-control" id="staticEmail" value={teacherData.interested_categories} />
                                </div>
                            </div>

                            <hr />
                            <button onClick={formSubmit} className='btn btn-primary'>Update</button>

                        </div>
                    </div>

                </section>
            </div>
        </div>
    )

}
export default Profilesetting;