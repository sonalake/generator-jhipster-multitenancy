package <%=packageName%>.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A <%= tenantNameUpperFirst %>.
 */
@Entity
@Table(name = "<%= tenantNameLowerFirst %>")
public class <%= tenantNameUpperFirst %> implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @OneToMany(mappedBy = "<%= tenantNameLowerFirst %>")
    @JsonIgnore
    private Set<User> users = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "<%= tenantNameLowerFirst %>", allowSetters = true)
    private User <%= tenantNameLowerFirst %>Contact;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public <%= tenantNameUpperFirst %> name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<User> getUsers() {
        return users;
    }

    public <%= tenantNameUpperFirst %> users(Set<User> users) {
        this.users = users;
        return this;
    }

    public <%= tenantNameUpperFirst %> addUser(User user) {
        this.users.add(user);
        return this;
    }

    public <%= tenantNameUpperFirst %> removeUser(User user) {
        this.users.remove(user);
        return this;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    public User get<%= tenantNameUpperFirst %>Contact() {
        return <%= tenantNameLowerFirst %>Contact;
    }

    public <%= tenantNameUpperFirst %> <%= tenantNameLowerFirst %>Contact(User user) {
        this.<%= tenantNameLowerFirst %>Contact = user;
        return this;
    }

    public void set<%= tenantNameUpperFirst %>Contact(User user) {
        this.<%= tenantNameLowerFirst %>Contact = user;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        <%= tenantNameUpperFirst %> <%= tenantNameLowerFirst %> = (<%= tenantNameUpperFirst %>) o;
        if (<%= tenantNameLowerFirst %>.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, <%= tenantNameLowerFirst %>.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "<%= tenantNameUpperFirst %>{" +
            "id=" + id +
            ", name='" + name + "'" +
            '}';
    }
}
