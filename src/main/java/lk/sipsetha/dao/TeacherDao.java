package lk.sipsetha.dao;

import lk.sipsetha.entity.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TeacherDao extends JpaRepository<Teacher,Integer> {


    @Query(value = "select lpad(max(t.teachernum)+1,5,0)as teachernum from teacher as t;",nativeQuery = true)
    public String getTeacherNextNumber();
}
