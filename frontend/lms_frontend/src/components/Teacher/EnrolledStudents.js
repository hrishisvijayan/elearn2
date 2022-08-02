import { Link, useParams } from 'react-router-dom'
import Sidebar from './TeacherSidebar';
import {useState,useEffect} from 'react';
import axios from 'axios'

const baseUrl= 'http://127.0.0.1:8000/api'

const teacherId=localStorage.getItem('teacherId')



function EnrolledStudents() {

    const { course_id } =  useParams()

    useEffect(()=>{
        
        document.title='Enrolled Student List'
        // const teacherId=localStorage.teacherId
        console.log('this is the course',course_id)
    })

    const [studentData,setStudentData]=useState([]);

    //fetch course when page is loading
    useEffect(()=>{
        try{
            axios.get(baseUrl+'/course-student/'+course_id).then((res)=>{
                // console.log('consoled res.data',res.data)
                setStudentData(res.data);
        })
    }catch(error){
        console.log(error)
    }
    },[]);
    console.log(studentData)

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
                                    {studentData.map((student,index) =>             
                                    <tr>
                                        <td><Link to={ '/all-chapter/'+student.id } > {student.student.full_name}  </Link>  </td>          {/* the link is added in this line as new updation ,, course id is also passed as parameter */}
                                        <td> <img  src={student.featured_img} width='80' className='rounded'alt={student.title}  />  </td> {/* this line is used display the image from the backend */}
                                        <td> <Link to='/' > {student.total_enrolled_students} </Link>  </td>
                                        <td> <Link to='/'> <button className='btn btn-info btn-sm' > View </button>  </Link> </td>
                                        
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
export default EnrolledStudents;