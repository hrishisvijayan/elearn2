import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'


const baseURL = 'http://127.0.0.1:8000/api/'

function TeacherDetails() {

    const { teacher_id } = useParams()

    const [course, setCourse] = useState([])


    useEffect(() => {
        document.title = "Teacher Details"
        console.log('this is teacher id', teacher_id)
        try {
            axios.get(baseURL + 'teacher-courses/' + teacher_id).
                then((res) => {
                    console.log('this is response ', res.data)
                    setCourse(res.data);
                })
        } catch (error) {
            console.log(error)
        }

    }, [])


    return (
        <div className='container mt-3'>
            <div className='row'>
                <div className='col-4'>
                    <img src="/logo512.png" className="img-thumbnail" alt="Teacher Image" />
                </div>
                <div className='col-8 '>
                    <h3> Dennis Ivanov </h3>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        It has survived not only five centuries, but also the leap into electronic typesetting,
                        remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
                        sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
                        Aldus PageMaker including versions of Lorem Ipsum.</p>
                    <p className='fw-bold'>
                        Skills:
                        <Link to="/Category/Python">
                            Python
                        </Link>,
                        <Link to="/teacher-details/1">
                            JavaScript
                        </Link>,
                        <Link to="/teacher-details/1">
                            Php
                        </Link>
                    </p>
                    <p className='fw-bold'>
                        Recent Course: <Link to="/teacher-details/1">
                            ReactJS course
                        </Link>
                    </p>

                    <p className='fw-bold'>
                        Rating: 4.5/5
                    </p>
                </div>
            </div>
            {/* course videos */}
            <div className="card" >
                <div className="card-header">
                    <h3> Course Videos </h3>
                </div>

                

                {course && course.map((course, index) =>
                    <div className="list-group list-group-flush">

                        <Link to={`/detail/${course.id}`} className="list-group-item list-group-item-action" > { course.title     } </Link>

                    </div>
                )}

            </div>



        </div>
    )
}

export default TeacherDetails; 