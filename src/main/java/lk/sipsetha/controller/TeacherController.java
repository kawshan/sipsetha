package lk.sipsetha.controller;

import lk.sipsetha.dao.TeacherDao;
import lk.sipsetha.dao.TeacherStatusDao;
import lk.sipsetha.dao.UserDao;
import lk.sipsetha.entity.Teacher;
import lk.sipsetha.entity.TeacherStatus;
import lk.sipsetha.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping(value = "/teacher")
public class TeacherController {

    @Autowired
    private TeacherDao dao;

    @Autowired
    private TeacherStatusDao teacherStatusDao;

    @Autowired
    private PrivilegeController privilegeController;

    @Autowired
    private UserDao userDao;

    @GetMapping(value = "/findall")
    public List<Teacher> getAllTeacher(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String,Boolean> getLoggedUserPrivilege = privilegeController.getPrivilegeByUserModule(auth.getName(),"teacher");
        if (!getLoggedUserPrivilege.get("select")){
            return null;
        }
        return  dao.findAll(Sort.by(Sort.Direction.DESC,"id"));
    }

    @GetMapping(value = "/teacherform")
    public ModelAndView teacherView(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User loggedUser=userDao.getUserByUserName(auth.getName());
        ModelAndView teacherUI = new ModelAndView();
        teacherUI.setViewName("teacher.html");
        teacherUI.addObject("loggedusername",auth.getName());
        teacherUI.addObject("loggeduserrole",loggedUser.getRoles().iterator().next().getName());
        teacherUI.addObject("loggeduserphoto",loggedUser.getUserphoto());
        teacherUI.addObject("title","teacher management ui");
        return teacherUI;
    }

    @DeleteMapping
    public String deleteTeacher(@RequestBody Teacher teacher){
        //authentication and authorization
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String,Boolean> getLoggedUserModule = privilegeController.getPrivilegeByUserModule(auth.getName(), "teacher");
        if (!getLoggedUserModule.get("delete")){
            return "cannot perform delete you don't have privileges";
        }
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
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String,Boolean> getLoggedUSerPrivilege = privilegeController.getPrivilegeByUserModule(auth.getName(),"teacher");
        if (!getLoggedUSerPrivilege.get("insert")){
            return "cannot perform insert .....  you don't have privileges";
        }
        //existing
        Teacher exTeacherNic=dao.getTeacherByNic(teacher.getNic());
        if (exTeacherNic!=null){
            return "Cannot perform teacher save. teacher's nic already exists";
        }

        Teacher exTeacherEmail = dao.getTeacherByEmail(teacher.getEmail());
        if (exTeacherEmail!=null){
            return "cannot perform teacher save. teacher email already exists";
        }

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
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String,Boolean> getLoggedUserPrivilege = privilegeController.getPrivilegeByUserModule(auth.getName(), "teacher");
        if (!getLoggedUserPrivilege.get("update")){
            return "cannot perform modify teacher ... you don't have privileges";
        }
        //existing and duplicate
        //operator
        try {
            dao.save(teacher);
            return "ok";
        }catch (Exception e){
            return "teacher modify not complete"+e.getMessage();
        }
    }


    @GetMapping(value = "/toverifyexistence/{nic}")
    public Boolean checkTeacherNicExistence(@PathVariable("nic")String nic){
        Teacher exTeacherNic = dao.getTeacherByNic(nic);
        if (exTeacherNic!=null){
            return true;
        }else {
            return false;
        }
    }



}
