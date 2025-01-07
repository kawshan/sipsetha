package lk.sipsetha.dao;

import lk.sipsetha.entity.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeacherDao extends JpaRepository<Teacher,Integer> {
}
