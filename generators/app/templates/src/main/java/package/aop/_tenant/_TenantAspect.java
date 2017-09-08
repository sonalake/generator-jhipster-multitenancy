package <%=packageName%>.aop.company;

import <%=packageName%>.security.AuthoritiesConstants;
import <%=packageName%>.security.SecurityUtils;
import <%=packageName%>.repository.UserRepository;
import <%=packageName%>.domain.User;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.hibernate.Filter;

@Aspect
@Component
public class <%= tenantNameUpperFirst %>Aspect {
 
    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private UserRepository userRepository;

    private final String fieldName =  "<%= tenantNameSpinalCased %>Id";

    /**
     * Run method if User service is hit.
     * Filter users based on which <%= tenantNameUpperFirst %> the user is associated with.
     * Skip filter if user has ROLE_ADMIN, they can view all <%= tenantNameUpperFirst %>
     *
     */
    @Before("execution(* com.sonalake.multitenancy.service.UserService.*(..))")
    public void beforeExecution() throws Throwable {
        // admin users results should NOT be filtered
        if (!SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ADMIN)) {
            String login = SecurityUtils.getCurrentUserLogin();
            User user = userRepository.findOneByLogin(login).get();
            Filter filter = entityManager.unwrap(Session.class).enableFilter("USER_FILTER");
            filter.setParameter(fieldName, user.get<%= tenantNameUpperFirst %>().getId());
        }
    }
}