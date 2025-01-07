package lk.sipsetha.controller;

import lk.sipsetha.dao.EmployeeDao;
import lk.sipsetha.dao.EmployeeStatusDao;
import lk.sipsetha.entity.Employee;
import lk.sipsetha.entity.EmployeeStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping(value = "/employee")
public class EmployeeController {
    @Autowired
    public EmployeeDao dao;

    @Autowired
    public EmployeeStatusDao employeeStatusDao;

    @Autowired
    private PrivilegeController privilegeController;

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
        ModelAndView employeeView = new ModelAndView();
        employeeView.setViewName("employee.html");
        employeeView.addObject("loggedusername",auth.getName());
        employeeView.addObject("title","employee management");
        return employeeView;
    }

    @PostMapping(value = "/employeeform")
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

        //check email duplicate
        Employee exEmailEmployee = dao.getByEmail(employee.getEmail());
        if (exEmailEmployee != null) {
            return "save not complete given email " + employee.getEmail() + "is already exist";
        } else {

        }

        try {
            String employeeNextNumber = dao.getEmployeeNextNumber();
            if (employeeNextNumber==null || employeeNextNumber == "") {
                employee.setEmpnum("00001");
            } else {
                employee.setEmpnum(employeeNextNumber);
            }
            dao.save(employee);
            return "ok";
        } catch (Exception e) {
            return "save not completed " + e.getMessage();
        }
    }

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

}
