import {Link} from 'react-router-dom'
 
function TeacherDetails(){
    return(
        <div className='container mt-3'>
            <div className='row'>
                <div className='col-4'>
                    <img src="/logo512.png" className="img-thumbnail" alt="Teacher Image"/>
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
                <div className="list-group list-group-flush">
                <Link to="/detail/1" className="list-group-item list-group-item-action" >Python Course 1</Link>
                <Link to="/detail/1" className="list-group-item list-group-item-action" >Python Course 2</Link>
                <Link to="/detail/1" className="list-group-item list-group-item-action" >JavaScript Course 1</Link>  
                <Link to="/detail/1" className="list-group-item list-group-item-action" >Php Course 1</Link>          
                        
                    
                   
                </div>
            </div>

            

        </div>
    )
}

export default TeacherDetails; 