package <%=packageName%>.aop.<%= tenantNameLowerFirst %>;

import <%=packageName%>.security.SecurityUtils;
import <%=packageName%>.repository.UserRepository;
import <%=packageName%>.domain.User;
import <%=packageName%>.domain.<%= entityNameUpperFirst %>;
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
public class <%= entityNameUpperFirst %>Aspect {

    @Autowired
    private UserRepository userRepository;

    @Before(value = "execution(* <%=packageName%>.repository.<%= entityNameUpperFirst %>Repository.save(..)) && args(<%= entityNameLowerFirst %>, ..)")
    public void onSave(JoinPoint joinPoint, <%= entityNameUpperFirst %> <%= entityNameLowerFirst %>) {
        Optional<String> login = SecurityUtils.getCurrentUserLogin();

        if(login.isPresent()) {
            User loggedInUser = userRepository.findOneByLogin(login.get()).get();

            if (loggedInUser.get<%= tenantNameUpperFirst %>() != null) {
                <%= entityNameLowerFirst %>.set<%= tenantNameUpperFirst %>(loggedInUser.get<%= tenantNameUpperFirst %>());
            }
        }
    }
}
