package <%=packageName%>.aop.<%= tenantNameLowerFirst %>;

import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Component;

import java.io.Serializable;

@Component
@Scope(value = "request", proxyMode = ScopedProxyMode.TARGET_CLASS)
public class RequestParam implements Serializable {

    private Long <%= tenantNameLowerFirst %>Id;

    public void set<%= tenantNameUpperFirst %>Id(Long <%= tenantNameLowerFirst %>Id) {
        this.<%= tenantNameLowerFirst %>Id = <%= tenantNameLowerFirst %>Id;
    }

    public Long get<%= tenantNameUpperFirst %>Id() {
        return <%= tenantNameLowerFirst %>Id;
    }
}
