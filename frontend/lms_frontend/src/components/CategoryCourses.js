import { Link } from 'react-router-dom'

function CategoryCourses() {
    return (
        <div className="container mt-4">
            {/* latest courses starts here */}
            <h3 className=" pb-1 mb-2" > Web Development Courses  <Link to='/AllCourses' className="float-end" >See All</Link> </h3>
            <div className="row" >
                <div className="col-md-3 " >
                    <div className="card" >
                        <Link to="/detail/1" >  <img src="/logo512.png" className="card-img-top" alt="..." /> </Link>
                        <div className="card-body">
                            <h5 className="card-title">  <Link to="/detail/1" >  Course title </Link>  </h5>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 " >
                    <div className="card" >
                        <img src="/logo512.png" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title"> <a href="#"> Course title </a>  </h5>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 " >
                    <div className="card" >
                        <img src="/logo512.png" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title"> <a href="#"> Course title </a>  </h5>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 " >
                    <div className="card" >
                        <img src="/logo512.png" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title"> <a href="#"> Course title </a>  </h5>
                        </div>
                    </div>
                </div>


                <div className="col-md-3 mt-4  " >
                    <div className="card" >
                        <img src="/logo512.png" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title"> <a href="#"> Course title </a>  </h5>
                        </div>
                    </div>
                </div>



                <div className="col-md-3 mt-4  " >
                    <div className="card" >
                        <img src="/logo512.png" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title"> <a href="#"> Course title </a>  </h5>
                        </div>
                    </div>
                </div>



                <div className="col-md-3 mt-4" >
                    <div className="card" >
                        <img src="/logo512.png" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title"> <a href="#"> Course title </a>  </h5>
                        </div>
                    </div>
                </div>


                <div className="col-md-3 mt-4 " >
                    <div className="card" >
                        <img src="/logo512.png" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title"> <a href="#"> Course title </a>  </h5>
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

export default CategoryCourses;