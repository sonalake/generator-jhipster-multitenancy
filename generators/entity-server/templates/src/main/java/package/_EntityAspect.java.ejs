package <%=packageName%>.aop.<%= tenantNameLowerFirst %>;

import <%=packageName%>.repository.<%= entityClass %>Repository;
import <%=packageName%>.security.SecurityUtils;
import <%=packageName%>.repository.UserRepository;
import <%=packageName%>.domain.User;
import <%=packageName%>.domain.<%= entityClass %>;
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
import java.util.List;
import org.springframework.data.domain.Example;
import org.aspectj.lang.annotation.AfterReturning;

@Aspect
@Component
public class <%= entityClass %>Aspect {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private <%= entityClass %>Repository <%= entityInstance %>Repository;

    /**
     * Run method if <%= entityClass %> repository save is hit.
     * Adds tenant information to entity.
     */
    @Before(value = "execution(* <%=packageName%>.repository.<%= entityClass %>Repository.save(..)) && args(<%= entityInstance %>, ..)")
    public void onSave(JoinPoint joinPoint, <%= entityClass %> <%= entityInstance %>) {
        Optional<String> login = SecurityUtils.getCurrentUserLogin();

        if(login.isPresent()) {
            User loggedInUser = userRepository.findOneByLogin(login.get()).get();

            if (loggedInUser.get<%= tenantNameUpperFirst %>() != null) {
                <%= entityInstance %>.set<%= tenantNameUpperFirst %>(loggedInUser.get<%= tenantNameUpperFirst %>());
            }
        }
    }

    /**
     * Run method if <%= entityClass %> repository deleteById is hit.
     * Verify if tenant owns the <%= entityInstance %> before delete.
     */
    @Before(value = "execution(* <%=packageName%>.repository.<%= entityClass %>Repository.deleteById(..)) && args(id, ..)")
    public void onDelete(JoinPoint joinPoint, Long id) {
        Optional<String> login = SecurityUtils.getCurrentUserLogin();

        if(login.isPresent()) {
            User loggedInUser = userRepository.findOneByLogin(login.get()).get();

            if (loggedInUser.get<%= tenantNameUpperFirst %>() != null) {
                <%= entityClass %> <%= entityInstance %> = <%= entityInstance %>Repository.findById(id).get();
                if(<%= entityInstance %>.get<%= tenantNameUpperFirst %>() != loggedInUser.get<%= tenantNameUpperFirst %>()){
                    throw new NoSuchElementException();
                }
            }
        }
    }

    /**
     * Run method if <%= entityClass %> repository findById is returning.
     * Adds filtering to prevent display of information from another tenant.
     */
    @Around("execution(* <%=packageName%>.repository.<%= entityClass %>Repository.findById(..)) && args(id, ..)")
    public Object onFindById(ProceedingJoinPoint pjp, Long id) throws Throwable {
        Optional<String> login = SecurityUtils.getCurrentUserLogin();

        Optional<<%= entityClass %>> optional = (Optional<<%= entityClass %>>) pjp.proceed();
        if(login.isPresent())
        {
            User loggedInUser = userRepository.findOneByLogin(login.get()).get();

            if (loggedInUser.get<%= tenantNameUpperFirst %>() != null) {
                if(optional.isPresent() && optional.get().get<%= tenantNameUpperFirst %>() != loggedInUser.get<%= tenantNameUpperFirst %>()){
                    throw new NoSuchElementException();
                }
            }
        }
        return optional;
    }

    /**
     * Run method around <%= entityClass %> service findAll.
     * Adds filtering to prevent display of information from another tenant before database query (less performance hit).
     */
    @Around("execution(* <%=packageName%>.service.<%= entityClass %>Service.findAll())")
    public Object onFindAll(ProceedingJoinPoint pjp) throws Throwable {
        Optional<String> login = SecurityUtils.getCurrentUserLogin();

        if(login.isPresent())
        {
            User loggedInUser = userRepository.findOneByLogin(login.get()).get();

            if (loggedInUser.get<%= tenantNameUpperFirst %>() != null) {
                <%= entityClass %> example = new <%= entityClass %>();
                example.set<%= tenantNameUpperFirst %>(loggedInUser.get<%= tenantNameUpperFirst %>());
                List<<%= entityClass %>> <%= entityInstancePlural %> = <%= entityInstance %>Repository.findAll(Example.of(example));
                return <%= entityInstancePlural %>;
            }
        }
        return pjp.proceed();
    }
}
