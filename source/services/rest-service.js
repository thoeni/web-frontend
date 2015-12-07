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


