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
/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { <%=angularXAppName%>TestModule } from '../../test.module';
import { MockActivatedRoute } from '../../helpers/mock-route.service';
import { <%= tenantNameUpperFirst %>MgmtDetailComponent } from '../../../../../main/webapp/app/admin/<%= tenantNameLowerFirst %>-management/<%= tenantNameLowerFirst %>-management-detail.component';
import { <%= tenantNameUpperFirst %>Service } from '../../../../../main/webapp/app/admin/<%= tenantNameLowerFirst %>-management/<%= tenantNameLowerFirst %>.service';
import { <%= tenantNameUpperFirst %> } from '../../../../../main/webapp/app/admin/<%= tenantNameLowerFirst %>-management/<%= tenantNameLowerFirst %>.model';

describe('Component Tests', () => {

    describe('<%= tenantNameUpperFirst %> Management Detail Component', () => {
        let comp: <%= tenantNameUpperFirst %>MgmtDetailComponent;
        let fixture: ComponentFixture<<%= tenantNameUpperFirst %>MgmtDetailComponent>;
        let service: <%= tenantNameUpperFirst %>Service;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [<%=angularXAppName%>TestModule],
                declarations: [<%= tenantNameUpperFirst %>MgmtDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    <%= tenantNameUpperFirst %>Service,
                    JhiEventManager
                ]
            }).overrideTemplate(<%= tenantNameUpperFirst %>MgmtDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(<%= tenantNameUpperFirst %>MgmtDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(<%= tenantNameUpperFirst %>Service);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new <%= tenantNameUpperFirst %>(<%_
            if (databaseType === 'sql' || databaseType === 'no') { %>10<% } else if (databaseType === 'mongodb' || databaseType === 'cassandra') { %>'aaa'<% } %>)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.<%= tenantNameLowerFirst %>).toEqual(jasmine.objectContaining({id: <%
            if (databaseType === 'sql' || databaseType === 'no') { %>10<% } else if (databaseType === 'mongodb' || databaseType === 'cassandra') { %>'aaa'<% } %>}));
            });
        });
    });

});
