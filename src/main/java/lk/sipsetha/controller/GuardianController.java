package lk.sipsetha.controller;

import lk.sipsetha.dao.GuardianDao;
import lk.sipsetha.dao.UserDao;
import lk.sipsetha.entity.Guardian;
import lk.sipsetha.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping(value = "/guardian")
public class GuardianController {

    @Autowired
    private GuardianDao guardianDao;

    @Autowired
    private PrivilegeController privilegeController;

    @Autowired
    private UserDao userDao;

    @GetMapping(value = "/findall")
    public List<Guardian> guardianFindAll(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String,Boolean> getLoggedUserPrivilege = privilegeController.getPrivilegeByUserModule(auth.getName(), "guardian");
        if (!getLoggedUserPrivilege.get("select")){
            return null;
        }
        return guardianDao.findAll(Sort.by(Sort.Direction.DESC,"id"));
    }

    @GetMapping(value = "/guardianform")
    public ModelAndView guardianView(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User loggedUser=userDao.getUserByUserName(auth.getName());
        ModelAndView guardianUI = new ModelAndView();
        guardianUI.setViewName("guardian.html");
        guardianUI.addObject("title","guardian management");
        guardianUI.addObject("loggedusername",auth.getName());
        guardianUI.addObject("loggeduserrole",loggedUser.getRoles().iterator().next().getName());
        guardianUI.addObject("loggeduserphoto",loggedUser.getUserphoto());
        return guardianUI;
    }

    @PutMapping
    public String guardianUpdate(@RequestBody Guardian guardian){
        //authentication and authorization
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String,Boolean> getLoggedUserPrivileges = privilegeController.getPrivilegeByUserModule(auth.getName(), "guardian");
        if (!getLoggedUserPrivileges.get("update")){
            return "cannot perform update guardian .. you don't have privileges";
        }
        //check existance
        //try catch
        try {
            //auto set values
            guardian.setModifydatetime(LocalDateTime.now());
            //operator
            guardianDao.save(guardian);
            return "ok";
        }catch (Exception e){
            return "error happened"+e.getMessage();
        }




    }

    @DeleteMapping
    public String deleteGuardian(@RequestBody Guardian guardian){
        //authentication and authorization
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String,Boolean> getLoggedUserPrivileges = privilegeController.getPrivilegeByUserModule(auth.getName(), "guardian");
        if (!getLoggedUserPrivileges.get("delete")){
            return "cannot perform delete guardian .. you don't have privileges";
        }
        //check existing
        //try catch
        //auto set values
        //operator
        try {
            guardian.setDeletedatetime(LocalDateTime.now());
            guardian.setStatus(false);
            guardianDao.save(guardian);
            return "ok";
        }catch (Exception e){
            return "cannot delete"+e.getMessage();
        }
    }

    @PostMapping
    public String saveGuardian(@RequestBody Guardian guardian){
        //authentication and authorization
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String,Boolean> getLoggedUserPrivilege = privilegeController.getPrivilegeByUserModule(auth.getName(),"guardian");
        if (!getLoggedUserPrivilege.get("insert")){
            return "cannot perform save guardian... you dont have privileges";
        }


        try {

            Guardian extGuardianNic = guardianDao.getGuardianByByNic(guardian.getNic());
            if (extGuardianNic!=null){
                return "cannot save guardian.. guardian's nic is already exists";
            }else {

            }

            Guardian extGuardianMobile =guardianDao.getExistenceByMobile(guardian.getMobile());
            if (extGuardianMobile!=null){
                return "cannot perform save guardian.. guardian mobile number is already exists";
            }


            guardian.setUser_id(userDao.getUserByUserName(auth.getName()));
            guardian.setAddeddatetime(LocalDateTime.now());
            guardianDao.save(guardian);
            return "ok";
        }catch (Exception e){
            return "guardian submit not completed "+e.getMessage();
        }

    }


    @GetMapping(value = "/toverifyexistence/{nic}")
    public Boolean getNicForExistingValidation(@PathVariable("nic")String nic){
        Guardian exGuardianNic=guardianDao.getGuardianByByNic(nic);
        if (exGuardianNic!=null){
            return true;
        }else {
            return false;
        }

    }

    @GetMapping(value = "/getmobilebynic/{nic}")
    public String getGuardiansMobileByNic(@PathVariable("nic") String nic){
        return guardianDao.getMobileByGuardianNic(nic);
    }

    @GetMapping(value = "/getaddressbynic/{nic}")
    public String getGuardiansAddressByNic(@PathVariable("nic")String nic){
        return guardianDao.getAddressByNic(nic);
    }

    @GetMapping(value = "/existancebymobile/{mobile}")
    public Boolean getExistanceByMobile(@PathVariable("mobile")String mobile){
        Guardian exGuardianByMobile =guardianDao.getExistenceByMobile(mobile);
        if (exGuardianByMobile!=null){
            return true;
        }else {
            return false;
        }
    }

}
