package lk.sipsetha.dao;

import lk.sipsetha.entity.AcademicYear;
import lk.sipsetha.entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AcademicYearDao extends JpaRepository<AcademicYear,Integer> {

}
