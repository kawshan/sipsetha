package lk.sipsetha.controller;

import lk.sipsetha.dao.ReportDao;
import lk.sipsetha.entity.Employee;
import lk.sipsetha.entity.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ReportDataController {

    @Autowired
    private ReportDao reportDao;


    @GetMapping(value = "/reportdataemployee")
    public List<Employee> getWorkingEmployee(){
        return reportDao.workingEmployees();
    }

    //reportdataemployee?status=1&designation=1
    @GetMapping(value = "/reportdataemployee",params = {"status","designation"})
    public List<Employee> getEmployeeListByStatusAndDesignation(@RequestParam("status") int status,@RequestParam("designation")int designation){
        return reportDao.getEmpByStatusAndDesignation(status,designation);
    }

    @GetMapping(value = "/reportpresentstudent")
    public List<Student> getPresentStudents(){
        return reportDao.getPresentStudents();
    }

    //reportdatastudent?status=1&grade=1
    @GetMapping(value = "/reportdatastudent",params = {"status","grade"})
    public List<Student> getStudentListByStatusAndGrade(@RequestParam("status")boolean status,@RequestParam("grade")int grade){
        return reportDao.getByStatusAndGrade(status,grade);
    }



}
