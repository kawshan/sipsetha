package lk.sipsetha.dao;

import lk.sipsetha.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserDao extends JpaRepository<User,Integer> {

    //define query for get user by email
    @Query("select u from User u where u.email=?1")
    public User getUserByEmail(String email);


    //define query for get user by user name
    @Query("select u from User u where u.username=?1")
    public User getUserByUserName(String username);

    @Query(value = "select u from User u where u.employee_id.id=?1")
   public User getUserByEmployee(Integer id);

    @Query(value = "select new User (u.id,u.username) from User u where u.id=?1")
    public User getById(Integer id);
}
