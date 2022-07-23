import { useEffect } from 'react';
import { Link } from 'react-router-dom'



function Header() {


  useEffect(() => {
    document.title = 'Teacher Login'
    console.log('how are you', localStorage.teacherLoginStatus)
  })

  return (
    <nav className="navbar navbar-expand-lg bg-dark">
      <div className="container">
        <Link to="/" style={{ textDecoration: 'none' }} > <a className="navbar-brand " style={{ color: "white" }} href="#">ELEARN</a> </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" style={{ textDecoration: 'none' }} > <a className="nav-link active" style={{ color: "white" }} aria-current="page" href="#">Home</a>  </Link>
            </li>
            <li className="nav-item">
              <Link to='/AllCourses' className="nav-link" style={{ color: "white" }} >Courses</Link>
            </li>



            <li className="nav-item">
              <div className="dropdown">
                <a className="btn text-white" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                  Teacher
                </a>

                <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  {localStorage.teacherLoginStatus !== 'true' &&
                    <>
                      <li>
                        <Link to="/teacher-login" style={{ textDecoration: 'none' }} > <a className="nav-link disabled text-dark" style={{ color: "white" }} > Teacher Login </a> </Link>
                      </li>
                      <li>
                        <Link to="/teacher-register" style={{ textDecoration: 'none' }} > <a className="nav-link disabled text-dark" style={{ color: "white" }} > Teacher Register </a> </Link>
                      </li>
                    </>
                  }
                  <li>
                    <Link to="/teacher-dashboard" style={{ textDecoration: 'none' }} > <a className="nav-link disabled text-dark" style={{ color: "white" }} > Teacher Dashboard </a> </Link>
                  </li>
                  <li>
                    <Link to="/teacher-logout" style={{ textDecoration: 'none' }} > <a className="nav-link disabled text-dark" style={{ color: "white" }} > Teacher Logout </a> </Link>
                  </li>

                </ul>
              </div>
            </li>



            <li className="nav-item">
              <div className="dropdown">
                <a className="btn text-white" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                  User
                </a>

                {/* <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <li> 
                    <Link to="/login" style={{ textDecoration: 'none' }} > <a className="nav-link disabled text-dark" style={{ color: "white" }} > User Login </a> </Link>
                   </li>
                  <li>
                  <Link to="/register" style={{ textDecoration: 'none' }} > <a className="nav-link disabled text-dark" style={{ color: "white" }} > User Register </a> </Link>
                  </li>
                  <li>
                  <Link to="/dashboard" style={{ textDecoration: 'none' }} > <a className="nav-link disabled text-dark" style={{ color: "white" }} > Dashboard </a> </Link>
                  </li>
                  <li>
                  <Link to="/register" style={{ textDecoration: 'none' }} > <a className="nav-link disabled text-dark" style={{ color: "white" }} > Logout </a> </Link>
                  </li>
                  
                </ul> */}

                <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  {localStorage.studentLoginStatus !== 'true' &&
                    <>
                      <li>
                        <Link to="/login" style={{ textDecoration: 'none' }} > <a className="nav-link disabled text-dark" style={{ color: "white" }} > User Login </a> </Link>
                      </li>
                      <li>
                        <Link to="/register" style={{ textDecoration: 'none' }} > <a className="nav-link disabled text-dark" style={{ color: "white" }} > User Register </a> </Link>
                      </li>
                    </>
                  }
                  <li>
                    <Link to="/dashboard" style={{ textDecoration: 'none' }} > <a className="nav-link disabled text-dark" style={{ color: "white" }} > User Dashboard </a> </Link>
                  </li>
                  <li>
                    <Link to="/student-logout" style={{ textDecoration: 'none' }} > <a className="nav-link disabled text-dark" style={{ color: "white" }} > User Logout </a> </Link>
                  </li>

                </ul>
              </div>
            </li>

            <li className="nav-item">
              <Link to="/about" style={{ textDecoration: 'none' }} > <a className="nav-link disabled" style={{ color: "white" }} >About Us</a> </Link>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>

  );
}

export default Header;