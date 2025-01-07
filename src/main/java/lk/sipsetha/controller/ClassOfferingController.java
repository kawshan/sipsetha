package lk.sipsetha.controller;

import lk.sipsetha.dao.ClassOfferingDao;
import lk.sipsetha.entity.ClassOffering;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping(value = "/classoffering")
public class ClassOfferingController {

    @Autowired
    private ClassOfferingDao dao;

    @Autowired
    private PrivilegeController privilegeController;

    @GetMapping(value = "/findall")
    public List<ClassOffering> getAllClassOffering(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String,Boolean> getLoggedUserPrivileges = privilegeController.getPrivilegeByUserModule(auth.getName(), "classoffering");
        if (!getLoggedUserPrivileges.get("select")){
            return null;
        }
        return dao.findAll();
    }

    @GetMapping(value = "/classofferingform")
    public ModelAndView classOfferingView(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        ModelAndView classOfferingUI = new ModelAndView();
        classOfferingUI.setViewName("classoffering.html");
        classOfferingUI.addObject("loggedusername",auth.getName());
        classOfferingUI.addObject("title","class offering management");
        return classOfferingUI;
    }

    @DeleteMapping
    public String deleteClassOffering(@RequestBody ClassOffering classOffering){
        //authentication and authorization
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String,Boolean> getLoggedUserPrivileges = privilegeController.getPrivilegeByUserModule(auth.getName(), "classoffering");
        if (!getLoggedUserPrivileges.get("delete")){
            return "cannot perform delete class offerings.. you don't have privileges";
        }
        //existing check
//        operator
        try {
            dao.delete(classOffering);
            return "ok";
        }catch (Exception e){
            return "class offering delete not successful "+e.getMessage();
        }
    }

    @PostMapping
    public String saveClassOffering(@RequestBody ClassOffering classOffering){
        //authentication and authorization
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String,Boolean> getLoggedUserPrivileges = privilegeController.getPrivilegeByUserModule(auth.getName(), "classoffering");
        if (!getLoggedUserPrivileges.get("insert")){
            return "cannot perform save class offerings.. you don't have privileges";
        }
        //existing
        //operator
        try {
            classOffering.setAddeddatetime(LocalDateTime.now());
            dao.save(classOffering);
            return "ok";
        }catch (Exception e){
            return "class offering save not successful "+e.getMessage();
        }
    }
    @PutMapping
    public String modifyClassOffering(@RequestBody ClassOffering classOffering){
        //authentication and authorization
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String,Boolean> getLoggedUserPrivileges = privilegeController.getPrivilegeByUserModule(auth.getName(), "classoffering");
        if (!getLoggedUserPrivileges.get("update")){
            return "cannot perform update class offering .. you dont have privileges";
        }
        //existing and duplicate
        //operator
        try {
            dao.save(classOffering);
            return "ok";
        }catch (Exception e){
            return "class offering modify not successful"+e.getMessage();
        }

    }

}
