# from unicodedata import category
from django.urls import path

# from django_lms.lms_api.main.models import Course, CourseCategory
from . import views


urlpatterns = [
    #teacher
    path('teacher/', views.TeachersList.as_view()),
    path('teacher/<int:pk>/', views.TeachersDetail.as_view()),
    path('teacher-login',views.teacher_login),
    #categroy 
    path('category/',views.CategoryList.as_view()),
    #course
    path('course/',views.CourseList.as_view()),
    #chapter
    path('chapter/',views.ChapterList.as_view()),
    

    # specific chapter (all the chapters under specific course) 
    path('course-chapter/<int:course_id>',views.CourseChapterList.as_view()),

    # the students under specific course
    path('course-student/<int:course_id>',views.CourseStudents.as_view()),

    #all course ratings
    path('course/course-rating/<int:course_id>',views.CourseRating.as_view()),


    #teacher Courses
    path('teacher-courses/<int:teacher_id>',views.TeacherCourseList.as_view()),

    path('teacher-edit-courses/<int:pk>',views.CourseUpdate.as_view()),

    path('edit-chapter/<int:pk>',views.ChapterSingle.as_view()),

    path('delete-chapter/<int:pk>',views.ChapterSingleDelete.as_view()),


    #student
     path('student/', views.StudentList.as_view()),
     path('student-login',views.student_login), 
     path('student/<int:pk>/', views.StudentDetail.as_view()),

     path('student-enroll-course/', views.StudentEnrollCourseList.as_view()),

     path('student-enroll-status/<int:student_id>/<int:course_id>',views.studentEnrollStatus),

     

]