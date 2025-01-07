package lk.sipsetha.controller;

import lk.sipsetha.dao.StudentDao;
import lk.sipsetha.dao.UserDao;
import lk.sipsetha.entity.Student;
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
@RequestMapping(value = "/student")
public class StudentController {
    @Autowired
    public StudentDao studentDao;

    @Autowired
    private PrivilegeController privilegeController;

    @Autowired
    private UserDao userDao;

    @GetMapping(value = "/findall",produces = "application/json")
    public List<Student> studentFindAll(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String,Boolean> getLogUserPrivileges = privilegeController.getPrivilegeByUserModule(auth.getName(), "student");
        if (!getLogUserPrivileges.get("select")){
            return null;
        }
        return studentDao.findAll(Sort.by(Sort.Direction.DESC,"id"));
    }

    @GetMapping(value = "/studentform")
    public ModelAndView studentView(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        ModelAndView studentUI = new ModelAndView();
        studentUI.setViewName("student.html");
        studentUI.addObject("title","student management");
        studentUI.addObject("loggedusername",auth.getName());
        return studentUI;
    }

    @PostMapping
    public String saveStudent(@RequestBody Student student){
        //user authentication and authorization
        Authentication auth =SecurityContextHolder.getContext().getAuthentication();
        HashMap<String,Boolean> getLogUserPrivilege = privilegeController.getPrivilegeByUserModule(auth.getName(), "student");
        if (!getLogUserPrivilege.get("insert")){
            return "cannot perform save student.. you don't have privileges";
        }
        //existing check
        try {
            //set student number
            student.setUser_id(userDao.getUserByUserName(auth.getName()));
            String studentNextNumber= studentDao.getStudentByNextNumber();  // setting student next number to variable student next number where i got it in student dao by defining native SQL query by using max function and lpad function
            if (studentNextNumber==null || studentNextNumber.equals("")){
                student.setStunum("00001");
            }else {
                student.setStunum(studentNextNumber);
            }

            student.setAddeddatetime(LocalDateTime.now());
            studentDao.save(student);
            return "ok";
        }catch (Exception e){
            return "student add not complete "+e.getMessage();
        }
        //operator
        //auto set values

    }

    @DeleteMapping
    public String deleteStudent(@RequestBody Student student){
        //authentication and authorization
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String,Boolean> getLoggedUserPrivilege =privilegeController.getPrivilegeByUserModule(auth.getName(), "student");
        if (!getLoggedUserPrivilege.get("delete")){
            return "cannot perform delete.. you don't have privileges";
        }
        //existing check
        Student extStudent = studentDao.getStudentByStudentNumber(student.getStunum());
        if (extStudent == null){
            return "student does not exists";
        }
        try {
            //auto set values
            student.setDeletedatetime(LocalDateTime.now());
            student.setStatus(false);
            studentDao.save(student);
            return "ok";
            //operator
        }catch (Exception e){
            return "delete not complete"+e.getMessage();
        }


    }

    @PutMapping
    public String updateStudent(@RequestBody Student student){
        //authentication and authorization
        Authentication auth =SecurityContextHolder.getContext().getAuthentication();
        HashMap<String,Boolean> getLogUserPrivileges = privilegeController.getPrivilegeByUserModule(auth.getName(),"student");
        if (!getLogUserPrivileges.get("update")){
            return "cannot perform student modify.. you don't have privileges";
        }
        //check existence and duplicates
        //operator
        //auto set values

//        Student extStudentID = studentDao.getReferenceById(student.getId());
//        if (extStudentID != null){
//            return "cannot update because student is not exists";
//        }

        try {
            student.setModifydatetime(LocalDateTime.now());
            studentDao.save(student);
            return "ok";
        }catch (Exception e){
            return "cannot update"+e.getMessage();
        }

    }


}
