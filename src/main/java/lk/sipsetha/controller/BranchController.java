package lk.sipsetha.controller;

import lk.sipsetha.dao.BranchDao;
import lk.sipsetha.entity.Branch;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/branch")
public class BranchController {

    @Autowired
    private BranchDao dao;

    @GetMapping(value = "/findall")
    public List<Branch> getAllBranch(){
        return dao.findAll();
    }
}
