angular.module('PatientController', [])

    .controller('MainController', function($scope, $http, patients) {
        $scope.gridOptions = {
                   columnDefs: [
                                        { name: "First Name", field: "firstname" },
                                        { name: "Last Name", field: "lastname" },
                                        { name: "Email", field: "email" },
                                        { name: "Profile Picture", field: "profile_image_path" }
                                    ]
        };

        

        //$http.get('/api/patients')
        $scope.getAll = function(){
        patients.getall()
                .success(function(data) {
                    console.log("main ctrl");
                        $scope.gridOptions.data = data;
                    toastr.info('Showing all patients');
                })
                .error(function(data) {
                        console.log('Error: ' + data);
                });
         }

         $scope.getPatient = function(firstname) {
           patients.get($scope.searchfirstname)
             .success(function(data) {
                $scope.patients = data;
                    toastr.info('Found your search');
             })
             .error(function(data) {
               
             });
         };

        $scope.createPat = function() {

                var infile = $scope.profile_pic;
               console.log("infile " + JSON.stringify(infile));
               console.dir(infile);
               var others = [{'name': 'firstname', 'data' : $scope.firstname},
                            {'name': 'lastname', 'data' : $scope.lastname},
                            {'name': 'email', 'data' : $scope.email}];
                     patients.create(infile, others )
                        .success(function(data) {
                               toastr.info('patient created');
                                $scope.patients = data;
                        })
                        .error(function(data) {
                                console.log('Error: ' + data);
                        });
        };

        $scope.deletePat = function(id) {
                //$http.delete('/api/patients/' + id)
                   patients.delete(id)
                        .success(function(data) {
                                $scope.patients = data;
                        })
                        .error(function(data) {
                                console.log('Error: ' + data);
                        });
        };
        $scope.getAll();
    })
    .directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
           }
       };
   }]);
