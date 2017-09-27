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
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { <%= tenantNameUpperFirst %> } from './<%= tenantNameLowerFirst %>.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class <%= tenantNameUpperFirst %>Service {
    private resourceUrl = '<% if (authenticationType === 'uaa') { %><%= uaaBaseName.toLowerCase() %>/<% } %>api/<%= tenantNamePluralLowerFirst %>';

    constructor(private http: Http) { }

    create(<%= tenantNameLowerFirst %>: <%= tenantNameUpperFirst %>): Observable<<%= tenantNameUpperFirst %>> {
        const copy = this.convert(<%= tenantNameLowerFirst %>);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(<%= tenantNameLowerFirst %>: <%= tenantNameUpperFirst %>): Observable<<%= tenantNameUpperFirst %>> {
        const copy = this.convert(<%= tenantNameLowerFirst %>);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<<%= tenantNameUpperFirst %>> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return res.json();
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convert(<%= tenantNameLowerFirst %>: <%= tenantNameUpperFirst %>): <%= tenantNameUpperFirst %> {
        const copy: <%= tenantNameUpperFirst %> = Object.assign({}, <%= tenantNameLowerFirst %>);
        return copy;
    }
}
