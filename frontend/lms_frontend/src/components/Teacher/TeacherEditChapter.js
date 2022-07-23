import { Link, useParams } from 'react-router-dom'
import Sidebar from './TeacherSidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api'


function EditChapter() {

    const [chapterData, setChapterData] = useState({
        //the names that we write on these section is not that important
        // title: '',
        // description: '',
        // video: '',
        // remarks: ''
    })

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

    const { chapter_id } = useParams();           //the 'chapter_id' should be the same name that we have given in the main.js file

    var course_idd = 1         //this is my own code I have stored the course id in local storage. you can look below axios. but if we use course_id with var then the result is not coming.
    course_idd = localStorage.getItem('course_idd')

    const _formData = null
    const formSubmit = () => {                     //************** the key point to note here is if we don't give the name is append as exactly the same name as per seializer of backend then the response will be having a null values so be careful
        const _formData = new FormData();
        console.log('form course id is ', course_idd)
        _formData.append('course', course_idd);
        _formData.append('chapter', chapter_id);
        _formData.append('title', chapterData.title);
        _formData.append('description', chapterData.description);
        _formData.append('video', chapterData.video, chapterData.video.name); //have to do some research on this syntax on how to upload images
        _formData.append('remarks', chapterData.remarks);

        console.log('submit button on', formSubmit)

        try {
            axios.put(baseUrl + '/edit-chapter/' + chapter_id, _formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }).then((res) => {
                console.log(res.data)
                window.location.href = '/teacher-mycourses'
            });
        } catch (error) {
            console.log(error)
        }

    }


    useEffect(() => {
        document.title = 'Edit chapter'

        try {
            axios.get(baseUrl + '/edit-chapter/' + chapter_id).then((res) => {
                console.log(res.data)
                setChapterData(res.data)
                // course_id =res.data.course
                // console.log('this is course id',course_id,typeof course_id)
                localStorage.setItem('course_idd', res.data.course)
            })
        } catch (error) {
            console.log(error)
        }

    }, [])



    return (
        <div className='container mt-4' >
            <div className='row' >
                <aside className='col-md-3' >
                    <Sidebar />
                </aside>
                <section className='col-md-9' >
                    <div className='card' >
                        <h5 className='card-header' > Update Chapter </h5>
                        <div className='card-body' >


                            <div class="mb-3 row">
                                <label for="staticEmail" class="col-sm-2 col-form-label"> Title </label>
                                <div class="col-sm-10">
                                    <input onChange={handleChange} name='title' value={chapterData.title} type="text" readonly class="form-control" id="staticEmail" />
                                </div>
                            </div>
                            <div class="mb-3 row">
                                <label for="staticEmail" class="col-sm-2 col-form-label"   > Description </label>
                                <div class="col-sm-10">
                                    <input onChange={handleChange} name='description' value={chapterData.description} type="text" readonly class="form-control" id="staticEmail" />
                                </div>
                            </div>
                            <div class="mb-3 row">
                                <label for="staticEmail" class="col-sm-2 col-form-label"> video </label>
                                <div class="col-sm-10">
                                    <input onChange={handleFileChange} name='video' type="file" readonly class="form-control" id="staticEmail" />
                                    <video controls width="250">

                                        <source src={chapterData.video} type="video/webm" />

                                        <source src={chapterData.video} type="video/mp4" />

                                        Sorry, your browser doesn't support embedded videos.
                                    </video>
                                </div>
                            </div>


                            <div class="mb-3 row">
                                <label for="staticEmail" class="col-sm-2 col-form-label"> Remarks </label>
                                <div class="col-sm-10">
                                    <input onChange={handleChange} name='remarks' value={chapterData.remarks} type="text" readonly class="form-control" placeholder='This video is focused on django rest framework' id="staticEmail" />
                                </div>
                            </div>

                            <hr />
                            <button type='button' onClick={formSubmit} className='btn btn-primary'>Submit</button>

                        </div>
                    </div>

                </section>
            </div>
        </div>
    );
}

export default EditChapter;