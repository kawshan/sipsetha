package lk.sipsetha.controller;

import lk.sipsetha.dao.UserDao;
import lk.sipsetha.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping(value = "/user")
public class UserController {
    @Autowired
    private UserDao userDao;

    @GetMapping(value = "/userform")
    public ModelAndView userView(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        ModelAndView userView = new ModelAndView();
        userView.setViewName("user.html");
        userView.addObject("loggedusername",auth.getName());
        userView.addObject("title","user management");
        return userView;
    }

    @GetMapping(value = "/findall")
    public List<User> findAll(){
        return userDao.findAll();
    }



    @PostMapping
    public String saveUser(@RequestBody User user){
        //authentication and authorization
        //check duplicate
        //operator
        try {
            //auto set values
            user.setAddeddatetime(LocalDateTime.now());
            userDao.save(user);
            return "ok";
        }catch (Exception e){
            return "user save not completed "+e.getMessage();
        }
    }

    @PutMapping
    public String updateUser(@RequestBody User user){
        //authentication and authorization

        //existing and duplicate check
        User extUser = userDao.getReferenceById(user.getId());
        if (extUser==null){
            return "user not exist";
        }
        User extUserEmail = userDao.getUserByEmail(user.getEmail());
        if (extUserEmail != null && extUserEmail.getId() != user.getId()){
            return "email already exist";
        }
        try {

            userDao.save(user);
            return "ok";
        }catch (Exception e){
            return "user update not complete. please check again"+e.getMessage();
        }


    }

    @DeleteMapping
    public String deleteUser(@RequestBody User user){
        //authentication and authorization
        //existing check

//        User extUser = userDao.getReferenceById(user.getId());
//        if (extUser == null){
//            return "user delete not success. user not exists.";
//        }
        try{
            //operations
            //userDao.delete(user); this is hard delete ->this directly removes user record form database
            user.setStatus(false);  //this is soft delete -> in here we only set user status to false
            userDao.save(user);
            return "ok";
        }catch (Exception e){
            return "user delete not completed please check again"+e.getMessage();
        }


    }



}
