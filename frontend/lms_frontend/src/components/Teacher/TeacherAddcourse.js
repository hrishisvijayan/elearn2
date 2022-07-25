import { Link } from 'react-router-dom'
import Sidebar from './TeacherSidebar';
import {useState,useEffect} from 'react';
import axios from 'axios';

const baseUrl= 'http://127.0.0.1:8000/api'

function TeacherFavourite() {
    const [cats,setCats]=useState([]);
    const [courseData,setCourseData]=useState({         
        category    : '',                             //the names that we write on these section is not that important
        title       : '',
        description : '',
        f_img       : '',
        techs       : ''
    })
    useEffect(()=>{
        try{
            axios.get(baseUrl+'/category').then((res)=>{
                    setCats(res.data );
            });
        }catch(error){
            console.log(error);
        }
    },[]);
   
    const handleChange=(event)=>{
        setCourseData({
            ...courseData,                        // it will input the data in to the coursedata array(spread orperator is used)
            [event.target.name]:event.target.value
        });
    }

    const handleFileChange=(event)=>{
        setCourseData({
            ...courseData,
            [event.target.name] : event.target.files[0]
        })
        console.log('image checking',courseData)
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


    console.log(cats)
    return (
       
        <div className='container mt-4' >
        <div className='row' >
            <aside className='col-md-3' >
                <Sidebar />
            </aside>
            <section className='col-md-9' >
                <div className='card' >
                    <h5 className='card-header' > Add Course </h5>
                    <div className='card-body' >


                        <div class="mb-3 row">
                            <label for="staticEmail"  class="col-sm-2 col-form-label"> Category </label>
                            <div class="col-sm-10">
                                <select name='category' className='form-control' onChange={handleChange}  >
                                    {cats.map((category,index)=>{return <option key={index} value={category.id}  > {category.title} </option>})}        {/* study this format clearly which is used to display the data from the backend be familar with it ---------even with out the index it will work but do some research on it          --- here the values is too important only if category.id is given we can put it in a category */}
                                </select>
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label for="staticEmail" class="col-sm-2 col-form-label"> Title </label>
                            <div class="col-sm-10">
                                <input onChange={handleChange} name='title' type="text" readonly class="form-control" id="staticEmail" />
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label for="staticEmail"  class="col-sm-2 col-form-label"> Description </label>
                            <div class="col-sm-10">
                                <input onChange={handleChange} name='description' type="text" readonly class="form-control" id="staticEmail" />
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label for="video" class="col-sm-2 col-form-label"> Course Image </label>
                            <div class="col-sm-10">
                                <input onChange={handleFileChange}  name='f_img' type="file" readonly class="form-control" id="video" />
                            </div>
                        </div>
                        

                        <div class="mb-3 row">
                            <label for="staticEmail" class="col-sm-2 col-form-label"> Technologies </label>
                            <div class="col-sm-10">
                                <input onChange={handleChange} name='techs' type="text" readonly class="form-control" placeholder='python,django,javascript,react' id="staticEmail" />
                            </div>
                        </div>

                        <hr />
                        <button  type='button' onClick={formSubmit} className='btn btn-primary'>Submit</button>

                    </div>
                </div>

            </section>
        </div>
    </div>
    )

}
export default TeacherFavourite;