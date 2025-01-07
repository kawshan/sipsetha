package lk.sipsetha.dao;

import lk.sipsetha.entity.Guardian;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GuardianDao extends JpaRepository<Guardian,Integer> {
}
