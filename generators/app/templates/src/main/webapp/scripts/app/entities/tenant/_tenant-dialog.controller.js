(function() {
    'use strict';

    angular
        .module('<%=angularAppName%>')
        .controller('<%= tenantNameUpperFirst %>DialogController', <%= tenantNameUpperFirst %>DialogController);

    <%= tenantNameUpperFirst %>DialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', '<%= tenantNameUpperFirst %>', 'User'];

    function <%= tenantNameUpperFirst %>DialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, <%= tenantNameUpperFirst %>, User) {
        var vm = this;

        vm.<%= tenantNameLowerFirst %> = entity;
        vm.clear = clear;
        vm.save = save;
        vm.users = User.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.<%= tenantNameLowerFirst %>.id !== null) {
                <%= tenantNameUpperFirst %>.update(vm.<%= tenantNameLowerFirst %>, onSaveSuccess, onSaveError);
            } else {
                <%= tenantNameUpperFirst %>.save(vm.<%= tenantNameLowerFirst %>, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('<%=angularAppName%>:<%= tenantNameLowerFirst %>Update', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.parseUserId = function(str){
            return parseInt(str, 10);
        };
    }
})();
