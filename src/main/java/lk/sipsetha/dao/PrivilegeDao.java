package lk.sipsetha.dao;

import lk.sipsetha.entity.Privilege;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PrivilegeDao extends JpaRepository <Privilege,Integer> {
}
