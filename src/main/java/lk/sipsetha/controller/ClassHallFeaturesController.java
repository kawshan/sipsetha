package lk.sipsetha.controller;

import lk.sipsetha.dao.ClassHallFeaturesDao;
import lk.sipsetha.entity.ClassHall;
import lk.sipsetha.entity.ClassHallFeatures;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping(value = "/classhallfeatures")
public class ClassHallFeaturesController {

    @Autowired
    private ClassHallFeaturesDao dao;

    @GetMapping(value = "/findall")
    public List<ClassHallFeatures> getAll(){
        return dao.findAll();
    }

    @GetMapping(value = "/withoutchfeatures/{classhallid}")
    public List<ClassHallFeatures> getClassHallWithoutFeatures(@PathVariable("classhallid")Integer classHallId){

        return dao.getClassHallWithOutFeatures(classHallId);
    }

}
