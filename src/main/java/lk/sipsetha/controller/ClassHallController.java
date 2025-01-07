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
import java.util.List;

@RestController
@RequestMapping(value = "/classhall")
public class ClassHallController {

    @Autowired
    private ClassHallDao dao;

    @Autowired
    private ClassHallStatusDao classHallStatusDao;

    @GetMapping(value = "/findall")
    public List<ClassHall> findAll(){
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
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
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
