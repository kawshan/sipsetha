package lk.sipsetha.controller;

import lk.sipsetha.dao.TeacherPaymentDao;
import lk.sipsetha.entity.TeacherPayment;
import lk.sipsetha.entity.TeacherPaymentHasEnrolment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/teacherpayment")
public class TeacherPaymentController {
    @Autowired
    private TeacherPaymentDao dao;

    @GetMapping(value = "/findall")
    private List<TeacherPayment> getAllTeacherPayment(){
        return dao.findAll();
    }

    @PostMapping
    public String saveTeacherPayment(@RequestBody TeacherPayment teacherPayment){
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
        try {
            for (TeacherPaymentHasEnrolment teacherPaymentHasEnrolment : teacherPayment.getTeacherPaymentHasEnrolments()){
                teacherPaymentHasEnrolment.setTeacherpayment_id(teacherPayment);
            }
            return "ok";
        }catch (Exception e){
            return "update teacher payment not complete"+e.getMessage();
        }
    }

}
