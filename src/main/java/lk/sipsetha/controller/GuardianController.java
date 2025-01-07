package lk.sipsetha.controller;

import lk.sipsetha.dao.GuardianDao;
import lk.sipsetha.entity.Guardian;
import org.springframework.beans.factory.annotation.Autowired;
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
        ModelAndView guardianUI = new ModelAndView();
        guardianUI.setViewName("guardian.html");
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


}
