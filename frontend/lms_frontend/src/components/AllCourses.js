import { Link } from 'react-router-dom'
import {useState,useEffect} from 'react';
import axios from 'axios'

const baseUrl= 'http://127.0.0.1:8000/api'


function AllCourses() {

    const [courseData,setCourseData]=useState([]);

    //fetch course when page is loading
    useEffect(()=>{
        document.title='All Courses'
        try{
            axios.get(baseUrl+'/course/').then((res)=>{
                console.log(res.data)
                setCourseData(res.data);
        })
    }catch(error){
        console.log(error)
    }
    },[]);




    return (
        <div className="container mt-4">
            {/* latest courses starts here */}
            <h3 className=" pb-1 mb-2" >Latest Courses  <Link to='/AllCourses' className="float-end" >See All</Link> </h3>
            <div className="row" >

                {courseData && courseData.map((course,index)=>
                <div className="col-md-3 " >
                    <div className="card" >
                        <Link to={`/detail/${course.id}}`} >  <img src={course.featured_img} className="card-img-top" alt={course.title} /> </Link>
                        <div className="card-body">
                            <h5 className="card-title">  <Link to={`/detail/${course.id}}`} >  {course.title} </Link>  </h5>        {/* here the $ symbol is used to make the id dynamic */}
                        </div>
                    </div>
                </div>
                )}
                
 

            </div>
            {/* latest courses ends here */}

            {/* pagination starts here   */}
            <nav aria-label="Page navigation example " >
                <ul className="pagination mt-4 justify-content-center">
                    <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item"><a className="page-link" href="#">Next</a></li>
                </ul>
            </nav>

            {/* pagination ends here      */}

        </div>
    )
}

export default AllCourses;