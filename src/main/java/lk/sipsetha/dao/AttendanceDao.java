package lk.sipsetha.dao;

import lk.sipsetha.entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttendanceDao extends JpaRepository<Attendance,Integer> {
}
