package lk.sipsetha.dao;

import lk.sipsetha.entity.ClassHall;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ClassHallDao extends JpaRepository<ClassHall,Integer> {

    @Query(value = "select ch from ClassHall ch where ch.name=?1")
    public ClassHall getClasshallByName(String classhall);

}
