import { Link, useParams } from 'react-router-dom'
import {useState,useEffect} from 'react';
import axios from 'axios'
const siteurl='http://127.0.0.1:8000/'      // this is used to get the image from the media in backend using url.

const baseUrl= 'http://127.0.0.1:8000/api'


function CourseDetail() {
    let { course_id } = useParams()
    

    const [courseData,setCourseData]=useState([]);
    const [chapterData,setChapterData]=useState([]);
    const [teacherData,setTeacherData]=useState([]);
    const [relatedCourseData,setRelatedCourseData]=useState([]);



    //fetch course when page is loading
    useEffect(()=>{
        document.title='All Courses'
        try{
            axios.get(baseUrl+'/teacher-edit-courses/'+course_id).then((res)=>{
                console.log(res.data)
                setCourseData(res.data);
                setTeacherData(res.data.teacher)            //here all the values are in this teacher data is done seperately because we are not able to access it directly
                setChapterData(res.data.course_chapters)
                setRelatedCourseData(JSON.parse(res.data.related_videos))     //here the data we are getting as related videos is not in json format so we have to parse it into json format
        })
    }catch(error){
        console.log(error)
    }
    },[]);

   
   console.log( 'this is the related course data',relatedCourseData)
   console.log('hei this is title',relatedCourseData.map((hai,index)=>{console.log(hai.title)}))
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
                        <Link to="/teacher-details/1">
                            {courseData.techs}
                        </Link>
                    </p>
                    <p className='fw-bold'>
                        Duration: 3 hours 30 minutes
                    </p>
                    <p className='fw-bold'>
                        Total Enrolled: 427 students
                    </p>
                    <p className='fw-bold'>
                        Rating: 4.5/5
                    </p>
                </div>
            </div>
            {/* course videos */}
            <div className="card m-3" >
                <div className="card-header">
                    <h3> Course Videos </h3>
                </div>
                <ul className="list-group list-group-flush">
                   {chapterData.map((chapter,index)=>
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
                                        <div class="ratio ratio-16x9">
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

                {relatedCourseData.map((rcourse,index)=>
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
