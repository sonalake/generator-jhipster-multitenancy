package <%=packageName%>.aop.<%= tenantNameLowerFirst %>;

import <%=packageName%>.security.SecurityUtils;
import <%=packageName%>.repository.UserRepository;
import <%=packageName%>.domain.User;
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

@Aspect
@Component
public class <%= tenantNameUpperFirst %>Aspect {

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private UserRepository userRepository;

    private final String fieldName =  "<%= tenantNameSpinalCased %>Id";

    private final Logger log = LoggerFactory.getLogger(<%= tenantNameUpperFirst %>Aspect.class);

    /**
     * Run method if User service is hit.
     * Filter users based on which <%= tenantNameLowerCase %> the user is associated with.
     * Skip filter if user has no <%= tenantNameLowerCase %>
     */
    <%- tenantisedEntityServices %>
    public void beforeExecution() throws Throwable {
        String login = SecurityUtils.getCurrentUserLogin().get();

		if(login != null) {
			User user = userRepository.findOneByLogin(login).get();

			if (user.get<%= tenantNameUpperFirst %>() != null) {
				Filter filter = entityManager.unwrap(Session.class).enableFilter("<%= tenantNameUpperCase %>_FILTER");
				filter.setParameter(fieldName, user.get<%= tenantNameUpperFirst %>().getId());
			}
		}
    }
}
