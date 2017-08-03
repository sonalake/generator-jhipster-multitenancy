package <%=packageName%>.repository;

import <%=packageName%>.domain.<%= tennantNameUpperFirst %>;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the <%= tennantNameLowerFirst %> entity.
 */
@SuppressWarnings("unused")
public interface <%= tennantNameUpperFirst %>Repository extends JpaRepository<<%= tennantNameUpperFirst %>,Long> {

    @Query("select <%= tennantNameLowerFirst %> from <%= tennantNameUpperFirst %> <%= tennantNameLowerFirst %> where <%= tennantNameLowerFirst %>.<%= tennantNameLowerFirst %>Contact.login = ?#{principal.username}")
    List<<%= tennantNameUpperFirst %>> findBy<%= tennantNameUpperFirst %>ContactIsCurrentUser();

}
