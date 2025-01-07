package lk.sipsetha.dao;

import lk.sipsetha.entity.StudentRegistration;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRegistrationDao extends JpaRepository<StudentRegistration,Integer> {
}
