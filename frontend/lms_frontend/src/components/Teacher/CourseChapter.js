import { Link, useParams } from 'react-router-dom'
import Sidebar from './TeacherSidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';



const baseUrl = 'http://127.0.0.1:8000/api/'



function CourseChapter() {

    const { course_id } = useParams()  //to get the id from the url

    const [chapterData, setChapterData] = useState([]);

    const [totalResult,setTotalResult] = useState([0]);       // for counting the number of chapters do some research on why 0 is written inside the array.



    useEffect(() => {
        document.title = 'All chapters'

        try {
            axios.get(baseUrl + 'course-chapter/' + course_id).then((res) => {
                console.log(res.data)
                setChapterData(res.data)
                setTotalResult(res.data.length)      //.length operator is used to count number of chapters
            })
        } catch (error) {
            console.log(error)
        }

    }, [])

    //added new to confirm the deletion of a chapter
    const Swal = require('sweetalert2')    //or you can import this thing also refer sweet alert documentation
    const handleDelete = (chapter_id)=>{  //the chapter id is passed to this function in the arrow function provided in the onclick function.
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                try {
                    axios.delete(baseUrl + 'delete-chapter/'+chapter_id)
                    .then((res) => {
                        Swal.fire('success','data has been deleted.');
                        
                        try {             //this entire section is just copy paste just reload the page in the background. just ignore(because if you use location.reload then it will happen suddenly)
                            axios.get(baseUrl + 'course-chapter/' + course_id).then((res) => {
                                console.log(res.data)
                                setChapterData(res.data)
                                setTotalResult(res.data.length)      //.length operator is used to count number of chapters
                            })
                        } catch (error) {
                            console.log(error)
                        }
                        
                       
                    })

                } catch (error) {
                    console.log(error)
                }
                
              
              
            }
          })
    }

    return (
        <div className='container mt-4' >
            <div className='row' >
                <aside className='col-md-3' >
                    <Sidebar />
                </aside>
                <section className='col-md-9' >
                    <div className='card' >
                        <h5 className='card-header' > All Chapters ({totalResult})  </h5>
                        <div className='card-body'>
                            <table className='table table-bordered' >
                                <thead>
                                    <tr>
                                        <th> title </th>
                                        <th> video </th>
                                        <th> remarks </th>
                                        <th> Action </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* why return is not needed here  the data should be written first and index as second */}
                                    {chapterData.map((chapter, index) =>
                                        <tr>
                                            <td><Link to={'/edit-chapter/' + chapter.id } > {chapter.title} </Link>  </td>
                                            <td>

                                                {/* <video controls width="250">

                                                    <source src={ chapter.video.url } type="video/webm" />

                                                    <source src={ chapter.video.url } type="video/mp4" />

                                                    Sorry, your browser doesn't support embedded videos.
                                                </video> */}

                                           <iframe src={chapter.video_url} title="W3Schools Free Online Web Tutorials"></iframe>


                                            </td> {/* video is pending we will deal with this later */}
                                            <td> {chapter.remarks}  </td>
                                            <td>
                                            <Link to={'/teacher-edit-chapter/' + chapter.id } className='btn btn-info  btn-sm m-2' > <i class="bi bi-pencil-square"></i> </Link> 
                                                <button onClick={()=> handleDelete(chapter.id)} to={'/delete-chapter/' + chapter.id } className='btn btn-danger btn-sm m-2' > <i class="bi bi-trash"></i> </button>
                                                
                                            </td>

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

export default CourseChapter;
