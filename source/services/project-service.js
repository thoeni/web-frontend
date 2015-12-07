app.service('projectService', ['$http', 'restService', '$rootScope', function ($http, restService, $rootScope) {

    var getProject = function (projectId) {
        return restService.get('/api/project/' + projectId)
            .then(function (response) {
                return response
            });
    };

    return {
        getProject: getProject
    }
}]);
