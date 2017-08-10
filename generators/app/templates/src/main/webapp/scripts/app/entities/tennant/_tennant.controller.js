(function() {
    'use strict';

    angular
        .module('<%=angularAppName%>')
        .controller('<%= tenantNameUpperFirst %>Controller', <%= tenantNameUpperFirst %>Controller);

    <%= tenantNameUpperFirst %>Controller.$inject = ['<%= tenantNameUpperFirst %>'];

    function <%= tenantNameUpperFirst %>Controller(<%= tenantNameUpperFirst %>) {

        var vm = this;

        vm.<%= tenantNamePluralLowerFirst %> = [];

        loadAll();

        function loadAll() {
            <%= tenantNameUpperFirst %>.query(function(result) {
                vm.<%= tenantNamePluralLowerFirst %> = result;
                vm.searchQuery = null;
            });
        }
    }
})();
