package lk.sipsetha.controller;

import lk.sipsetha.dao.ClassOfferingDao;
import lk.sipsetha.entity.ClassOffering;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/classoffering")
public class ClassOfferingController {

    @Autowired
    private ClassOfferingDao dao;

    @GetMapping(value = "/findall")
    public List<ClassOffering> getAllClassOffering(){
        return dao.findAll();
    }

}
