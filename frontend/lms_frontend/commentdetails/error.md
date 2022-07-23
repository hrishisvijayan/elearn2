1. parsing error -syntax error
2. not defined   - not initialized the variable like const handlechange

3. network error -
   1. the backend may not be running so just run it.
   2. axios is not getting the response due to cross site origin policy. 
   so inorder to fix this you have to install corsheader and inlude it in apps and middleware and down below in setting you have to allow all origins or specific urls in it.

4. it may be difficult to upload the images for the first time in react. don't forget to add '' heders :{multipart form }'' and ''type=file'' and seperate handle file change is used in this project.
5. You can give values for the form corresponding to the requried like id for the category and things inside a form

6. **********the important thing ----  the things that we append in a form , names that we write in the left part is very important and should match with serializer values in the backend.

7. if the form data we have submitted is having a value in payload but null in preview or specificly showing required.
    then it means that the key values you have given during the appending is not matching the serializer values. 
    which means in NETWORK --- 
                              payload -> data that we are giving through the front end.
                              preview -> data coming from the backd
8. while uploading the image it is also important to focus on the syntax that we append in the form. you have to give the file, file name as well

9. do not put any variable declaration inside formdata submission fuction. it should be declared outside of the function.

10. react will show  BLANK PAGE and console will not show any error if 'useState[]' is like this or 'Link' is not given any to=''. 

11. Encountered an error while working with editing chapter. there I had to pass the course_id into the form data and I tried to get the response from the backend. but when I tried to assign it to variable like
var course_id = 1, re assigned it by course_id = res.data.course. in the axios. but still the var course id was taking the static value. 

I solved it in my own way by setting the variable inside the localstorage inside the axios.

12. error due to slash appending problem -- can be solved by adding '/' in the last. inside the axios.

