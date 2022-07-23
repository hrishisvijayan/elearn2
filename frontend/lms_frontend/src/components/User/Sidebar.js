import {Link}  from 'react-router-dom'


function Sidebar() {
    return (
        <div className='card' >
            <h5 className='card-header' >Dashboard</h5>
            <div className='list-group list-group-flush' >
                <Link to='/mycourses' className='list-group-item list-group-item-action' >My courses</Link>
                <Link to='/favourite' className='list-group-item list-group-item-action' >Favourite Courses</Link>
                <Link to='/recommended' className='list-group-item list-group-item-action' > Recommended Courses </Link>
                <Link to='/profilesetting' className='list-group-item list-group-item-action' > Profile Setting </Link>
                {/* <Link to='/changepassword' className='list-group-item list-group-item-action' > Change Password </Link> */}
                <Link to='/login' className='list-group-item list-group-item-action text-danger' > Logout </Link>
            </div>
        </div>
    )
}

export default Sidebar;