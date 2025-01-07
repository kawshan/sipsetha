package lk.sipsetha.controller;

import lk.sipsetha.dao.GuardianDao;
import lk.sipsetha.entity.Guardian;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping(value = "/guardian")
public class GuardianController {

    @Autowired
    public GuardianDao guardianDao;

    @GetMapping(value = "/findall")
    public List<Guardian> guardianFindAll(){
        return guardianDao.findAll();
    }

    @GetMapping(value = "/guardianform")
    public ModelAndView guardianView(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        ModelAndView guardianUI = new ModelAndView();
        guardianUI.setViewName("guardian.html");
        guardianUI.addObject("title","guardian management");
        guardianUI.addObject("loggedusername",auth.getName());
        return guardianUI;
    }

    @PutMapping
    public String guardianUpdate(@RequestBody Guardian guardian){
        //authentication and authorization
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
        try {
            guardianDao.save(guardian);
            return "ok";
        }catch (Exception e){
            return "guardian submit not completed "+e.getMessage();
        }

    }


}
