package lk.sipsetha.controller;

import lk.sipsetha.dao.TeacherDao;
import lk.sipsetha.dao.TeacherStatusDao;
import lk.sipsetha.entity.Teacher;
import lk.sipsetha.entity.TeacherStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping(value = "/teacher")
public class TeacherController {

    @Autowired
    private TeacherDao dao;

    @Autowired
    private TeacherStatusDao teacherStatusDao;

    @GetMapping(value = "/findall")
    public List<Teacher> getAllTeacher(){
        return  dao.findAll();
    }

    @GetMapping(value = "/teacherform")
    public ModelAndView teacherView(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        ModelAndView teacherUI = new ModelAndView();
        teacherUI.setViewName("teacher.html");
        teacherUI.addObject("loggedusername",auth.getName());
        teacherUI.addObject("title","teacher management ui");
        return teacherUI;
    }

    @DeleteMapping
    public String deleteTeacher(@RequestBody Teacher teacher){
        //authentication and authorization
        //existing
        //operator
        try {
            TeacherStatus deleteStatus = teacherStatusDao.getReferenceById(3);
            teacher.setTeacherstatus_id(deleteStatus);
            dao.save(teacher);
            return "ok";
        }catch (Exception e){
            return "teacher delete not complete "+e.getMessage();
        }
    }

    @PostMapping
    public String saveTeacher(@RequestBody Teacher teacher){
        //authentication and authorization
        //existing
        //operator
        try {
            String teacherNextNumber = dao.getTeacherNextNumber();
            if (teacherNextNumber.equals(null) || teacherNextNumber.equals("") ){
                teacher.setTeachernum("00001");
            }else {
                teacher.setTeachernum(teacherNextNumber);
            }
            dao.save(teacher);
            return "ok";
        }catch (Exception e){
            return "teacher save not completed"+e.getMessage();
        }
    }

    @PutMapping
    public String modifyTeacher(@RequestBody Teacher teacher){
        //authentication and authorization
        //existing and duplicate
        //operator
        try {
            dao.save(teacher);
            return "ok";
        }catch (Exception e){
            return "teacher modify not complete"+e.getMessage();
        }
    }



}
