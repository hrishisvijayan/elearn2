from unicodedata import category
from django.db import models
from django.core import serializers       #this is done for def related_videos
# Create your models here.


#Teacher model
class Teacher(models.Model):
    full_name=models.CharField(max_length=100)
    email=models.CharField(max_length=100)
    password=models.CharField(max_length=100)
    qualification=models.CharField(max_length=200,null=True)
    mobile_no = models.CharField(max_length=20)
    skills=models.TextField(max_length=200)

    class Meta:                #this meta is used inorder to modify the name of database during display in django admin page
        verbose_name_plural = "1. Teacher" 

#Course Category Model
class CourseCategory(models.Model):
    title = models.CharField(max_length=150)
    description = models.TextField()

    class Meta:                #this meta is used inorder to modify the name of database during display in django admin page
        verbose_name_plural = "2. Course Categories"         

    def __str__(self):         #to show the title name on admin page instead of objectid and name
        return self.title



#Course Model
class Course(models.Model):
    category = models.ForeignKey(CourseCategory,on_delete=models.CASCADE)    #here cascade so that if the course category is deleted then the the course is deleted
    teacher = models.ForeignKey(Teacher,on_delete=models.CASCADE) 
    title = models.CharField(max_length=150)
    description = models.TextField()
    featured_img=models.ImageField(upload_to='course_images/',null=True)     # for uploading images 
    techs=models.TextField(null=True)                                        # this null = true is for because it is a modification

    class Meta:                #this meta is used inorder to modify the name of database during display in django admin page
        verbose_name_plural = "3. Course " 

    def __str__(self):
        return self.title

    def related_videos(self):  #for showing the related videos in course details page
        related_videos = Course.objects.filter(techs__icontains=self.techs)
        return serializers.serialize('json',related_videos)


#Chapter Model --added new 
class Chapter(models.Model):  
    course = models.ForeignKey(Course,on_delete=models.CASCADE,related_name='course_chapters')    #here cascade so that if the course category is deleted then the the course is deleted
    title = models.CharField(max_length=150)
    description = models.TextField()
    # video=models.FileField(upload_to='chapter_videos/',null=True)         # for uploading video we should put field file in it. 
    video_url = models.URLField(max_length=100,null=True)
    remarks=models.TextField(null=True)                                        # this null = true is for because it is a modification.

    class Meta:                #this meta is used inorder to modify the name of database during display in django admin page
        verbose_name_plural = "4. Chapters " 
    def __str__(self):
        return self.title


#Student model
class Student(models.Model):
    full_name=models.CharField(max_length=100)
    email=models.CharField(max_length=100)
    password=models.CharField(max_length=100)
    qualification=models.CharField(max_length=200)
    mobile_no = models.CharField(max_length=20)
    address=models.TextField() 
    interested_categories=models.TextField() 


    class Meta:                #this meta is used inorder to modify the name of database during display in django admin page
        verbose_name_plural = "5. Student" 



