package lk.sipsetha.controller;

import lk.sipsetha.dao.TeacherPaymentDao;
import lk.sipsetha.entity.TeacherPayment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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


}
