package lk.sipsetha.controller;

import lk.sipsetha.dao.ClassRoomAllocationDao;
import lk.sipsetha.entity.ClassroomAllocation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/classroomallocation")
public class ClassRoomAllocationController {

    @Autowired
    private ClassRoomAllocationDao dao;

    @GetMapping(value = "/findall")
    public List<ClassroomAllocation> getAllClassRoomAllocation(){
        return dao.findAll();
    }
}
