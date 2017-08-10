package <%=packageName%>.repository;

import <%=packageName%>.domain.<%= tenantNameUpperFirst %>;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the <%= tenantNameLowerFirst %> entity.
 */
@SuppressWarnings("unused")
public interface <%= tenantNameUpperFirst %>Repository extends JpaRepository<<%= tenantNameUpperFirst %>,Long> {

    @Query("select <%= tenantNameLowerFirst %> from <%= tenantNameUpperFirst %> <%= tenantNameLowerFirst %> where <%= tenantNameLowerFirst %>.<%= tenantNameLowerFirst %>Contact.login = ?#{principal.username}")
    List<<%= tenantNameUpperFirst %>> findBy<%= tenantNameUpperFirst %>ContactIsCurrentUser();

}
