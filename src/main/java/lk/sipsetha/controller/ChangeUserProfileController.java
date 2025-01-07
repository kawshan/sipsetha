package lk.sipsetha.controller;

import lk.sipsetha.dao.UserDao;
import lk.sipsetha.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ChangeUserProfileController {


    @Autowired
    private UserDao userDao;


    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;



    @GetMapping(value = "/loggeduser")
    public User getLoggedUser(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User loggedUser=userDao.getUserByUserName(auth.getName());
        loggedUser.setPassword(null);//password eka null karala front end ekata yawanawa
        return loggedUser;
    }

    @PutMapping(value = "/changeuser")
    public String userUpdate(@RequestBody User user){

        //auto set values
        try {

            User extUser = userDao.getReferenceById(user.getId());  //user wa genna gannwa id eken
            if (user.getPassword()!=null){  //user ge password eka null naththam
                if (bCryptPasswordEncoder.matches(user.getPassword(),extUser.getPassword())){ //api dan db eke save karanne one way pw ekak nisa eka apita normal match karana ba ekata bcrypt encoder eke match function eken thama matcha akaranna puluwan palaveni eka raw password eka deveni eka encrypted pw eka
                    return "user profile change is not completed : password cannot be existing password";
                }else {
                    user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
                }
            }else {
                user.setPassword(extUser.getPassword()); //mekata hethuwa password eka fornt ekd ekata yawwe null karala uda 31 line eka
            }


            System.out.println(user);
            userDao.save(user);
            return "ok";
        }catch (Exception e){
            return "user profile change failure"+e.getMessage();
        }



    }



}
