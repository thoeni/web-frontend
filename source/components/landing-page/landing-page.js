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