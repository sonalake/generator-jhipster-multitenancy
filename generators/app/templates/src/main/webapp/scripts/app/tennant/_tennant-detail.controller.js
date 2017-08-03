(function() {
    'use strict';

    angular
        .module('<%=angularAppName%>')
        .controller('<%= tennantNameUpperFirst %>DetailController', <%= tennantNameUpperFirst %>DetailController);

    <%= tennantNameUpperFirst %>DetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', '<%= tennantNameUpperFirst %>', 'User'];

    function <%= tennantNameUpperFirst %>DetailController($scope, $rootScope, $stateParams, previousState, entity, <%= tennantNameUpperFirst %>, User) {
        var vm = this;

        vm.<%= tennantNameLowerFirst %> = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('<%=angularAppName%>:<%= tennantNameLowerFirst %>Update', function(event, result) {
            vm.<%= tennantNameLowerFirst %> = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
