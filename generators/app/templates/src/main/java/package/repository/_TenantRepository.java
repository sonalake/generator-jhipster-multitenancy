<%#
 Copyright 2013-2018 the original author or authors from the JHipster project.

 This file is part of the JHipster project, see https://www.jhipster.tech/
 for more information.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
-%>
package <%=packageName%>.repository;
import <%=packageName%>.domain.<%= tenantNameUpperFirst %>;

import org.springframework.stereotype.Repository;
<%_ if (databaseType === 'sql') { _%>
import org.springframework.data.jpa.repository.*;
<%_ } _%>

import org.springframework.data.repository.query.Param;

import java.util.Optional;

/**
 * Spring Data JPA repository for the <%= tenantNameUpperFirst %> entity.
 */
@SuppressWarnings("unused")
@Repository
public interface <%= tenantNameUpperFirst %>Repository extends JpaRepository<<%= tenantNameUpperFirst %>, Long> {

    @Query("SELECT c FROM <%= tenantNameUpperFirst %> c JOIN FETCH c.users u WHERE c.id = (:id)")
    public Optional<<%= tenantNameUpperFirst %>> findOneAndFetchUsersEagerly(@Param("id") Long id);
}
