(function() {
    'use strict';

    angular
        .module('<%=angularAppName%>')
        .controller('<%= tenantNameUpperFirst %>DeleteController',<%= tenantNameUpperFirst %>DeleteController);

    <%= tenantNameUpperFirst %>DeleteController.$inject = ['$uibModalInstance', 'entity', '<%= tenantNameUpperFirst %>'];

    function <%= tenantNameUpperFirst %>DeleteController($uibModalInstance, entity, <%= tenantNameUpperFirst %>) {
        var vm = this;

        vm.<%= tenantNameLowerFirst %> = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            <%= tenantNameUpperFirst %>.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
