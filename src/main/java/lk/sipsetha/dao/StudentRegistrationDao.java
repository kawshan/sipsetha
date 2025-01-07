package lk.sipsetha.dao;

import lk.sipsetha.entity.StudentRegistration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface StudentRegistrationDao extends JpaRepository<StudentRegistration,Integer> {


    @Query(value = "select lpad(max(sr.indexnumber)+1,5,0) as srnumber from studentregistration as sr;",nativeQuery = true)
    public String getStudentRegistrationNextNumber();

}
