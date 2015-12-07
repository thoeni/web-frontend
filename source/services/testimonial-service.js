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
