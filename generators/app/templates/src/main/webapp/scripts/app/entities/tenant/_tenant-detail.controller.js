(function() {
    'use strict';

    angular
        .module('<%=angularAppName%>')
        .controller('<%= tenantNameUpperFirst %>DetailController', <%= tenantNameUpperFirst %>DetailController);

    <%= tenantNameUpperFirst %>DetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', '<%= tenantNameUpperFirst %>', 'User'];

    function <%= tenantNameUpperFirst %>DetailController($scope, $rootScope, $stateParams, previousState, entity, <%= tenantNameUpperFirst %>, User) {
        var vm = this;

        vm.<%= tenantNameLowerFirst %> = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('<%=angularAppName%>:<%= tenantNameLowerFirst %>Update', function(event, result) {
            vm.<%= tenantNameLowerFirst %> = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
