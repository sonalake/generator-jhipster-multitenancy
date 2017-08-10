(function() {
    'use strict';

    angular
        .module('<%=angularAppName%>')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('<%= tenantNameSpinalCased %>', {
            parent: 'entity',
            url: '/<%= tenantNameSpinalCased %>',
            data: {
                authorities: ['ROLE_ADMIN'],
                pageTitle: '<%=angularAppName%>.<%= tenantNameLowerFirst %>.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/<%= tenantNameSpinalCased %>/<%= tenantNamePluralLowerFirst %>.html',
                    controller: '<%= tenantNameUpperFirst %>Controller',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('<%= tenantNameLowerFirst %>');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('<%= tenantNameSpinalCased %>-detail', {
            parent: '<%= tenantNameSpinalCased %>',
            url: '/view/{id}',
            data: {
                authorities: ['ROLE_ADMIN'],
                pageTitle: '<%=angularAppName%>.<%= tenantNameLowerFirst %>.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/<%= tenantNameSpinalCased %>/<%= tenantNameSpinalCased %>-detail.html',
                    controller: '<%= tenantNameUpperFirst %>DetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('<%= tenantNameLowerFirst %>');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', '<%= tenantNameUpperFirst %>', function($stateParams, <%= tenantNameUpperFirst %>) {
                    return <%= tenantNameUpperFirst %>.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || '<%= tenantNameLowerFirst %>',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('<%= tenantNameSpinalCased %>-detail.edit', {
            parent: '<%= tenantNameSpinalCased %>-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/<%= tenantNameSpinalCased %>/<%= tenantNameSpinalCased %>-dialog.html',
                    controller: '<%= tenantNameUpperFirst %>DialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['<%= tenantNameUpperFirst %>', function(<%= tenantNameUpperFirst %>) {
                            return <%= tenantNameUpperFirst %>.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('<%= tenantNameSpinalCased %>.new', {
            parent: '<%= tenantNameSpinalCased %>',
            url: '/new',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/<%= tenantNameSpinalCased %>/<%= tenantNameSpinalCased %>-dialog.html',
                    controller: '<%= tenantNameUpperFirst %>DialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('<%= tenantNameSpinalCased %>', null, { reload: '<%= tenantNameSpinalCased %>' });
                }, function() {
                    $state.go('<%= tenantNameSpinalCased %>');
                });
            }]
        })
        .state('<%= tenantNameSpinalCased %>.edit', {
            parent: '<%= tenantNameSpinalCased %>',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/<%= tenantNameSpinalCased %>/<%= tenantNameSpinalCased %>-dialog.html',
                    controller: '<%= tenantNameUpperFirst %>DialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['<%= tenantNameUpperFirst %>', function(<%= tenantNameUpperFirst %>) {
                            return <%= tenantNameUpperFirst %>.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('<%= tenantNameSpinalCased %>', null, { reload: '<%= tenantNameSpinalCased %>' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('<%= tenantNameSpinalCased %>.delete', {
            parent: '<%= tenantNameSpinalCased %>',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/<%= tenantNameSpinalCased %>/<%= tenantNameSpinalCased %>-delete-dialog.html',
                    controller: '<%= tenantNameUpperFirst %>DeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['<%= tenantNameUpperFirst %>', function(<%= tenantNameUpperFirst %>) {
                            return <%= tenantNameUpperFirst %>.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('<%= tenantNameSpinalCased %>', null, { reload: '<%= tenantNameSpinalCased %>' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
