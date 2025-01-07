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
public class ReportUiController {

@Autowired
private UserDao userDao;

    @GetMapping(value = "/reportworkingemployee")
    public ModelAndView reportWorkingEmployee(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User loggedUser=userDao.getUserByUserName(auth.getName());
        ModelAndView workingEmpView = new ModelAndView();
        workingEmpView.addObject("loggeduserrole",loggedUser.getRoles().iterator().next().getName());
        workingEmpView.addObject("loggeduserphoto",loggedUser.getUserphoto());
        workingEmpView.addObject("loggedusername",auth.getName());
        workingEmpView.setViewName("reportworkingemployee.html");
        return workingEmpView;
    }

    @GetMapping(value = "/reportstudentui")
    public ModelAndView reportStudentView(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User loggedUser = userDao.getUserByUserName(auth.getName());
        ModelAndView studentReportUI = new ModelAndView();
        studentReportUI.addObject("loggeduserrole",loggedUser.getRoles().iterator().next().getName());
        studentReportUI.addObject("loggeduserphoto",loggedUser.getUserphoto());
        studentReportUI.addObject("loggedusername",auth.getName());
        studentReportUI.setViewName("studentreport.html");
        return studentReportUI;
    }

    @GetMapping(value = "/reportpaymentui")
    public ModelAndView reportPaymentView(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User loggedUser = userDao.getUserByUserName(auth.getName());
        ModelAndView paymentReportUI = new ModelAndView();
        paymentReportUI.addObject("loggeduserrole",loggedUser.getRoles().iterator().next().getName());
        paymentReportUI.addObject("loggeduserphoto",loggedUser.getUserphoto());
        paymentReportUI.addObject("loggedusername",auth.getName());
        paymentReportUI.setViewName("paymentreport.html");
        return paymentReportUI;
    }





}
