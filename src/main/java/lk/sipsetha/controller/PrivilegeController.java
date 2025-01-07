package lk.sipsetha.controller;

import lk.sipsetha.dao.PrivilegeDao;
import lk.sipsetha.entity.Privilege;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping(value = "/privilege")
public class PrivilegeController {
    @Autowired
    private PrivilegeDao privilegeDao;

    @GetMapping(value = "/privilegeform")
    public ModelAndView privilegeUI(){
        ModelAndView privilegeView = new ModelAndView();
        privilegeView.setViewName("privilege.html");
        return privilegeView;
    }

    @GetMapping(value = "/findall")
    public List<Privilege> privilegeFindAll(){
        return privilegeDao.findAll();
    }

    @DeleteMapping
    public String deletePrivilege(@RequestBody Privilege privilege){
        //authentication and authorization
        //hard delete
        //soft delete
        try {
            privilegeDao.delete(privilege);
            return "ok";
        }catch (Exception e){
            return "delete not completed "+e.getMessage();
        }

    }

}

