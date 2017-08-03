(function() {
    'use strict';
    angular
        .module('<%=angularAppName%>')
        .factory('<%= tennantNameUpperFirst %>', <%= tennantNameUpperFirst %>);

    <%= tennantNameUpperFirst %>.$inject = ['$resource'];

    function <%= tennantNameUpperFirst %> ($resource) {
        var resourceUrl =  'api/<%= tennantNamePluralLowerFirst %>/:id';

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
