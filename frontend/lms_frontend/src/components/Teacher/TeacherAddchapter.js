import { Link } from 'react-router-dom'
import Sidebar from './TeacherSidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; //new --inorder to get the id of the course from the url and pass it dynamically to add chapter 

const baseUrl = 'http://127.0.0.1:8000/api'

function TeacherAddchapter() {
    const [cats, setCats] = useState([]);
    const [chapterData, setChapterData] = useState({
        //the names that we write on these section is not that important
        title: '',
        description: '',
        video: '',
        remarks: ''
    })
    useEffect(() => {
        try {
            axios.get(baseUrl + '/category').then((res) => {
                setCats(res.data);
            });
        } catch (error) {
            console.log(error);
        }
    }, []);

    const handleChange = (event) => {
        setChapterData({
            ...chapterData,                        // it will input the data in to the chapterData array(spread orperator is used)
            [event.target.name]: event.target.value
        });
    }

    const handleFileChange = (event) => {
        setChapterData({
            ...chapterData,
            [event.target.name]: event.target.files[0]
        })
        console.log('image checking', chapterData)
    }

    const { course_id } = useParams();           //the 'course_id' should be the same name that we have given in the main.js file

    const _formData = null
    const formSubmit = () => {                     //************** the key point to note here is if we don't give the name is append as exactly the same name as per seializer of backend then the response will be having a null values so be careful
        const _formData = new FormData();
        _formData.append('course', course_id);  //****** here the course id is made dynamic with the help of 'useparams()', so that we upload the chapters according to the course,,, and we are passing it from the main.js file's link address
        _formData.append('chapter', 1);
        _formData.append('title', chapterData.title);
        _formData.append('description', chapterData.description);
        // _formData.append('video', chapterData.video, chapterData.video.name); //have to do some research on this syntax on how to upload images
        _formData.append('video_url', chapterData.video_url);
        _formData.append('remarks', chapterData.remarks);

        console.log('submit button on', formSubmit)

        try {
            axios.post(baseUrl + '/chapter/', _formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }).then((res) => {
                console.log(res.data)
                window.location.href = '/teacher-mycourses/teacher-addchapter/74'
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
                        <h5 className='card-header' > Add Chapter </h5>
                        <div className='card-body' >


                            <div class="mb-3 row">
                                <label for="staticEmail" class="col-sm-2 col-form-label"> Title </label>
                                <div class="col-sm-10">
                                    <input onChange={handleChange} name='title' type="text" readonly class="form-control" id="staticEmail" />
                                </div>
                            </div>
                            <div class="mb-3 row">
                                <label for="staticEmail" class="col-sm-2 col-form-label"> Description </label>
                                <div class="col-sm-10">
                                    <input onChange={handleChange} name='description' type="text" readonly class="form-control" id="staticEmail" />
                                </div>
                            </div>
                            {/* <div class="mb-3 row">     it is commented because we are inputing video url from youtube instead of video itself
                                <label for="staticEmail" class="col-sm-2 col-form-label"> video </label>
                                <div class="col-sm-10">
                                    <input onChange={handleFileChange} name='video' type="file" readonly class="form-control" id="staticEmail" />
                                </div>
                            </div> */}

                            <div class="mb-3 row">
                                <label for="staticEmail" class="col-sm-2 col-form-label"> video URL </label>
                                <div class="col-sm-10">
                                    <input onChange={handleChange} name='video_url' type="url" readonly class="form-control" id="staticEmail" />
                                </div>
                            </div>


                            <div class="mb-3 row">
                                <label for="staticEmail" class="col-sm-2 col-form-label"> Remarks </label>
                                <div class="col-sm-10">
                                    <input onChange={handleChange} name='remarks' type="text" readonly class="form-control" placeholder='This video is focused on django rest framework' id="staticEmail" />
                                </div>
                            </div>

                            <hr />
                            <button type='button' onClick={formSubmit} className='btn btn-primary'>Submit</button>

                        </div>
                    </div>

                </section>
            </div>
        </div>
    )

}
export default TeacherAddchapter;