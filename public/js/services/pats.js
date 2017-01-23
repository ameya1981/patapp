angular.module('PatientService', [])

.factory('patients', function($http) {
return {
    getall : function() {
	return $http.get('/api/patients');
    },
    get : function(input) {
        console.log(input);
	return $http.get('/api/patients/' + input);
    },
    create : function(file, fields, submitMethod, firstname) {
        var formData = new FormData();
        for(var i=0;i<fields.length;i++){
          formData.append(fields[i].name, fields[i].data);
        }
        formData.append('profile_pic', file);
        headers = {'Content-Type' : undefined};
        url = '/api/patients';
        if (submitMethod === 'PUT'){
          headers['X-HTTP-Method-Override'] = submitMethod;
          url += '/' + firstname;
        }
	return $http.post(url, formData, {transformRequest: angular.identity,
            headers: headers});
    },
    delete : function(firstname) {
	return $http.delete('/api/patients/' + firstname);
    },
    update : function(firstname) {
	return $http.put('/api/patients/' + firstname);
    },
    getprofile : function(firstname) {
        return $http.get('/api/profile/' + firstname); 
    }
}
});
