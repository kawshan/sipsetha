package lk.sipsetha.controller;

import lk.sipsetha.dao.AttendanceDao;
import lk.sipsetha.dao.AttendanceStatusDao;
import lk.sipsetha.dao.UserDao;
import lk.sipsetha.entity.Attendance;
import lk.sipsetha.entity.AttendanceStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping(value = "/attendance")
public class AttendanceController {

    @Autowired//dependancy injection
    private AttendanceDao dao; //Attendace dao type dao varible ekak declare karagannawa    //dao eka link karaganne databse operations walata

    @Autowired
    private AttendanceStatusDao attendanceStatusDao;


    @Autowired
    private PrivilegeController privilegeController;

    @Autowired
    private UserDao userDao;

    @GetMapping(value = "/findall")
    public List<Attendance> getAllAttendance(){
        return dao.findAll();
    }

    @GetMapping(value = "/attendanceform")
    public ModelAndView getAttendanceView() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        ModelAndView attendanceView = new ModelAndView();
        attendanceView.setViewName("attendance.html");
        attendanceView.addObject("loggedusername",auth.getName());
        attendanceView.addObject("title","attendance management");
        return attendanceView;
    }

    @DeleteMapping
    public String deleteAttendance(@RequestBody Attendance attendance){

        //authentication and authorization
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String,Boolean> getLoggedUserPrivilege = privilegeController.getPrivilegeByUserModule(auth.getName(),"attendance");
        if (!getLoggedUserPrivilege.get("delete")){
            return "cannot perform delete attendance... you dont have privileges";
        }

        try {
            AttendanceStatus deleteAttendanceStatus = attendanceStatusDao.getReferenceById(3);
            attendance.setAttendancestatus_id(deleteAttendanceStatus);
            attendance.setDeleteuser(userDao.getUserByUserName(auth.getName()).getId());
            attendance.setDeletedate(LocalDate.now());
            dao.save(attendance);
            return "ok";
        }catch (Exception e){
            return "attendance delete was unsuccessful "+e.getMessage();
        }
    }


    @PostMapping
    public String saveAttendance(@RequestBody Attendance attendance){
        //authentication and authorization
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String,Boolean> getLoggedUserPrivilege = privilegeController.getPrivilegeByUserModule(auth.getName(),"attendance");
        if (!getLoggedUserPrivilege.get("insert")){
            return "cannot perform delete attendance... you dont have privileges";
        }

        Attendance chekDuplicateAttendance=dao.checkDupUsingDateStuClZOff(LocalDate.now().toString(),attendance.getClassoffering_id().getId(),attendance.getStudent_id().getId());
        if (chekDuplicateAttendance!=null){
            return "cannot perform attendance its already exists";
        }


        try {

            attendance.setAddeduser(userDao.getUserByUserName(auth.getName()).getId());
            attendance.setAddeddate(LocalDate.now());
            dao.save(attendance);
            return "ok";
        }catch (Exception e){
            return "save attendance not complete "+e.getMessage();
        }
    }



    @PutMapping
    public String modifyAttendance(@RequestBody Attendance attendance){
        //authentication and authorization
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String,Boolean> getLoggedUserPrivilege = privilegeController.getPrivilegeByUserModule(auth.getName(),"attendance");
        if (!getLoggedUserPrivilege.get("update")){
            return "cannot perform delete attendance... you dont have privileges";
        }
        try {
            attendance.setUpdateuser(userDao.getUserByUserName(auth.getName()).getId());
            attendance.setUpdatedate(LocalDate.now());
            dao.save(attendance);
            return "ok";
        }catch (Exception e){
            return "cannot perform modify attendance "+e.getMessage();
        }
    }


}
