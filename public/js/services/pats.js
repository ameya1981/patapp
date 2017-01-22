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
    create : function(file, fields) {
        var formData = new FormData();
        for(var i=0;i<fields.length;i++){
          formData.append(fields[i].name, fields[i].data);
        }
        formData.append('profile_pic', file);
	return $http.post('/api/patients', formData, {transformRequest: angular.identity,
            headers: {'Content-Type': undefined}});
    },
    delete : function(firstname) {
	return $http.delete('/api/patients/' + firstname);
    },
    update : function(firstname) {
	return $http.put('/api/patients/' + firstname);
    }
}
});
