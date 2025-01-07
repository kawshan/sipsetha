package lk.sipsetha.controller;

import lk.sipsetha.dao.RoleDao;
import lk.sipsetha.entity.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/role")
public class RoleController {

    @Autowired
    private RoleDao roleDao;

    @GetMapping(value = "/findall")
    public List<Role> roleFindAll(){
        return roleDao.findAll();
    }

}
