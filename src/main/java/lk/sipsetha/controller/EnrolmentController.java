package lk.sipsetha.controller;

import lk.sipsetha.dao.EnrolmentDao;
import lk.sipsetha.entity.Enrolment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/enrolment")
public class EnrolmentController {

    @Autowired
    private EnrolmentDao dao;

    @GetMapping(value = "/findall")
    public List<Enrolment> getAllEnrolment(){
//        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return dao.findAll();
    }
}
