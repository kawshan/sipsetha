package lk.sipsetha.controller;

import lk.sipsetha.dao.TeacherPaymentDao;
import lk.sipsetha.dao.UserDao;
import lk.sipsetha.entity.TeacherPayment;
import lk.sipsetha.entity.TeacherPaymentHasEnrolment;
import lk.sipsetha.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping(value = "/teacherpayment")
public class TeacherPaymentController {
    @Autowired
    private TeacherPaymentDao dao;

    @Autowired
    private PrivilegeController privilegeController;

    @Autowired
    private UserDao userDao;

    @GetMapping
    public ModelAndView teacherPaymentView(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User loggedUser=userDao.getUserByUserName(authentication.getName());
        ModelAndView teacherPaymentUI = new ModelAndView();
        teacherPaymentUI.setViewName("teacherpayment.html");
        teacherPaymentUI.addObject("title","teacher payment ui");
        teacherPaymentUI.addObject("loggedusername",authentication.getName());
        teacherPaymentUI.addObject("loggeduserrole",loggedUser.getRoles().iterator().next().getName());
        teacherPaymentUI.addObject("loggeduserphoto",loggedUser.getUserphoto());
        return teacherPaymentUI;

    }

    @GetMapping(value = "/findall")
    private List<TeacherPayment> getAllTeacherPayment(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String,Boolean> getLoggedUserPrivilege = privilegeController.getPrivilegeByUserModule(auth.getName(), "teacherpayment");
        if (!getLoggedUserPrivilege.get("select")){
            return null;
        }
        return dao.findAll();
    }

    @PostMapping
    public String saveTeacherPayment(@RequestBody TeacherPayment teacherPayment){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String,Boolean> getLoggedUserPrivilege = privilegeController.getPrivilegeByUserModule(auth.getName(), "teacherpayment");
        if (!getLoggedUserPrivilege.get("insert")){
            return "cannot perform save teacher payment .. you don't have privileges";
        }
        try {
            String nextBillNumber = dao.getNextBillNumber();
            if (nextBillNumber==null || nextBillNumber==""){
                teacherPayment.setBillnumber("0000000001");
            }else {
                teacherPayment.setBillnumber(nextBillNumber);
            }

            teacherPayment.setAddeddatetime(LocalDateTime.now());
            teacherPayment.setAddeduser(userDao.getUserByUserName(auth.getName()).getId());


            for (TeacherPaymentHasEnrolment teacherPaymentHasEnrolment : teacherPayment.getTeacherPaymentHasEnrolments()){
                teacherPaymentHasEnrolment.setTeacherpayment_id(teacherPayment);
            }
            dao.save(teacherPayment);
            return "ok";

        }catch (Exception e){
            return "teacher payment save not completed"+e.getMessage();
        }
    }

    @PutMapping
    public String updateTeacherPayment(@RequestBody TeacherPayment teacherPayment){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String,Boolean> getLoggedUserPrivilege = privilegeController.getPrivilegeByUserModule(auth.getName(),"teacherpayment");
        if (!getLoggedUserPrivilege.get("update")){
            return "cannot perform update .. you don't have privileges";
        }
        try {
            for (TeacherPaymentHasEnrolment teacherPaymentHasEnrolment : teacherPayment.getTeacherPaymentHasEnrolments()){
                teacherPaymentHasEnrolment.setTeacherpayment_id(teacherPayment);
            }
            return "ok";
        }catch (Exception e){
            return "update teacher payment not complete"+e.getMessage();
        }
    }
    @DeleteMapping
    public String deleteTeacherPayment(@RequestBody TeacherPayment teacherPayment){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String,Boolean> getLoggedUserPrivileges = privilegeController.getPrivilegeByUserModule(auth.getName(),"teacherpayment");
        if (!getLoggedUserPrivileges.get("delete")){
            return "cannot perform teacher payment delete .. you don't have privileges";
        }
        try {
            for (TeacherPaymentHasEnrolment tphe : teacherPayment.getTeacherPaymentHasEnrolments()){
                tphe.setTeacherpayment_id(teacherPayment);
            }

            dao.delete(teacherPayment);
            return "ok";
        }catch (Exception e){
            return "teacher payment delete not complete "+e.getMessage();
        }
    }


}
