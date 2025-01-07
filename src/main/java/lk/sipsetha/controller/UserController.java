package lk.sipsetha.controller;

import lk.sipsetha.dao.UserDao;
import lk.sipsetha.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping(value = "/user")
public class UserController {
    @Autowired
    private UserDao userDao;

    @GetMapping(value = "/userform")
    public ModelAndView userView(){
        ModelAndView userView = new ModelAndView();
        userView.setViewName("user.html");
        return userView;
    }

    @GetMapping(value = "/findall")
    public List<User> findAll(){
        return userDao.findAll();
    }

}
