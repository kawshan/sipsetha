package lk.sipsetha.dao;

import lk.sipsetha.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserDao extends JpaRepository<User,Integer> {

    //define query for get user by email
    @Query("select u from User u where u.email=?1")
    public User getUserByEmail(String email);

}
