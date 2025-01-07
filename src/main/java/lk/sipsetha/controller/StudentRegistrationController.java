package lk.sipsetha.controller;

import lk.sipsetha.dao.StudentRegistrationDao;
import lk.sipsetha.entity.StudentRegistration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping(value = "/studentregistration")
public class StudentRegistrationController {

    @Autowired
    private StudentRegistrationDao dao;

    @GetMapping(value = "/studentregistrationform")
    public ModelAndView getStudentRegistrationUI(){
        Authentication auth  = SecurityContextHolder.getContext().getAuthentication();
        ModelAndView studentRegistrationView = new ModelAndView();
        studentRegistrationView.setViewName("studentregistration.html");
        studentRegistrationView.addObject("loggedusername",auth.getName());
        studentRegistrationView.addObject("title","student registration form ");
        return studentRegistrationView;
    }

    @GetMapping(value = "/findall")
    public List<StudentRegistration> getAllStudentRegistration(){
        return dao.findAll();
    }

}
