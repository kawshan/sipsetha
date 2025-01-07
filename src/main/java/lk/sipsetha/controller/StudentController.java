package lk.sipsetha.controller;

import lk.sipsetha.dao.StudentDao;
import lk.sipsetha.entity.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping(value = "/student")
public class StudentController {
    @Autowired
    public StudentDao studentDao;

    @GetMapping(value = "/findall",produces = "application/json")
    public List<Student> studentFindAll(){
        return studentDao.findAll();
    }

    @GetMapping(value = "/studentform")
    public ModelAndView studentView(){
        ModelAndView studentUI = new ModelAndView();
        studentUI.setViewName("student.html");
        return studentUI;
    }

    @PostMapping
    public String saveStudent(@RequestBody Student student){
        //user authentication and authorization
        //existing check
        try {
            //set student number
            String studentNextNumber= studentDao.getStudentByNextNumber();  // setting student next number to variable student next number where i got it in student dao by defining native SQL query by using max function and lpad function
            if (studentNextNumber.equals(null) || studentNextNumber.equals("")){
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
