package lk.sipsetha.controller;

import lk.sipsetha.dao.EnrolmentDao;
import lk.sipsetha.entity.Enrolment;
import lk.sipsetha.entity.EnrolmentHasClassOfferings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping
    public String saveEnrolment(@RequestBody Enrolment enrolment){
        try {
            for (EnrolmentHasClassOfferings ehco : enrolment.getClassOfferings()){
                ehco.setEnrolment_id(enrolment);
            }
            dao.save(enrolment);
            return "ok";
        }catch (Exception e){
            return "save not complete"+e.getMessage();
        }
    }

    @PutMapping
    public String updateEnrolment(@RequestBody Enrolment enrolment){
        try {
            for (EnrolmentHasClassOfferings ehco : enrolment.getClassOfferings()){
                ehco.setEnrolment_id(enrolment);
            }
            return "ok";
        }catch (Exception e){
            return "update enrolment not complete"+e.getMessage();
        }
    }

}
