package lk.sipsetha.dao;

import lk.sipsetha.entity.Enrolment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EnrolmentDao extends JpaRepository<Enrolment,Integer> {
}
