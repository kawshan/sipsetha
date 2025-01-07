package lk.sipsetha.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class WebConfiguration {


    private BCryptPasswordEncoder bCryptPasswordEncoder;


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.authorizeHttpRequests(auth -> {
            auth
                    .requestMatchers("/bootstrap-5.2.3/**","/commonjs/**","/controllerjs/**","/fontawesome-free-6.4.2/**","/icons/**","/images/**","/style/**").permitAll()
                    .requestMatchers("/createadmin").permitAll()
                    .requestMatchers("/login").permitAll()
                    .requestMatchers("/error").permitAll()
                    .requestMatchers("/dashboard").hasAnyAuthority("admin","manager","assistant-manager","cashier","employee")
                    .requestMatchers("/privilege/**").hasAnyAuthority("admin","manager","assistant-manager","cashier","card-checker")//methana danna une api privilege controller eke privilege module ekata privilege thiyenawada balannath privilege check karana nisa?
                    .requestMatchers("/user/**").hasAnyAuthority("admin","manager","assistant-manager")
                    .requestMatchers("/employee/**").hasAnyAuthority("admin","manager","assistant-manager")
                    .requestMatchers("/student/**").hasAnyAuthority("admin","manager","assistant-manager","cashier")
                    .requestMatchers("/guardian/**").hasAnyAuthority("admin","manager","assistant-manager","cashier")
                    .requestMatchers("/studentregistration/**").hasAnyAuthority("admin","manager","assistant-manager","cashier")
                    .requestMatchers("/payment/**").hasAnyAuthority("admin","manager","assistant-manager","cashier")
                    .requestMatchers("/attendance/**").hasAnyAuthority("admin","manager","assistant-manager","cashier","card-checker")
                    .requestMatchers("/classhall/**").hasAnyAuthority("admin","manager","assistant-manager")
                    .requestMatchers("/classroomallocation/**").hasAnyAuthority("admin","manager","assistant-manager")
                    .requestMatchers("/teacher/**").hasAnyAuthority("admin","manager","assistant-manager")
                    .requestMatchers("/classoffering/**").hasAnyAuthority("admin","manager","assistant-manager","cashier")
                    .requestMatchers("/teacherpayment/**").hasAnyAuthority("admin","manager","assistant-manager")
                    .anyRequest().authenticated();
        })
                .formLogin(login->{
                    login.
                            loginPage("/login")
                            .defaultSuccessUrl("/dashboard",true)
                            .failureUrl("/login?error=usernamepassworderror")
                            .usernameParameter("username")
                            .passwordParameter("password");

                })
                .logout(logout->{
                    logout
                            .logoutUrl("/logout")
                            .logoutSuccessUrl("/login");
                })
                .exceptionHandling(exception->{
                    exception.accessDeniedPage("/error");
                })
                .csrf(csrf->{
                    csrf.disable();
                    //url eke pamanayi request wada krananne
                    // default enable
                    // meka disable kare naththam js file athule ajax service access karanna ba
                });
        return httpSecurity.build();

    }

    @Bean   //bcrypt eka class ekek vidihata hadagannawa apita instance ekek one hinda...
    public BCryptPasswordEncoder bCryptPasswordEncoder2(){
        bCryptPasswordEncoder = new BCryptPasswordEncoder();
        return bCryptPasswordEncoder;
    }


}
