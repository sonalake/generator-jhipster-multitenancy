package <%=packageName%>.aop.<%= tenantNameLowerFirst %>;

import <%=packageName%>.security.SecurityUtils;
import <%=packageName%>.repository.UserRepository;
import <%=packageName%>.domain.User;
import <%=packageName%>.service.dto.UserDTO;
import <%=packageName%>.domain.<%= tenantNameUpperFirst %>Parameter;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.hibernate.Session;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.hibernate.Filter;
import java.util.Optional;
import java.util.NoSuchElementException;

@Aspect
@Component
public class UserAspect {

@Autowired
private UserRepository userRepository;

@Autowired
private <%= tenantNameUpperFirst %>Parameter <%= tenantNameLowerFirst %>Parameter;

private final String fieldName =  "<%= tenantNameSpinalCased %>Id";

private final Logger log = LoggerFactory.getLogger(UserAspect.class);

    /**
     * Run method if User service createUser is hit.
     * Stores tenant information from DTO.
     */
    @Before(value = "execution(* <%=packageName%>.service.UserService.createUser(..)) && args(userDTO, ..)")
    public void onCreateUser(JoinPoint joinPoint, UserDTO userDTO) throws Throwable {
        Optional<String> login = SecurityUtils.getCurrentUserLogin();

        if(login.isPresent()) {
            User loggedInUser = userRepository.findOneByLogin(login.get()).get();

            if (loggedInUser.get<%= tenantNameUpperFirst %>() != null) {
                <%= tenantNameLowerFirst %>Parameter.set<%= tenantNameUpperFirst %>(loggedInUser.get<%= tenantNameUpperFirst %>());
            }
            else{
                <%= tenantNameLowerFirst %>Parameter.set<%= tenantNameUpperFirst %>(userDTO.get<%= tenantNameUpperFirst %>());
            }
        }
    }

    /**
     * Run method if User service updateUser is hit.
     * Adds tenant information to DTO.
     */
    @Before(value = "execution(*  <%=packageName%>.service.UserService.updateUser(..)) && args(userDTO, ..)")
    public void onUpdateUser(JoinPoint joinPoint, UserDTO userDTO)
    {
        Optional<String> login = SecurityUtils.getCurrentUserLogin();

        if (login.isPresent())
        {
            User loggedInUser = userRepository.findOneByLogin(login.get()).get();
            User user = userRepository.findById(userDTO.getId()).get();

            if (loggedInUser.get<%= tenantNameUpperFirst %>() != null)
            {
                user.set<%= tenantNameUpperFirst %>(loggedInUser.get<%= tenantNameUpperFirst %>());
            }
            else
            {
                user.set<%= tenantNameUpperFirst %>(userDTO.get<%= tenantNameUpperFirst %>());
            }

            log.debug("Changed <%= tenantNameUpperFirst %> for User: {}", user);
        }
    }

    /**
     * Run method if User repository save is hit.
     * Adds tenant information to DTO.
     */
    @Before(value = "execution(* <%=packageName%>.repository.UserRepository.save(..)) && args(user, ..)")
    public void onSave(JoinPoint joinPoint, User user) {
        Optional<String> login = SecurityUtils.getCurrentUserLogin();

        if(<%= tenantNameLowerFirst %>Parameter.get<%= tenantNameUpperFirst %>() != null) {
            user.set<%= tenantNameUpperFirst %>(<%= tenantNameLowerFirst %>Parameter.get<%= tenantNameUpperFirst %>());
        }
    }

    /**
     * Run method if User service getUserWithAuthoritiesByLogin is hit.
     * Adds filtering to prevent display of information from another tenant
     */
    @Before(value = "execution(* <%=packageName%>.service.UserService.getUserWithAuthoritiesByLogin(..)) && args(login, ..)")
    public void onGetUserWithAuthoritiesByLogin(JoinPoint joinPoint, String login) throws Exception {
        Optional<String> currentLogin = SecurityUtils.getCurrentUserLogin();

        if(currentLogin.isPresent()) {
            User loggedInUser = userRepository.findOneByLogin(currentLogin.get()).get();

            if (loggedInUser.get<%= tenantNameUpperFirst %>() != null) {
                User user = userRepository.findOneWithAuthoritiesByLogin(login).get();

                if(!user.get<%= tenantNameUpperFirst %>().equals(loggedInUser.get<%= tenantNameUpperFirst %>())){
                    throw new NoSuchElementException();
                }
            }
        }
    }

    /**
     * Run method if User service getUserWithAuthorities is hit.
     * Adds filtering to prevent display of information from another tenant
     */
    @Before(value = "execution(* <%=packageName%>.service.UserService.getUserWithAuthorities(..)) && args(id, ..)")
    public void onGetUserWithAuthorities(JoinPoint joinPoint, Long id) throws Exception {
        Optional<String> currentLogin = SecurityUtils.getCurrentUserLogin();

        if(currentLogin.isPresent()) {
            User loggedInUser = userRepository.findOneByLogin(currentLogin.get()).get();

            if (loggedInUser.get<%= tenantNameUpperFirst %>() != null) {
                User user = userRepository.findOneWithAuthoritiesById(id).get();

                if(!user.get<%= tenantNameUpperFirst %>().equals(loggedInUser.get<%= tenantNameUpperFirst %>())){
                    throw new NoSuchElementException();
                }
            }
        }
    }


}
