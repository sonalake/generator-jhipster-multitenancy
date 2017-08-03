(function() {
    'use strict';

    angular
        .module('<%=angularAppName%>')
        .controller('<%= tennantNameUpperFirst %>Controller', <%= tennantNameUpperFirst %>Controller);

    <%= tennantNameUpperFirst %>Controller.$inject = ['<%= tennantNameUpperFirst %>'];

    function <%= tennantNameUpperFirst %>Controller(<%= tennantNameUpperFirst %>) {

        var vm = this;

        vm.<%= tennantNamePluralLowerFirst %> = [];

        loadAll();

        function loadAll() {
            <%= tennantNameUpperFirst %>.query(function(result) {
                vm.<%= tennantNamePluralLowerFirst %> = result;
                vm.searchQuery = null;
            });
        }
    }
})();
