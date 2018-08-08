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
 * Run method if User service is hit.
 * Filter users based on which company the user is associated with.
 * Skip filter if user has no company
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

@Before(value = "execution(* <%=packageName%>.repository.UserRepository.save(..)) && args(user, ..)")
public void onSave(JoinPoint joinPoint, User user) {
    Optional<String> login = SecurityUtils.getCurrentUserLogin();

    if(<%= tenantNameLowerFirst %>Parameter.get<%= tenantNameUpperFirst %>() != null) {
        user.set<%= tenantNameUpperFirst %>(<%= tenantNameLowerFirst %>Parameter.get<%= tenantNameUpperFirst %>());
    }
}

}
