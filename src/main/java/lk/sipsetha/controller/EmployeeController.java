package lk.sipsetha.controller;

import jakarta.transaction.Transactional;
import lk.sipsetha.dao.EmployeeDao;
import lk.sipsetha.dao.EmployeeStatusDao;
import lk.sipsetha.dao.RoleDao;
import lk.sipsetha.dao.UserDao;
import lk.sipsetha.entity.Employee;
import lk.sipsetha.entity.EmployeeStatus;
import lk.sipsetha.entity.Role;
import lk.sipsetha.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping(value = "/employee")
public class EmployeeController {
    @Autowired  //auto wired annotation is used for dependency injection. it tells spring to automatically inject an instance of the specified bean into the field
    public EmployeeDao dao;

    @Autowired
    public EmployeeStatusDao employeeStatusDao; //injects an instance of the employee status dao class into this field it allows to data access operations releted to employee status without needing to instantiate or configure it manually

    @Autowired
    private PrivilegeController privilegeController;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;    //inject an instance of bCryptPasswordEncoder into the field allowing you to use it for tasks such as encoding posswords and match passwords

    @Autowired
    private RoleDao roleDao;

    @Autowired
    private UserDao userDao;


    @GetMapping(value = "/findall")
    public List<Employee> employeeFindAll() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String,Boolean> getUserPrivilege = privilegeController.getPrivilegeByUserModule(auth.getName(), "employee");
        if (!getUserPrivilege.get("select")){
            return null;
        }
        return dao.findAll(Sort.by(Sort.Direction.DESC,"id"));
    }

    @GetMapping(value = "/employeeform")
    public ModelAndView getEmployeeView() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User loggedUser=userDao.getUserByUserName(auth.getName());
        ModelAndView employeeView = new ModelAndView();
        employeeView.setViewName("employee.html");
        employeeView.addObject("loggedusername",auth.getName());
        employeeView.addObject("loggeduserrole",loggedUser.getRoles().iterator().next().getName());
        employeeView.addObject("loggeduserphoto",loggedUser.getUserphoto());
        employeeView.addObject("title","employee management");
        return employeeView;
    }

    @PostMapping(value = "/employeeform")
   // @Transactional  //methana table dekak access karana nisa data base prashna enna puluwan ehema unoth roll back karanna one vena nisa thama meka dannne
    public String save(@RequestBody Employee employee) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String,Boolean> getUserPrivilege = privilegeController.getPrivilegeByUserModule(auth.getName(), "employee");
        if (!getUserPrivilege.get("insert")){
            return "cannot perform employee save... you dont have privileges";
        }

        //check nic duplicates
        Employee exNicEmployee = dao.getByNic(employee.getNic());
        if (exNicEmployee != null) {
            return "save not completed given nic " + employee.getNic() + " is already exist";
        } else {

        }

        Employee exEmployeeMobile = dao.getBYMobile(employee.getMobile());
        if (exEmployeeMobile!=null){
            return "cannot perform save employee mobile"+employee.getMobile()+" is already exists";
        }


        //check email duplicate
        Employee exEmailEmployee = dao.getByEmail(employee.getEmail());
        if (exEmailEmployee != null) {
            return "save not complete given email " + employee.getEmail() + "is already exist";
        } else {

        }

        try {
            employee.setAddeddate(LocalDate.now());

            String employeeNextNumber = dao.getEmployeeNextNumber();
            if (employeeNextNumber==null || employeeNextNumber == "") {
                employee.setEmpnum("00001");
            } else {
                employee.setEmpnum(employeeNextNumber);
            }
            Employee savedEmployee = dao.save(employee); //save employee and storing that into saved employee variable



            if (employee.getDesignation_id().getUseraccount()){ //user account eka true da false da kiyala baluwa
                User newUser = new User();  //create new empty user object
                //now we need to add properties one by one
                newUser.setUsername(employee.getCallingname());
                newUser.setPassword(bCryptPasswordEncoder.encode(employee.getNic()));
                newUser.setEmail(employee.getEmail());
                newUser.setAddeddatetime(LocalDateTime.now());
                newUser.setStatus(true);
                newUser.setEmployee_id(savedEmployee);

                Set<Role> userRole = new HashSet<>();// role set ekekata instence ekek hadaganththe ai userge role ekeata one hinda  // craate empty role set object -> for add new user as user role
                Role newObject =  roleDao.getByRoleName(employee.getDesignation_id().getName());//role object ekaek hadaganththta role dao eken designation ekata relaated eka genna gaththta // get role object using employee designation and store role variable
                userRole.add(newObject);//eka add karagaththta      //set role object into role set
                newUser.setRoles(userRole);//add role set into role set

                //save user
                userDao.save(newUser);
            }

            return "ok";
        } catch (Exception e) {
            return "save not completed " + e.getMessage();
        }
    }

  //  @Transactional    //methanath dependency ekak thiyenawa eka thamai employee delete karanakota eyata adala user account ekak thiyenawanam eke status eka delete karanawa                                                                                                                                                      //mekata ai damme uda methoda eka transactional nisa ethana eka scilently fall kiyana error eka awa eka nathi karanna thama me dewani method ekata transactional damme link for this error ->https://stackoverflow.com/questions/19302196/transaction-marked-as-rollback-only-how-do-i-find-the-cause
    @DeleteMapping
    public String deleteEmployee(@RequestBody Employee employee) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String,Boolean> getUserPrivilege = privilegeController.getPrivilegeByUserModule(auth.getName(), "employee");
        if (!getUserPrivilege.get("delete")){
            return "cannot perform delete employee.. you don't have privileges";
        }
        try {
            //hard delete
            //dao.delete(employee);
            
            //soft delete
            EmployeeStatus deleteStatus = employeeStatusDao.getReferenceById(3);
            employee.setEmployeestatus_id(deleteStatus);
            dao.save(employee);

            //dependancies
            //need to change user account status if it is exists
            User extUser = userDao.getUserByEmployee(employee.getId());
            if (extUser!=null){//ehema user kenek innawa nam
                extUser.setStatus(false);
                userDao.save(extUser);
            }

            return "ok";
        } catch (Exception e) {
            return "delete not complete " + e.getMessage();
        }
    }

    @PutMapping
    public String updateEmployee(@RequestBody Employee employee){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        HashMap<String,Boolean> getUserPrivileges = privilegeController.getPrivilegeByUserModule(auth.getName(), "employee");
        if (!getUserPrivileges.get("update")){
            return "cannot perform update employee.. you don't have privileges";
        }

        Employee extEmployee = dao.getReferenceById(employee.getId());
        if (extEmployee == null){
            return "cannot perform update... employee not exist";
        }

        Employee exNicEmployee = dao.getByNic(employee.getNic());
        if (exNicEmployee != null && exNicEmployee.getId() != employee.getId()) {
            return "update not completed given nic " + employee.getNic() + " is already exist";
        }

//        check email duplicate
        Employee exEmailEmployee = dao.getByEmail(employee.getEmail());
        if (exEmailEmployee != null && !exEmailEmployee.getEmail().equals(employee.getEmail())) {
            return "save not complete given email " + employee.getEmail() + " is already exist";
        }

        try{
            dao.save(employee);
            return "ok";
        }catch (Exception e){
            return "update not complete "+e.getMessage();
        }


    }

    @GetMapping(value = "/withoutuseraccount")
    public List<Employee> getListWithoutUserAccount(){
        return dao.getListWithoutUserAccount();
    }

    @GetMapping(value = "/getbynic/{nic}")
    public Boolean getEmployeeDuplicateFromNic(@PathVariable("nic")String nic){
        Employee exEmpByNic = dao.getByNic(nic);
        if (exEmpByNic!=null){
            return true;
        }else {
            return false;
        }
    }

    @GetMapping(value = "/getbymobile/{mobile}")
    public Boolean getEmployeeByMobile(@PathVariable("mobile") String mobile){
        Employee exEmpByMobile = dao.getBYMobile(mobile);
        if (exEmpByMobile!=null){
            return true;
        }else {
            return false;
        }
    }

    @GetMapping(value = "/getbyemployeeemail/{email}")
    public Boolean getEmployeeByEmail(@PathVariable("email")String email){
        Employee exEmployeeEmail= dao.getByEmail(email);
        if (exEmployeeEmail!=null){
            return true;
        }else {
            return false;
        }
    }

}
