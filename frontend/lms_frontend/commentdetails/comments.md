1. first go to teacher details page to have an idea about how use state and use effect works and how request is send to the backend and things

2. then go to teacher register page and read the comments from there especially about hooks and spread operator

3. after register teache next work is done on teacher login page

4. after login completion category is added through django admin, and additional change is modification of add course which new module add chapter is inluded.
In the add course page we can get the categroy from backend.

5. after this we have to upload course image so we have to intall a package pip install pillow.

6. after that we have to fetch the uploaded content from the backend. for that we are making some changes in the backend, inorder to fetch the courses according to the teacher we are passing the id along with the boolean json response.
 and the id is received in the front end and we save the id in the local storage. you can check the login page.

7. In order to fetch images from the backend and display it on the front end we have to put media_url, media_root inside the settings.py folder in the backend. do some research on it.

 the process to display image is a big task changes have been done in the urls.py of the django main project folder not in the app urls.py folder, and some thing is added like 'static', you have to go there and read the comments. including the imported modules like 'os.path.something' understand why this these things are used and what is happening.


8. when we are adding the chapter we need to pass the id of the course dynaimically. for that we have to get the id from the url using 'useparams()' hook.
befor that we have to install 'react router dom' package. do some research on it.

9. spend some time on adding course and chapters working. In terms of what is happening in models and how the currect chapter is passed to the correct course

10. finished login page error message. for that to happen we have created a usestate and we created an error message which will store in to the state whenever bool : false is returned from the backend.

11. in order to display the video from the backend we have to input the video tag. 

12. in order to apply sweet alert first install it and import it in the component that you are going to apply it. sweet alert 2 is the installed version.

13. inorder to delete something then you have to use the special arrow function syntax. check the delete chapter componenent.

14. in the all courses section you can see passing the id using $ symbol and the change in '' to `` please note that.

15. inorder to show only 4 items of the latest course in the home page. we have make some change in the backend--- that we have to create a new def get queryset() and check the corresponding condition.the result with question mark is passed to the with

16. When we are working on the course detail page. when we make the changes in the serializer like depth=1 or depth =2.

17. related_name= is used in models inorder to get that in serializer. do some research on related name and depth.

18. still need to fix the url of the video uploading do what is needed. and get it on course detail and chapter page also.

19. inorder to show related courses we have to do changes on the backend in course models.model def related_courses.

20. we cannot access the image from the backend just like accessing it like .featured_img that we have done in the past. We have to use '$' along with 'siteurl and media'  refer the images.
  
  -- the lesson learned=> all the images are coming from the media folder from the backend and we can manipulate it by checking at the console.
  always remember the we have to use the '$' symbol to make the data dynamic otherwise we wont be able to do it.

21. target='__blank' is used to open the corresponding link in new tab.

22. 