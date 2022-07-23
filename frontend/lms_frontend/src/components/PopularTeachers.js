import { Link } from 'react-router-dom'
import {useEffect,useState} from 'react'       //useEffect will work in cases(while loadin,update,after loading ) useState will preserve the data of variable if the data is changed then it will take charge 
import axios from 'axios'                      //package which is helpful to send the http request to the server

const baseUrl='http://127.0.0.1:8000/api'   //in the base url we will provide the url which backend is running
function PopularTeachers() {
    const [teacher,setTeacher] = useState(null)    //teacher is the variable, setTeacher is the array which will preserve the data/ change the data in our teacher variable ,,,, the null inside setState means by default the teacher data is null
    useEffect(()=>{      //whenever the component is loaded we have make request to the server
        axios.get(baseUrl+'/teacher/').then((response)=>{       
            setTeacher(response.data);                      //here the infinite rendering of useeffect is taking place because the setTeacher array is updating with each request and working which means changing  which results in infinite loop to prevent this [] is used
           
        })
    },[])           //the [] is used in order to make the effect of component did mount
    console.log(teacher)
    return (
        <div className="container mt-4">
            {/* latest courses starts here */}
            <h3 className=" pb-1 mb-2" >Popular Teachers  <Link to='/AllCourses' className="float-end" >See All</Link> </h3>
            <div className="row" >
                <div className="col-md-3 " >
                    <div className="card" >
                        <Link to="/detail/1" >  <img src="logo512.png" className="card-img-top" alt="..." /> </Link>
                        <div className="card-body">
                            <h5 className="card-title">  <Link to="/teacher-details/1" >  Teacher Name </Link>  </h5>
                        </div>

                        <div className='card-footer' >
                            <div className='title' >
                               <span>Rating : 4.6/5</span>
                               
                            </div>
                        </div>

                    </div>
                </div>

                <div className="col-md-3 " >
                    <div className="card" >
                        <img src="logo512.png" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">  <Link to="/teacher-details/1" >  Teacher Name </Link>   </h5>
                        </div>

                        <div className='card-footer' >
                            <div className='title' >
                               <span>Rating : 4.6/5</span>
                               
                            </div>
                        </div>

                    </div>
                </div>

                <div className="col-md-3 " >
                    <div className="card" >
                        <img src="logo512.png" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">  <Link to="/teacher-details/1" >  Teacher Name </Link>   </h5>
                        </div>

                        <div className='card-footer' >
                            <div className='title' >
                               <span>Rating : 4.6/5</span>
                               
                            </div>
                        </div>

                    </div>
                </div>

                <div className="col-md-3 " >
                    <div className="card" >
                        <img src="logo512.png" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">  <Link to="/teacher-details/1" >  Teacher Name </Link>   </h5>
                        </div>

                        <div className='card-footer' >
                            <div className='title' >
                               <span>Rating : 4.6/5</span>
                               
                            </div>
                        </div>

                    </div>
                </div>


                <div className="col-md-3 mt-4  " >
                    <div className="card" >
                        <img src="logo512.png" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">  <Link to="/teacher-details/1" >  Teacher Name </Link>   </h5>
                        </div>

                        <div className='card-footer' >
                            <div className='title' >
                               <span>Rating : 4.6/5</span>
                               
                            </div>
                        </div>

                    </div>
                </div>



                <div className="col-md-3 mt-4  " >
                    <div className="card" >
                        <img src="logo512.png" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">  <Link to="/teacher-details/1" >  Teacher Name </Link>   </h5>
                        </div>

                        <div className='card-footer' >
                            <div className='title' >
                               <span>Rating : 4.6/5</span>
                               
                            </div>
                        </div>

                    </div>
                </div>



                <div className="col-md-3 mt-4" >
                    <div className="card" >
                        <img src="logo512.png" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">  <Link to="/teacher-details/1" >  Teacher Name </Link>   </h5>
                        </div>

                        <div className='card-footer' >
                            <div className='title' >
                               <span>Rating : 4.6/5</span>
                               
                            </div>
                        </div>

                    </div>
                </div>


                <div className="col-md-3 mt-4 " >
                    <div className="card" >
                        <img src="logo512.png" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">  <Link to="/teacher-details/1" >  Teacher Name </Link>   </h5>
                        </div>

                        <div className='card-footer' >
                            <div className='title' >
                               <span>Rating : 4.6/5</span>
                               
                            </div>
                        </div>

                    </div>
                </div>


 

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

export default PopularTeachers;