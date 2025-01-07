package lk.sipsetha;

import lk.sipsetha.dao.EmployeeDao;
import lk.sipsetha.dao.RoleDao;
import lk.sipsetha.dao.UserDao;
import lk.sipsetha.entity.Role;
import lk.sipsetha.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
@RestController	//to handle urls without this no html s can load
public class SipsethaApplication {

	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	@Autowired
	private EmployeeDao employeeDao;

	@Autowired
	private RoleDao roleDao;

	@Autowired
	private UserDao userDao;


	public static void main(String[] args) {
		SpringApplication.run(SipsethaApplication.class, args);

		System.out.println("⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐");
		System.out.println("⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐");
		System.out.println("⭐⭐⭐⭐⭐    application started  ⭐⭐⭐⭐⭐⭐⭐");
		System.out.println("⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐");
		System.out.println("⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐");

	}

	@GetMapping(value = "/createadmin")
	public String generateAdmin(){
		User adminUser =new User();
		adminUser.setUsername("Admin");
		adminUser.setPassword(bCryptPasswordEncoder.encode("12345"));
		adminUser.setEmail("admin@gmail.com");
		adminUser.setStatus(true);
		adminUser.setAddeddatetime(LocalDateTime.now());

		adminUser.setEmployee_id(employeeDao.getReferenceById(1));

		Set<Role> roles = new HashSet<Role>();
		roles.add(roleDao.getReferenceById(1));
		adminUser.setRoles(roles);

		userDao.save(adminUser);



		return "<script> window.location.replace('http://localhost:8080/login'); </script>";
	}

}
