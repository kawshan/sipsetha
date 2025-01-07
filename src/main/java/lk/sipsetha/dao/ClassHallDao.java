package lk.sipsetha.dao;

import lk.sipsetha.entity.ClassHall;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ClassHallDao extends JpaRepository<ClassHall,Integer> {


/*    @Query(value = "select new ClassHall (ch.id,ch.name)from ClassHall ch where ch.id not in(select chHsChf.classhallfeatures_id from ClassHallHasClassHallFeatures as chHsChf where chHsChf.classhall_id.id=?1)")
//    select ch.id, ch.name from classhall as ch where ch.id not in(select chHsChf.classhallfeatures_id from classhall_has_classhallfeatures as chHsChf where classhall_id)
    public List<ClassHall> getClassHallWithOutFeatures(Integer classHallId);*/
}
