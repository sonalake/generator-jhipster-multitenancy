(function() {
    'use strict';

    angular
        .module('<%=angularAppName%>')
        .controller('<%= tennantNameUpperFirst %>DialogController', <%= tennantNameUpperFirst %>DialogController);

    <%= tennantNameUpperFirst %>DialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', '<%= tennantNameUpperFirst %>', 'User'];

    function <%= tennantNameUpperFirst %>DialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, <%= tennantNameUpperFirst %>, User) {
        var vm = this;

        vm.<%= tennantNameLowerFirst %> = entity;
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
            if (vm.<%= tennantNameLowerFirst %>.id !== null) {
                <%= tennantNameUpperFirst %>.update(vm.<%= tennantNameLowerFirst %>, onSaveSuccess, onSaveError);
            } else {
                <%= tennantNameUpperFirst %>.save(vm.<%= tennantNameLowerFirst %>, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('<%=angularAppName%>:<%= tennantNameLowerFirst %>Update', result);
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
