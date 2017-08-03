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
 * A <%= tennantNameUpperFirst %>.
 */
@Entity
@Table(name = "<%= tennantNameLowerFirst %>")
public class <%= tennantNameUpperFirst %> implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @OneToMany(mappedBy = "<%= tennantNameLowerFirst %>")
    @JsonIgnore
    private Set<User> users = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "<%= tennantNameLowerFirst %>", allowSetters = true)
    private User <%= tennantNameLowerFirst %>Contact;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public <%= tennantNameUpperFirst %> name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<User> getUsers() {
        return users;
    }

    public <%= tennantNameUpperFirst %> users(Set<User> users) {
        this.users = users;
        return this;
    }

    public <%= tennantNameUpperFirst %> addUser(User user) {
        this.users.add(user);
        return this;
    }

    public <%= tennantNameUpperFirst %> removeUser(User user) {
        this.users.remove(user);
        return this;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    public User get<%= tennantNameUpperFirst %>Contact() {
        return <%= tennantNameLowerFirst %>Contact;
    }

    public <%= tennantNameUpperFirst %> <%= tennantNameLowerFirst %>Contact(User user) {
        this.<%= tennantNameLowerFirst %>Contact = user;
        return this;
    }

    public void set<%= tennantNameUpperFirst %>Contact(User user) {
        this.<%= tennantNameLowerFirst %>Contact = user;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        <%= tennantNameUpperFirst %> <%= tennantNameLowerFirst %> = (<%= tennantNameUpperFirst %>) o;
        if (<%= tennantNameLowerFirst %>.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, <%= tennantNameLowerFirst %>.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "<%= tennantNameUpperFirst %>{" +
            "id=" + id +
            ", name='" + name + "'" +
            '}';
    }
}
