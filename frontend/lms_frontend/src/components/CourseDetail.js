import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios'
import Swal from 'sweetalert2';
const siteurl = 'http://127.0.0.1:8000/'      // this is used to get the image from the media in backend using url.

const baseUrl = 'http://127.0.0.1:8000/api'


function CourseDetail() {
    let { course_id } = useParams()


    const [courseData, setCourseData] = useState([]);
    const [chapterData, setChapterData] = useState([]);
    const [teacherData, setTeacherData] = useState([]);
    const [relatedCourseData, setRelatedCourseData] = useState([]);
    const [techListData, setTechListData] = useState([]);
    const [userLoginStatus, setUserLoginStatus] = useState();
    const [enrollStatus, setEnrollStatus] = useState();

    const [rating,setRating] = useState();

    


    //fetch course when page is loading
    useEffect(() => {
        document.title = 'All Courses'
        const studentId = localStorage.getItem('studentId')
        console.log('this is student Id', studentId)

        // Fetch courses
        try {
            axios.get(baseUrl + '/teacher-edit-courses/' + course_id).then((res) => {
                console.log(res.data)
                setCourseData(res.data);
                setTeacherData(res.data.teacher)            //here all the values are in this teacher data is done seperately because we are not able to access it directly
                setChapterData(res.data.course_chapters)
                setRelatedCourseData(JSON.parse(res.data.related_videos))     //here the data we are getting as related videos is not in json format so we have to parse it into json format
                setTechListData(res.data.tech_list)     //added as new to list the tech list and the coures related to it
            })
        } catch (error) {
            console.log(error)
        }

        // Fetch enroll status
        try {
            axios.get(baseUrl + '/student-enroll-status/' + studentId + '/' + course_id)
                .then((res) => {
                    console.log('--------------------------------boolean values', res.data.bool)
                    setEnrollStatus(res.data.bool)

                })
        } catch (error) {
            console.log(error)
        }



        const studentLoginStatus = localStorage.getItem('studentLoginStatus');
        if (localStorage.studentLoginStatus == 'success') {
            // window.location.href='/dashboard'
            console.log('this is student login status', localStorage.getItem('studentLoginStatus'))
            setUserLoginStatus('success')
        }

    }, []);

    console.log('this is user login status', userLoginStatus)
    console.log('this is course', courseData)
    console.log('this is the related course data', relatedCourseData)
    console.log('hei this is title', relatedCourseData.map((hai, index) => { console.log(hai.title) }))


    const enrollCourse = () => {
        console.log('Hello World');
        const studentId = localStorage.getItem('studentId');
        const _formData = new FormData();
        _formData.append('course', courseData.id);         //this courseData.category's category is the name that we have given in the form and we can set value for the corresponging name in the form also like we have done here for taking category id.
        _formData.append('student', studentId);



        try {
            axios.post(baseUrl + '/student-enroll-course/', _formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }).then((res) => {
                if (res.status === 200 || res.status === 201) {
                    Swal.fire({
                        title: 'You are successfully enrolled in this course',
                        icon: 'success',
                        toast: true,
                        timer: 3000,
                        position: 'top-right',
                        timerProgressBar: true,
                        showConfirmButton: false
                    })
                    setEnrollStatus(res.data.bool);
                }
                console.log(res.data)
                // window.location.href='/teacher-mycourses'
            });
        } catch (error) {
            console.log(error)
        }
        document.location.reload();

    }

    const handleChange=(event)=>{
        setRating({
            ...rating,                        // it will input the data in to the coursedata array(spread orperator is used)
            [event.target.name]:event.target.value
        });
    }


    const _formData = null
    const formSubmit=()=>{                //************** the key point to note here is if we don't give the name is append as exactly the same name as per seializer of backend then the response will be having a null values so be careful
        const teacherId = localStorage.getItem('teacherId');
        const _formData = new FormData();
        _formData.append('category',courseData.category);         //this courseData.category's category is the name that we have given in the form and we can set value for the corresponging name in the form also like we have done here for taking category id.
        _formData.append('teacher',teacherId);
        _formData.append('title',courseData.title);
        _formData.append('description',courseData.description);
        _formData.append('featured_img',courseData.f_img,courseData.f_img.name); //have to do some research on this syntax on how to upload images
        _formData.append('techs',courseData.techs);
        
        console.log('submit button on',formSubmit)

        try{
            axios.post(baseUrl+'/course/',_formData,{
                headers :{
                    'content-type' : 'multipart/form-data'
                }
            }).then((res)=>{
                console.log(res.data)
                window.location.href='/teacher-mycourses'
            });
            }catch(error){
                console.log(error)
           }
           
    }
    

    return (
        <div className='container mt-3'>
            <div className='row'>
                <div className='col-4'>
                    <img src={courseData.featured_img} className="img-thumbnail" alt="..." />
                </div>
                <div className='col-8 '>
                    <h3>{courseData.title}</h3>
                    <p>
                        {courseData.description}
                    </p>
                    <p className='fw-bold'>
                        Course By:
                        <Link to={`/teacher-details/${teacherData.id}`}>
                            {teacherData.full_name}
                        </Link>
                    </p>
                    <p className='fw-bold'>
                        Technologies Used:
                        {/* <Link to="/teacher-details/1">
                            {courseData.techs}
                        </Link> */}
                        {techListData.map((tech, index) =>
                            <Link to={`/category/${tech.trim()}`} className='badge bg-warning m-1' > {tech} </Link>
                        )}
                    </p>
                    <p className='fw-bold'>
                        Duration: 3 hours 30 minutes
                    </p>
                    <p className='fw-bold'>
                        Total Enrolled:  {courseData.total_enrolled_students}
                    </p>
                    <p className='fw-bold'>
                        Rating: 4.5/5  {

                            userLoginStatus == 'success' && enrollStatus == true &&
                            <>
                                <button type='button' className='btn btn-success' data-bs-toggle="modal" data-bs-target="#ratingModal" > Rating </button>
                                <div className="modal fade" id="ratingModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel"> Rate for {courseData.title} </h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">

                                               
                                                <form>
                                                    <div className="mb-3">
                                                        <label for="exampleInputEmail1" className="form-label"> Rating </label>
                                                        <div>
                                                            <select className='form-control' name="rating">
                                                                <option value="1">1</option>
                                                                <option value="2">2</option>
                                                                <option value="3">3</option>
                                                                <option value="4">4</option>
                                                                <option value="5">5</option>
                                                            </select>
                                                        </div>

                                                        <div className="mb-3">
                                                            <label for="exampleInputPassword1" className="form-label"> Review </label>
                                                            <p><textarea className='form-control' rows="10"  ></textarea></p>
                                                         <p>
                                                         {/* <input className='form-control mt-3 col-12' rows='10' type="text" /> */}
                                                         </p>   

                                                        </div>

                                                        <button type="submit" className="btn btn-primary">Submit</button>
                                                    </div>
                                                </form>

                                            </div>
                                           
                                        </div>
                                    </div>
                                </div>
                            </>
                        }
                    </p>

                    {
                        userLoginStatus == 'success' && enrollStatus !== true &&
                        <p className='fw-bold'>
                            <button type='button' onClick={enrollCourse} className='btn btn-success' > Enroll In This Course </button>
                        </p>
                    }

                    {
                        userLoginStatus == 'success' && enrollStatus == true &&
                        <p className='fw-bold'>
                            <span className='btn btn-primary' > You have already enrolled in this course </span>
                        </p>
                    }

                    {
                        userLoginStatus !== 'success' &&
                        <p className='fw-bold'>
                            <Link to='/login' > Please login to enroll in this course </Link>
                        </p>
                    }

                </div>
            </div>
            {/* course videos */}
            <div className="card m-3" >
                <div className="card-header">
                    <h3> Course Videos </h3>
                </div>
                <ul className="list-group list-group-flush">
                    {chapterData.map((chapter, index) =>
                        <li className="list-group-item "> {chapter.title}
                            <span className='me-3' > 1:30 mins </span>
                            <button className='btn btn-sm btn-danger float-right ' data-bs-toggle="modal" data-bs-target="#VideoModal1">     <i className="bi bi-youtube"></i> </button>

                            {/* modal start  */}
                            <div className="modal fade" id="VideoModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-xl">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">Video 1</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="ratio ratio-16x9">
                                                <iframe src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0" title={chapter.title} allowfullscreen></iframe>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            {/* video modal end  */}

                        </li>
                    )}
                    {/* <li className="list-group-item "> introduction
                        <span className='me-3' > 1:30 mins </span>
                        <button className='btn btn-sm btn-danger float-right ' >   <i className="bi bi-youtube"></i> </button>
                    </li>   */}


                </ul>
            </div>

            {/* related courses starts heres */}
            <h3 className=" pb-1 mb-2 mt-5" >Related Courses <a href="#" className="float-end" >See All</a> </h3>
            <div className="row" >

                {relatedCourseData.map((rcourse, index) =>
                    <div className="col-md-3 m-2" >
                        <div className="card h-100" >
                            {/* <img src={siteurl+'media/'+rcourse.fields.featured_img} className="card-img-top h-100" alt={rcourse.fields.title} /> this code was my own code and it was working but I think it is not the standard way */}
                            <Link target='__blank' to={`/detail/${rcourse.pk}`} >  <img src={`${siteurl}media/${rcourse.fields.featured_img}`} className="card-img-top h-100" alt={rcourse.fields.title} /> </Link>
                            <div className="card-body">
                                <h5 className="card-title"> <Link target='__blank' to={`/detail/${rcourse.pk}`}>{rcourse.fields.title}   </Link>   </h5>
                            </div>
                        </div>
                    </div>
                )}





            </div>
            {/* related courses ends heres */}

        </div>
    )
}


export default CourseDetail;
