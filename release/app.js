var app = angular.module('app', ['ui.router','ui.bootstrap', 'ngSanitize']);

app.config(function ($stateProvider, $urlRouterProvider) {

    // For any unmatched url, redirect to /
    $urlRouterProvider.otherwise("/");

    // Now set up the states
    $stateProvider
        .state('home', {
            url: "/",
            templateUrl: "home-screen.html",
            controller: "HomeScreen"
        });
});
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

app.factory('restService', function ($http, $httpParamSerializerJQLike) {

    var get = function (url) {

        return $http.get(url)

            .then(function (response) {
                // on success
                console.log('success', response);
                return response;
            }, function (response) {
                // on error
                console.log('fail', response);
                return response;
            });
    };


    var postEncodedData = function (url, data) {
        var data = $httpParamSerializerJQLike(data);

        return $http.post(url, data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded', // Note the appropriate header
                Accept: "application/json"
            }
        }).then(function (response) {
            //on success
            console.log('success', response);
            return response;
        }, function (response) {
            //on error
            console.log('fail', response);
            return response;
        });
    };

    var postJson = function (url, data) {

        console.log("Posting data to URL: " + url);
        return $http.post(url, data, {
            headers: {
                // Note the appropriate header
                'Content-Type': 'application/json',
                'Accept': "application/json"
            }
        }).then(function (response) {
            //on success
            console.log('success', response);
            return response;
        }, function (response) {
            //on error
            console.log('fail', response);
            return response;
        });
    };

    return {
        get: get,
        postEncodedData: postEncodedData,
        postJson: postJson

    };
});



app.service('testimonialService', ['$http', 'restService','$rootScope', function($http, restService, $rootScope) {

    var getTestimonial = function(testimonialId) {
        return restService.get('/api/testimonial/' + testimonialId)
            .then(function(response) {
                // on success
                return response
            });
    };

    return {
        getTestimonial: getTestimonial
    }
}]);

'use strict';

app.directive('landingPage', function () {
    return {
        templateUrl: 'landing-page.html',
        scope: {},
        controller: 'landingPageController',

        link: function (scope, element, attrs) {

            var init = function () {

            };

            init();

        }
    }
});

app.controller('landingPageController', ['$scope', '$state', 'restService', 'projectService', 'testimonialService', function ($scope, state, restService, projectService, testimonialService) {

    $scope.projectName = '';
    $scope.testimonialId = '';

    $scope.submitProject = function (projectName) {
        console.log(projectName);
        projectName == null ? projectName = '' : projectName;
        projectService.getProject(projectName)
            .then(getProjectDetails);
    };

    $scope.submitTestimonial = function (testimonialId) {
        console.log(testimonialId);
        testimonialId == null ? testimonialId = '' : testimonialId;
        testimonialService.getTestimonial(testimonialId)
            .then(getTestimonialDetails);
    };

    var getProjectDetails = function (response) {
        if (response.status == 200)
            $scope.project = JSON.stringify(response.data, undefined, 4);
        else
            $scope.project = 'Project not found!';
    };

    var getTestimonialDetails = function (response) {
        if (response.status == 200)
            $scope.testimonial = JSON.stringify(response.data, undefined, 4);
        else
            $scope.testimonial = 'Testimonial not found!';
    };

}]);

app.filter('prettify', function () {

    function syntaxHighlight(json) {
        if (json) {
            json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
                var cls = 'number';
                if (/^"/.test(match)) {
                    if (/:$/.test(match)) {
                        cls = 'key';
                    } else {
                        cls = 'string';
                    }
                } else if (/true|false/.test(match)) {
                    cls = 'boolean';
                } else if (/null/.test(match)) {
                    cls = 'null';
                }
                return '<span class="' + cls + '">' + match + '</span>';
            });
        }
    }

    return syntaxHighlight;
});
app.controller('HomeScreen', function ($scope, $state) {

    var init = function () {

    };

    init();
});



