(function() {
    'use strict';

    angular
        .module('<%=angularAppName%>')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('<%= tennantNameSpinalCased %>', {
            parent: 'entity',
            url: '/<%= tennantNameSpinalCased %>',
            data: {
                authorities: ['ROLE_ADMIN'],
                pageTitle: '<%=angularAppName%>.<%= tennantNameLowerFirst %>.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/<%= tennantNameSpinalCased %>/<%= tennantNamePluralLowerFirst %>.html',
                    controller: '<%= tennantNameUpperFirst %>Controller',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('<%= tennantNameLowerFirst %>');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('<%= tennantNameSpinalCased %>-detail', {
            parent: '<%= tennantNameSpinalCased %>',
            url: '/view/{id}',
            data: {
                authorities: ['ROLE_ADMIN'],
                pageTitle: '<%=angularAppName%>.<%= tennantNameLowerFirst %>.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/<%= tennantNameSpinalCased %>/<%= tennantNameSpinalCased %>-detail.html',
                    controller: '<%= tennantNameUpperFirst %>DetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('<%= tennantNameLowerFirst %>');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', '<%= tennantNameUpperFirst %>', function($stateParams, <%= tennantNameUpperFirst %>) {
                    return <%= tennantNameUpperFirst %>.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || '<%= tennantNameLowerFirst %>',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('<%= tennantNameSpinalCased %>-detail.edit', {
            parent: '<%= tennantNameSpinalCased %>-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/<%= tennantNameSpinalCased %>/<%= tennantNameSpinalCased %>-dialog.html',
                    controller: '<%= tennantNameUpperFirst %>DialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['<%= tennantNameUpperFirst %>', function(<%= tennantNameUpperFirst %>) {
                            return <%= tennantNameUpperFirst %>.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('<%= tennantNameSpinalCased %>.new', {
            parent: '<%= tennantNameSpinalCased %>',
            url: '/new',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/<%= tennantNameSpinalCased %>/<%= tennantNameSpinalCased %>-dialog.html',
                    controller: '<%= tennantNameUpperFirst %>DialogController',
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
                    $state.go('<%= tennantNameSpinalCased %>', null, { reload: '<%= tennantNameSpinalCased %>' });
                }, function() {
                    $state.go('<%= tennantNameSpinalCased %>');
                });
            }]
        })
        .state('<%= tennantNameSpinalCased %>.edit', {
            parent: '<%= tennantNameSpinalCased %>',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/<%= tennantNameSpinalCased %>/<%= tennantNameSpinalCased %>-dialog.html',
                    controller: '<%= tennantNameUpperFirst %>DialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['<%= tennantNameUpperFirst %>', function(<%= tennantNameUpperFirst %>) {
                            return <%= tennantNameUpperFirst %>.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('<%= tennantNameSpinalCased %>', null, { reload: '<%= tennantNameSpinalCased %>' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('<%= tennantNameSpinalCased %>.delete', {
            parent: '<%= tennantNameSpinalCased %>',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/<%= tennantNameSpinalCased %>/<%= tennantNameSpinalCased %>-delete-dialog.html',
                    controller: '<%= tennantNameUpperFirst %>DeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['<%= tennantNameUpperFirst %>', function(<%= tennantNameUpperFirst %>) {
                            return <%= tennantNameUpperFirst %>.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('<%= tennantNameSpinalCased %>', null, { reload: '<%= tennantNameSpinalCased %>' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
