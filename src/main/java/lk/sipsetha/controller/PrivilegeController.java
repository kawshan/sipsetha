package lk.sipsetha.controller;

import lk.sipsetha.dao.PrivilegeDao;
import lk.sipsetha.dao.UserDao;
import lk.sipsetha.entity.Privilege;
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
@RequestMapping(value = "/privilege")
public class PrivilegeController {
    @Autowired
    private PrivilegeDao privilegeDao;

    @Autowired
    private UserDao userDao;

    @GetMapping(value = "/privilegeform")
    public ModelAndView privilegeUI(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User loggedUser=userDao.getUserByUserName(auth.getName());
        ModelAndView privilegeView = new ModelAndView();
        privilegeView.setViewName("privilege.html");
        privilegeView.addObject("title","privilege management");
        privilegeView.addObject("loggedusername",auth.getName());
        privilegeView.addObject("loggeduserrole",loggedUser.getRoles().iterator().next().getName());
        privilegeView.addObject("loggeduserphoto",loggedUser.getUserphoto());
        return privilegeView;
    }

    @GetMapping(value = "/findall",produces = "application/json")
    public List<Privilege> privilegeFindAll(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String,Boolean> logUserPrivilege = getPrivilegeByUserModule(auth.getName(), "privilege");
        if (!logUserPrivilege.get("select")){
            return null;
        }
        return privilegeDao.findAll(Sort.by(Sort.Direction.DESC,"id"));
    }

    @DeleteMapping
    public String deletePrivilege(@RequestBody Privilege privilege){
        //authentication and authorization
        Authentication auth =SecurityContextHolder.getContext().getAuthentication();
        HashMap<String,Boolean> logUserPrivilege =getPrivilegeByUserModule(auth.getName(), "privilege");
        if (!logUserPrivilege.get("delete")){
            return "cannot perform privilege delete.... you don't have privileges";
        }

        //existing check
        Privilege extPrivilege = privilegeDao.getReferenceById(privilege.getId());
        if (extPrivilege == null){
            return "cannot delete privilege. privilege does not exists";
        }

        //hard delete
        //soft delete
        try {
//            privilegeDao.delete(privilege);
            extPrivilege.setSel(false);
            extPrivilege.setInst(false);
            extPrivilege.setUpd(false);//in delete mapping
            extPrivilege.setDel(false);
            privilegeDao.save(extPrivilege);

            return "ok";
        }catch (Exception e){
            return "delete not completed "+e.getMessage();
        }

    }

    @PostMapping
    public String savePrivilege(@RequestBody Privilege privilege){
        //authentication and authorization
        Authentication auth =SecurityContextHolder.getContext().getAuthentication();
        HashMap<String,Boolean> getLogUserPrivilege =getPrivilegeByUserModule(auth.getName(), "privilege");
        if (!getLogUserPrivilege.get("insert")){
            return "cannot perform save privilege.... you don't have privileges";
        }
        //duplicate
        //operator
        try {
            privilegeDao.save(privilege);
            return "ok";
        }catch (Exception e){
            return "privilege save not complete"+e.getMessage();
        }
    }

    @PutMapping
    public String modifyPrivilege(@RequestBody Privilege privilege){
        //authentication and authorization
        Authentication auth =SecurityContextHolder.getContext().getAuthentication();
        HashMap<String,Boolean> getLogUserPrivileges = getPrivilegeByUserModule(auth.getName(),"privilege");
        if (!getLogUserPrivileges.get("update")){
            return "cannot perform update privileges... you don't have privileges";
        }
        //duplicate or existing
        //operator

        try {
            privilegeDao.save(privilege);
            return "ok";
        }catch (Exception e){
            return "modify privilege was not successful"+e.getMessage();
        }

    }

    //define function for get get logged user by module
    @GetMapping(value = "/byloggeduser/{modulename}",produces = "application/json")
    public HashMap<String,Boolean> getPrivilegeByLoggedUserModule(@PathVariable("modulename")String modulename){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return getPrivilegeByUserModule(auth.getName(),modulename);
    }

    //define function for get privilege by user module
    public HashMap<String,Boolean> getPrivilegeByUserModule(String username, String modulename){
        HashMap<String,Boolean> userPrivilege = new HashMap<String,Boolean>();
        if (username.equals("Admin")){
            userPrivilege.put("select",true);
            userPrivilege.put("insert",true);
            userPrivilege.put("update",true);
            userPrivilege.put("delete",true);
        }else {
            String userPrivi = privilegeDao.getPrivilegeByUserModule(username,modulename);
            String[] userPriviList = userPrivi.split(",");
            userPrivilege.put("select",userPriviList[0].equals("1"));
            userPrivilege.put("insert",userPriviList[1].equals("1"));
            userPrivilege.put("update",userPriviList[2].equals("1"));
            userPrivilege.put("delete",userPriviList[3].equals("1"));
        }
        return userPrivilege;
    }


}











