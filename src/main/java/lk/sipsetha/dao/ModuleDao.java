package lk.sipsetha.dao;

import lk.sipsetha.entity.Module;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ModuleDao extends JpaRepository <Module,Integer> {
}
