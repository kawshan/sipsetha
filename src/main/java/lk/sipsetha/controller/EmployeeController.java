package lk.sipsetha.controller;

import lk.sipsetha.dao.EmployeeDao;
import lk.sipsetha.dao.EmployeeStatusDao;
import lk.sipsetha.entity.Employee;
import lk.sipsetha.entity.EmployeeStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping(value = "/employee")
public class EmployeeController {
    @Autowired
    public EmployeeDao dao;

    @Autowired
    public EmployeeStatusDao employeeStatusDao;

    @GetMapping(value = "/findall")
    public List<Employee> employeeFindAll() {
        return dao.findAll();
    }

    @GetMapping(value = "/employeeform")
    public ModelAndView getEmployeeView() {
        ModelAndView employeeView = new ModelAndView();
        employeeView.setViewName("employee.html");
        return employeeView;
    }

    @PostMapping(value = "/employeeform")
    public String save(@RequestBody Employee employee) {

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
            if (employeeNextNumber.equals(null) || employeeNextNumber.equals("")) {
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

//        Employee exNicEmployee = dao.getByNic(employee.getNic());
//        if (exNicEmployee != null) {
//            return "save not completed given nic " + employee.getNic() + " is already exist";
//        } else {
//
//        }

        //check email duplicate
//        Employee exEmailEmployee = dao.getByEmail(employee.getEmail());
//        if (exEmailEmployee != null) {
//            return "save not complete given email " + employee.getEmail() + "is already exist";
//        } else {
//
//        }

        try{
            dao.save(employee);
            return "ok";
        }catch (Exception e){
            return "update not complete "+e.getMessage();
        }


    }

}
