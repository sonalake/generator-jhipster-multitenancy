(function() {
    'use strict';
    angular
        .module('<%=angularAppName%>')
        .factory('<%= tenantNameUpperFirst %>', <%= tenantNameUpperFirst %>);

    <%= tenantNameUpperFirst %>.$inject = ['$resource'];

    function <%= tenantNameUpperFirst %> ($resource) {
        var resourceUrl =  'api/<%= tenantNamePluralLowerFirst %>/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
