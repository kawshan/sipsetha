package lk.sipsetha.controller;

import lk.sipsetha.dao.AcademicYearDao;
import lk.sipsetha.entity.AcademicYear;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/academicyear")
public class AcademicYearController {

    @Autowired
    private AcademicYearDao dao;

    @GetMapping(value = "/findall")
    public List<AcademicYear> getAllAcademicYear(){
        return dao.findAll();
    }


}
