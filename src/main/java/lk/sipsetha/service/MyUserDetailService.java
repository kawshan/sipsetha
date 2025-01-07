package lk.sipsetha.service;

import jakarta.transaction.Transactional;
import lk.sipsetha.dao.UserDao;
import lk.sipsetha.entity.Role;
import lk.sipsetha.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service

public class MyUserDetailService implements UserDetailsService {

    @Autowired
    private UserDao userDao;



    @Transactional
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println(username);
        User extUser = userDao.getUserByUserName(username);
        System.out.println(extUser.getUsername());
        ArrayList<GrantedAuthority> grantedAuthorities = new ArrayList<GrantedAuthority>();
        for (Role role:extUser.getRoles()){
            grantedAuthorities.add(new SimpleGrantedAuthority(role.getName()));

        }
        UserDetails user = new org.springframework.security.core.userdetails.User(extUser.getUsername(),extUser.getPassword(),extUser.getStatus(),true,true,true,grantedAuthorities);
        return user;
    }

}
