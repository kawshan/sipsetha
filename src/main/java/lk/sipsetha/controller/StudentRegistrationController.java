package lk.sipsetha.controller;

import lk.sipsetha.dao.ClassOfferingDao;
import lk.sipsetha.dao.RegistrationStatusDao;
import lk.sipsetha.dao.StudentRegistrationDao;
import lk.sipsetha.dao.UserDao;
import lk.sipsetha.entity.ClassOffering;
import lk.sipsetha.entity.RegistrationStatus;
import lk.sipsetha.entity.StudentRegistration;
import lk.sipsetha.entity.User;
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
@RequestMapping(value = "/studentregistration")
public class StudentRegistrationController {

    @Autowired
    private StudentRegistrationDao dao;

    @Autowired
    private RegistrationStatusDao registrationStatusDao;

    @Autowired
    private PrivilegeController privilegeController;

    @Autowired//dependency injection
    private ClassOfferingDao classOfferingDao;  //class offering dao eke instance ekak hadagena eka varible ekakta dagena thiyenawa

    @Autowired
    private UserDao userDao;


    @GetMapping(value = "/studentregistrationform")
    public ModelAndView getStudentRegistrationUI(){
        Authentication auth  = SecurityContextHolder.getContext().getAuthentication();
        User loggedUser=userDao.getUserByUserName(auth.getName());
        ModelAndView studentRegistrationView = new ModelAndView();
        studentRegistrationView.setViewName("studentregistration.html");
        studentRegistrationView.addObject("loggedusername",auth.getName());
        studentRegistrationView.addObject("loggeduserrole",loggedUser.getRoles().iterator().next().getName());
        studentRegistrationView.addObject("loggeduserphoto",loggedUser.getUserphoto());
        studentRegistrationView.addObject("title","student class registration ");
        return studentRegistrationView;
    }

    @GetMapping(value = "/findall")
    public List<StudentRegistration> getAllStudentRegistration(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String,Boolean> getLogUserPrivilege = privilegeController.getPrivilegeByUserModule(auth.getName(), "studentregistration");
        if (!getLogUserPrivilege.get("select")){
            return null;
        }
        return dao.findAll(Sort.by(Sort.Direction.DESC,"id"));

    }

    @PostMapping
    public String saveStudentRegistration(@RequestBody StudentRegistration studentRegistration){
    //authentication and authorization
        Authentication auth =SecurityContextHolder.getContext().getAuthentication();
        HashMap<String,Boolean> getLogUserPrivilege = privilegeController.getPrivilegeByUserModule(auth.getName(), "studentregistration");
        if (!getLogUserPrivilege.get("insert")){
            return "cannot perform save student registration.... you don't have privileges";
        }

    //existing and duplicate
    //operator

    try {

        String studentRegistrationNextNumber = dao.getStudentRegistrationNextNumber();
        if (studentRegistrationNextNumber == null || studentRegistrationNextNumber =="" ){
            studentRegistration.setIndexnumber("00001");
        }else {
            studentRegistration.setIndexnumber(studentRegistrationNextNumber);
        }

        studentRegistration.setAddeddatetime(LocalDateTime.now());
        dao.save(studentRegistration);
        return "ok";
    }catch (Exception e){
        return "save not complete "+e.getMessage();
    }
    }

    @PutMapping
    public String modifyStudentRegistration(@RequestBody StudentRegistration studentRegistration){
        //authentication and authorization
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String,Boolean> getLoggedUserPrivileges = privilegeController.getPrivilegeByUserModule(auth.getName(), "studentregistration");
        if (!getLoggedUserPrivileges.get("update")){
            return "cannot perform modify student registration.... you don't have privileges";
        }
        //existing and duplicate
        //operator
        try {
            studentRegistration.setModifydatetime(LocalDateTime.now());
            dao.save(studentRegistration);
            return "ok";
        }catch (Exception e){
            return "student registration modify is not complete"+e.getMessage();
        }
    }

    @DeleteMapping
    public String deleteStudentRegistration(@RequestBody StudentRegistration studentRegistration){
        //authetication and authorization
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String,Boolean> getLoggedUserPrivileges = privilegeController.getPrivilegeByUserModule(auth.getName(), "studentregistration");
        if (!getLoggedUserPrivileges.get("delete")){
            return "cannot perform delete student registration ... you don't have privileges";
        }
        //existing
        //operator
        try {

            studentRegistration.setDeletedatetime(LocalDateTime.now());
            RegistrationStatus deleteStatus =  registrationStatusDao.getReferenceById(2);
            studentRegistration.setRegistrationstatus_id(deleteStatus);
            dao.save(studentRegistration);
            return "ok";

        }catch (Exception e){
            return "delete student registration not successful"+e.getMessage();
        }
    }


    @GetMapping(value = "/{indexnumb}")
    public List<StudentRegistration> getIndexNumberFormStudentNumber(@PathVariable("indexnumb") String indexnumb){
        return dao.getIndexNumberFromStuNum(indexnumb);
    }


    @GetMapping(value = "/getclassofferingbystudentgradefromstunum/{stunum}")
    public List<ClassOffering> getClassOfferingFromStudentGrade(@PathVariable("stunum")String stunum){
        return classOfferingDao.getClassOfferingsByStudentGrade(stunum);
    }


}
