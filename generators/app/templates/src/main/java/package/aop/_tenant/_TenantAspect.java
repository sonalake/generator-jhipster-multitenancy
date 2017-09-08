package <%=packageName%>.aop.company;

import <%=packageName%>.service.UserService;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Aspect
@Component
public class <%= tenantNameUpperFirst %>Aspect {
 
    @PersistenceContext
    private EntityManager entityManager;
    /**
     * Run method if either a class or a method is annotated with `@UserFilter`
     * Filter users based on which <%= tenantNameUpperFirst %> the user is associated with.
     * Skip filter if user has ROLE_ADMIN, they can view all <%= tenantNameUpperFirst %>
     *
     * @param pjp
     * @return
     * @throws Throwable
     */
    @Before("execution(* com.sonalake.multitenancy.service.UserService.*(..))")
    public void aroundExecution(JoinPoint pjp, UserService userService) throws Throwable {
    }
}