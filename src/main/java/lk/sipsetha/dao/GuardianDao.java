package lk.sipsetha.dao;

import lk.sipsetha.entity.Guardian;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface GuardianDao extends JpaRepository<Guardian,Integer> {


    @Query(value = "select g from Guardian g where g.nic=?1")
    public Guardian getGuardianByByNic(String nic);
}
