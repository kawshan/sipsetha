package lk.sipsetha.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class LoginController {

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
        ModelAndView dashboardView = new ModelAndView();
        dashboardView.setViewName("dashboard.html");
        return dashboardView;
    }


}
