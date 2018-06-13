<%#
 Copyright 2013-2017 the original author or authors from the JHipster project.

 This file is part of the JHipster project, see https://jhipster.github.io/
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
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { <%= tenantNameUpperFirst %> } from './<%= tenantNameLowerFirst %>.model';
import { createRequestOption } from '../../shared';

@Injectable()
export class <%= tenantNameUpperFirst %>Service {
    private resourceUrl = '<% if (authenticationType === 'uaa') { %><%= uaaBaseName.toLowerCase() %>/<% } %>api/<%= tenantNamePluralLowerFirst %>';

    constructor(private http: HttpClient) { }

    create(<%= tenantNameLowerFirst %>: <%= tenantNameUpperFirst %>): Observable<<%= tenantNameUpperFirst %>> {
        const copy = this.convert(<%= tenantNameLowerFirst %>);
        return this.http.post(this.resourceUrl, copy);
    }

    update(<%= tenantNameLowerFirst %>: <%= tenantNameUpperFirst %>): Observable<<%= tenantNameUpperFirst %>> {
        const copy = this.convert(<%= tenantNameLowerFirst %>);
        return this.http.put(this.resourceUrl, copy);
    }

    find(id: number): Observable<<%= tenantNameUpperFirst %>> {
        return this.http.get(`${this.resourceUrl}/${id}`);
    }

    query(req?: any):  Observable<HttpResponse<<%= tenantNameUpperFirst %>[]>> {
        const options = createRequestOption(req);
        return this.http.get<<%= tenantNameUpperFirst %>[]>(this.resourceUrl, { params: options , observe: 'response'});
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convert(<%= tenantNameLowerFirst %>: <%= tenantNameUpperFirst %>): <%= tenantNameUpperFirst %> {
        const copy: <%= tenantNameUpperFirst %> = Object.assign({}, <%= tenantNameLowerFirst %>);
        return copy;
    }
}
