package lk.sipsetha.dao;

import lk.sipsetha.entity.Employee;
import lk.sipsetha.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReportDao extends JpaRepository<Employee,Integer> {



    @Query(value = "select e from Employee e where e.employeestatus_id.id=1")
    public List<Employee> workingEmployees();



    @Query(value = "select e from Employee e where e.employeestatus_id.id=?1 and e.designation_id.id=?2")
    public List<Employee> getEmpByStatusAndDesignation(int status, int designation);


    @Query(value = "select s from Student s where s.status=true")
    public List<Student> getPresentStudents();


    @Query(value = "select s from Student s where s.status=?1 and s.grade_id.id=?2")
    public List<Student> getByStatusAndGrade(boolean status, int grade);



}
