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
//Purpose of @RestController: To simplify the creation of RESTful web services by automatically converting method return values into HTTP responses in JSON or other formats.
@RestController //@RestController is an annotation in Spring Boot that is used to create RESTful web services. // meken thama apita url request karanna puluwan venne meka naththam apita get post put delete wage request call karanna bari venawa
@RequestMapping(value = "/student") // request mapping warga dekakata haduna ganna puluwan ekak class level anika method level//class level eken patan gaththoth eeta passe method level eke class level ekata enuwa call kranna puluwan ex /student/findall //meka class level request mapping ekak meken patan aran thama apita path haraha request access karanna puluwan venne udaharanayak vidihata gaththoth /student eken patan aragena /find all eka reques karana eka
public class StudentController {
    @Autowired  //dependacy injection //
    public StudentDao studentDao;

    @Autowired//Purpose of @Autowired: To automatically inject the required dependencies into a Spring-managed bean, allowing for automatic resolution of collaborators.
    private PrivilegeController privilegeController;

    @Autowired
    private UserDao userDao;    //data base operations karanna one vena nisa user dao eken instance ekek hadagene eka private verible ekakta assign karagena thiyenwa

    @GetMapping(value = "/findall",produces = "application/json")   //me type eken ee kiyanne /studen/findall browser eken get reqest ekek avoth me method eka wada karanna kiyala thama meka danne
    public List<Student> studentFindAll(){  //method ekak declare karala thiyenwa student findall kiyala eke return venne student type list ekek
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();   //To retrieve the current user's authentication details from the Spring Security context, which includes information about the user's identity and granted authorities.
        HashMap<String,Boolean> getLogUserPrivileges = privilegeController.getPrivilegeByUserModule(auth.getName(), "student"); //privilege controller eke thiyena get privilege by user module kiyana methoda eka call karala thiyenawa ekata pass karagena thiyenwa authentication eken ena user ge getname kiyana gettter eken nama aran parameter ekata pass karan thiyenwa eeta passe module name eka vidihata student module eke string ekek vidihata pass karan thiyenawa
        if (!getLogUserPrivileges.get("select")){//eken enne stirng ekak eka balaganna puluwan apita privilege dao ekata giyoth eken ena string eke komawen spit karagene eke array ekakta daagene eke select inset update delete verible walata daala thiyenewa eken true false value enwa eke select eka true nthtam
            return null; //null ekak return karanawa null kiaynne mukoth na kiyana eka
        }//ehema neme nam ee kiyanne select privilege eka thiyenawa nam
        return studentDao.findAll(Sort.by(Sort.Direction.DESC,"id"));   //doo eke already thiyena method ekak wana findall eka use karla spe student list eka genna gannawa eka genna ganna kota anthima record eka isslama enna one nisa eka decensing dala thiyenwa
    }

    @GetMapping(value = "/studentform") //uda class level eka flowed by meke ee kiyanne student/studenform eka request karanwa
    public ModelAndView studentView(){  //methana model ekek return venne
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();   //authentication object eken authenticate karanawa
        User loggedUser=userDao.getUserByUserName(auth.getName());//dao ekekn logged usewa genna gannwa
        ModelAndView studentUI = new ModelAndView();//model ekek difine karala eka verible ekata assign karala thiyenawa eka type eka tham model and view kiyanne
        studentUI.setViewName("student.html"); //epe ekata adala html eke nama denawa
        studentUI.addObject("title","student management");//title eka denawa eka api allagannawa thymeleaf walin
        studentUI.addObject("loggedusername",auth.getName());   //user neme eka gannwa eketh tyme leaf eken show karanwa user ta auth eken user ge nama arn
        studentUI.addObject("loggeduserrole",loggedUser.getRoles().iterator().next().getName());    //user ge role tika gannwa
        studentUI.addObject("loggeduserphoto",loggedUser.getUserphoto());   //user ge photo eka gannawa mokada nav bar eke penneanna one nisa
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

    @GetMapping(value = "/getbystunum/{stunum}")
    public String getStudentByStuNum(@PathVariable("stunum") String stunum){
        return studentDao.getStudentByStunum(stunum);
    }


}
