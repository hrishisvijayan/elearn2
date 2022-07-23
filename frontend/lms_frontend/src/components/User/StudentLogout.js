function StudentLogout(){
    localStorage.removeItem('studentLoginStatus')
    window.location.href='/login';
    return(
        <div></div>
    );
}

export default StudentLogout;