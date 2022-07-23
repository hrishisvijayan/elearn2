import { Link } from 'react-router-dom'
import Sidebar from './TeacherSidebar';
import {useState,useEffect} from 'react';
import axios from 'axios'

const baseUrl= 'http://127.0.0.1:8000/api'

const teacherId=localStorage.getItem('teacherId')



function TeacherMycourses() {


    useEffect(()=>{
        document.title='Teacher My Courses'
        // const teacherId=localStorage.teacherId
        console.log('this is id in local storage',teacherId)
    })

    const [courseData,setCourseData]=useState([]);

    //fetch course when page is loading
    useEffect(()=>{
        try{
            axios.get(baseUrl+'/teacher-courses/'+teacherId).then((res)=>{
                // console.log(res.data)
                setCourseData(res.data);
        })
    }catch(error){
        console.log(error)
    }
    },[]);
    console.log(courseData)
    return (
        <div className='container mt-4' >
            <div className='row' >
                <aside className='col-md-3' >
                   <Sidebar />
                </aside>
                <section className='col-md-9' >
                    <div className='card' >
                        <h5 className='card-header' > My Courses </h5>
                        <div className='card-body'>
                            <table className='table table-bordered' >
                                <thead>
                                    <tr>
                                        <th> Name </th>
                                        <th> Image </th>
                                        <th> Total Enrolled </th>
                                        <th> Action </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* why return is not needed here  the data should be written first and index as second */}
                                    {courseData.map((course,index) =>             
                                    <tr>
                                        <td><Link to={ '/all-chapter/'+course.id } > {course.title} </Link>  </td>          {/* the link is added in this line as new updation ,, course id is also passed as parameter */}
                                        <td> <img  src={course.featured_img} width='80' className='rounded'alt={course.title}  />  </td> {/* this line is used display the image from the backend */}
                                        <td> <Link to='/'> 27 </Link> </td>
                                        <td> <Link to='/'> <button className='btn btn-danger' > Remove </button>  </Link> <Link to={'/teacher-edit-course/' + course.id }> <button className='btn btn-primary m-1' > update </button>  </Link> </td>
                                        <Link to={'teacher-addchapter/'+course.id} className='btn btn-success active m-2' >Add Chapters</Link>     {/* the to= '' link has been modified to make the id that we are passing as dynamic  */}
                                    </tr>
                                    )}
                                </tbody>

                            </table>
                        </div> 

                    </div>

                </section>
            </div>
        </div>
    )

}
export default TeacherMycourses;