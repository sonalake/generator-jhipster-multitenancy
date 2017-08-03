(function() {
    'use strict';

    angular
        .module('<%=angularAppName%>')
        .controller('<%= tennantNameUpperFirst %>DeleteController',<%= tennantNameUpperFirst %>DeleteController);

    <%= tennantNameUpperFirst %>DeleteController.$inject = ['$uibModalInstance', 'entity', '<%= tennantNameUpperFirst %>'];

    function <%= tennantNameUpperFirst %>DeleteController($uibModalInstance, entity, <%= tennantNameUpperFirst %>) {
        var vm = this;

        vm.<%= tennantNameLowerFirst %> = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            <%= tennantNameUpperFirst %>.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
