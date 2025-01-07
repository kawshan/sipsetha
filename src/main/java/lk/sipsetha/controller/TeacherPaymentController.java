package lk.sipsetha.controller;

import lk.sipsetha.dao.TeacherPaymentDao;
import lk.sipsetha.entity.TeacherPayment;
import lk.sipsetha.entity.TeacherPaymentHasEnrolment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping(value = "/teacherpayment")
public class TeacherPaymentController {
    @Autowired
    private TeacherPaymentDao dao;

    @Autowired
    private PrivilegeController privilegeController;

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
            for (TeacherPaymentHasEnrolment teacherPaymentHasEnrolment : teacherPayment.getTeacherPaymentHasEnrolments()){
                teacherPaymentHasEnrolment.setTeacherpayment_id(teacherPayment);
            }
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
    @PostMapping
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
