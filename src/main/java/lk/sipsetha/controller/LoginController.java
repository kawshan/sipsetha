package lk.sipsetha.controller;

import lk.sipsetha.dao.UserDao;
import lk.sipsetha.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class LoginController {
    @Autowired
    private UserDao userDao;

    @GetMapping(value = "/login")
    public ModelAndView LoginUi(){
        ModelAndView loginView = new ModelAndView();
        loginView.setViewName("login.html");
        return loginView;
    }

    @GetMapping(value = "/error")
    public ModelAndView ErrorUI(){
        ModelAndView errorView  = new ModelAndView();
        errorView.setViewName("error.html");
        return errorView;
    }

    @GetMapping(value = "/dashboard")
    public ModelAndView dashboardUI(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User loggedUser=userDao.getUserByUserName(auth.getName());
        ModelAndView dashboardView = new ModelAndView();
        dashboardView.addObject("loggeduserrole",loggedUser.getRoles().iterator().next().getName());
        dashboardView.addObject("loggeduserphoto",loggedUser.getUserphoto());
        dashboardView.addObject("loggedusername",auth.getName());
        dashboardView.setViewName("dashboard.html");
        return dashboardView;
    }


}
