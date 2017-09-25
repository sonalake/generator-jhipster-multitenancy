package <%=packageName%>.aop.company;

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
     * Filter users based on which <%= tenantNameLowerFirst %> the user is associated with.
     * Skip filter if user has no <%= tenantNameLowerFirst %>
     *
     */
    @Before("execution(* <%=packageName%>.repository.UserRepository.*(..))" )
    public void beforeExecution() throws Throwable {
        // filter users results if they have a <%= tenantNameLowerFirst %>
        String login = SecurityUtils.getCurrentUserLogin();
        User user = userRepository.findOneByLogin(login).get();

        if (user.get<%= tenantNameUpperFirst %>() != null) {
            Filter filter = entityManager.unwrap(Session.class).enableFilter("<%= tenantNameUpperCase %>_FILTER");
            filter.setParameter(fieldName, user.get<%= tenantNameUpperFirst %>().getId());
        }
    }
}
