from rest_framework import serializers
from . import models

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Teacher
        fields=['id','full_name','email','password','qualification','mobile_no','skills']




class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CourseCategory
        fields=['id','title','description']

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Course
        fields=['id','category','teacher','title','description','featured_img','techs','course_chapters','related_videos','tech_list','total_enrolled_students']     #this course chapter is used here for models relatd name in models of chapter so that we can get all the chapters under this course even though the models of course is not having chapters.
        depth=1


class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Chapter
        fields=['id','course','title','description','video_url','remarks']


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Student
        fields=['id','full_name','email','password','qualification','mobile_no','address','interested_categories']


class StudentCourseEnrollSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.StudentCourseEnrollment
        fields=['id','course','student','enrolled_time']
        depth = 1

