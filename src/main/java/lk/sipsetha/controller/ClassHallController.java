package lk.sipsetha.controller;

import lk.sipsetha.dao.ClassHallDao;
import lk.sipsetha.dao.ClassHallStatusDao;
import lk.sipsetha.entity.ClassHall;
import lk.sipsetha.entity.ClassHallStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping(value = "/classhall")
public class ClassHallController {

    @Autowired
    private ClassHallDao dao;

    @Autowired
    private ClassHallStatusDao classHallStatusDao;

    @Autowired
    private PrivilegeController privilegeController;

    @GetMapping(value = "/findall")
    //authentication and authorization
    public List<ClassHall> findAll(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String,Boolean> getLoggedUserPrivilege = privilegeController.getPrivilegeByUserModule(auth.getName(), "classhall");
        if (!getLoggedUserPrivilege.get("select")){
            return null;
        }
        return dao.findAll();
    }

    @GetMapping(value = "/classhallform")
    public ModelAndView getClassHallView(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        ModelAndView classHallUI = new ModelAndView();
        classHallUI.setViewName("classhall.html");
        classHallUI.addObject("loggedusername",auth.getName());
        classHallUI.addObject("title","class hall management ui");
        return classHallUI;
    }
    @DeleteMapping
    public String deleteClassHall(@RequestBody ClassHall classHall){

        //authentication and authorization
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String,Boolean> getLoggedUserPrivileges = privilegeController.getPrivilegeByUserModule(auth.getName(), "classhall");
        if (!getLoggedUserPrivileges.get("delete")){
            return "cannot perform delete class hall ....you dont have privileges";
        }
        //existing

        try {
            ClassHallStatus deleteStatus = classHallStatusDao.getReferenceById(3);
            classHall.setClasshallstatus_id(deleteStatus);
            dao.save(classHall);
            return "ok";
        }catch (Exception e){
            return "class hall delete not complete"+e.getMessage();
        }
    }

    @PutMapping
    public String updateClassHall(@RequestBody ClassHall classHall){
        //authentication and authorization
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String,Boolean> getLoggedUserPrivilege = privilegeController.getPrivilegeByUserModule(auth.getName(), "classhall");
        if (!getLoggedUserPrivilege.get("update")){
            return "cannot perform update class hall .. you don't have privileges";
        }
        //existing
        try {
            dao.save(classHall);
            return "ok";
        }catch (Exception e){
            return "class hall update not complete"+e.getMessage();
        }
    }

    @PostMapping
    public String submitClassHall(@RequestBody ClassHall classHall){
        //authentication and authorization
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String,Boolean> getLoggedUserPrivilege = privilegeController.getPrivilegeByUserModule(auth.getName(), "classhall");
        if (!getLoggedUserPrivilege.get("insert")){
            return "cannot perform save class hall .. you don't have privileges";
        }
        try {
            classHall.setAddeddatetime(LocalDateTime.now());
//            classHall.setAddeduserid();
            dao.save(classHall);
            return "ok";
        }catch (Exception e){
            return "class hall submit not complete"+e.getMessage();
        }
    }


}
