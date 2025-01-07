package lk.sipsetha.controller;

import lk.sipsetha.dao.AllocationStatusDao;
import lk.sipsetha.dao.ClassRoomAllocationDao;
import lk.sipsetha.entity.AllocationStatus;
import lk.sipsetha.entity.ClassroomAllocation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping(value = "/classroomallocation")
public class ClassRoomAllocationController {

    @Autowired
    private ClassRoomAllocationDao dao;

    @Autowired
    private AllocationStatusDao allocationStatusDao;

    @Autowired
    private PrivilegeController privilegeController;

    @GetMapping(value = "/findall")
    public List<ClassroomAllocation> getAllClassRoomAllocation(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String,Boolean> getLoggedUserPrivilege = privilegeController.getPrivilegeByUserModule(auth.getName(), "classroomallocation");
        if (!getLoggedUserPrivilege.get("select")){
            return null;
        }
        return dao.findAll(Sort.by(Sort.Direction.DESC,"id"));
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

    @PostMapping
    public String saveClassRoomAllocation(@RequestBody ClassroomAllocation classroomAllocation){
        //authentication and authorization
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String,Boolean> getLoggedUserPrivilege = privilegeController.getPrivilegeByUserModule(auth.getName(), "classroomallocation");
        if (!getLoggedUserPrivilege.get("insert")){
            return "cannot perform save class room allocation.. you don't have privileges";
        }
        //existing and duplicate
        //operator
        try {
            classroomAllocation.setAddeddatetime(LocalDateTime.now());
            dao.save(classroomAllocation);
            return "ok";
        }catch (Exception e){
            return "class room allocation save is not complete "+e.getMessage();
        }

    }

    @PutMapping
    public String updateClassRoomAllocation(@RequestBody ClassroomAllocation classroomAllocation){
        //authentication and authorization
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String,Boolean> getLoggedUserPrivilege = privilegeController.getPrivilegeByUserModule(auth.getName(), "classroomallocation");
        if (!getLoggedUserPrivilege.get("update")){
            return "cannot perform update class room allocation.. you dont have privileges";
        }
        //existing and duplicate
        //operator
        try {
            dao.save(classroomAllocation);
            return "ok";
        }catch (Exception e){
            return "update class room allocation is not complete"+e.getMessage();
        }

    }


    @DeleteMapping
    public String deleteClassroomAllocation(@RequestBody ClassroomAllocation classroomAllocation){
        //authentication and authorization
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String,Boolean> getLoggedUserPrivilege = privilegeController.getPrivilegeByUserModule(auth.getName(), "classroomallocation");
        if (!getLoggedUserPrivilege.get("delete")){
            return "cannot perform delete class room allocation ... you don't have privileges";
        }
        //existing
        //operator
        try {
            AllocationStatus deleteAllocationStatus =allocationStatusDao.getReferenceById(2);
            classroomAllocation.setAllocationstatus_id(deleteAllocationStatus);
            dao.save(classroomAllocation);
            return "ok";
        }catch (Exception e){
            return "delete class room allocation is not complete "+e.getMessage();
        }
    }


}
