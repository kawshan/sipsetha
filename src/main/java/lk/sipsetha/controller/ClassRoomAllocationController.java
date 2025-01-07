package lk.sipsetha.controller;

import lk.sipsetha.dao.ClassRoomAllocationDao;
import lk.sipsetha.entity.ClassroomAllocation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

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

    @GetMapping(value = "/classroomallocationform")
    public ModelAndView getClassroomAllocationForm(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        ModelAndView classroomAllocationView = new ModelAndView();
        classroomAllocationView.setViewName("classroomallocation.html");
        classroomAllocationView.addObject("loggedusername",auth.getName());
        classroomAllocationView.addObject("title","classroom allocation ui");
        return classroomAllocationView;
    }

}
