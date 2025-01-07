package lk.sipsetha.controller;

import lk.sipsetha.dao.ModuleDao;
import lk.sipsetha.entity.Module;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/module")
public class ModuleController {

    @Autowired
    private ModuleDao moduleDao;

    @GetMapping(value = "/findall")
    public List<Module> moduleFindAll(){
        return moduleDao.findAll();
    }
}
