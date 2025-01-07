package lk.sipsetha.controller;

import lk.sipsetha.dao.ClassOfferingDao;
import lk.sipsetha.entity.ClassOffering;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

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

}
