package lk.sipsetha.controller;

import lk.sipsetha.dao.ClassOfferingDao;
import lk.sipsetha.entity.ClassOffering;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping(value = "/classoffering")
public class ClassOfferingController {

    @Autowired
    private ClassOfferingDao dao;

    @GetMapping(value = "/findall")
    public List<ClassOffering> getAllClassOffering(){
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
