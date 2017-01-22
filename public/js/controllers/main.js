angular.module('PatientController', [])

    .controller('MainController', function($scope, $http, patients) {

        $scope.gridOptions = {
          enableFullRowSelection: true,
          multiSelect: false,
          enableSelectAll: false,
          columnDefs: [
				{ name: "First Name", field: "firstname" },
				{ name: "Last Name", field: "lastname" },
				{ name: "Email", field: "email" }
                      ]
        };
        $scope.gridOptions.onRegisterApi = function(gridApi){
	//set gridApi on scope
	      $scope.gridApi = gridApi;
	      gridApi.selection.on.rowSelectionChanged($scope,function(row){
		var msg = 'row selected ' + row.isSelected;
                $scope.firstname = row.entity.firstname;
                $scope.lastname = row.entity.lastname;
                $scope.email = row.entity.email;
                $scope.img_src = "/profiles/" + $scope.firstname + "_profile_pic";
                //$scope.img_src = patients.getprofile($scope.firstname);//"https://farm9.staticflickr.com/8455/8048926748_1bc624e5c9_d.jpg";
		console.log(row);
	      });

	      gridApi.selection.on.rowSelectionChangedBatch($scope,function(rows){
		var msg = 'rows changed ' + rows.length;
		console.log(msg);
	      });
	    }; 
          
        console.log($scope.gridOptions);
        

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
                $scope.gridOptions.data = data;
                    toastr.info('Patient Found');
             })
             .error(function(data) {
               
             });
         };

        $scope.createPat = function() {

               var infile = $scope.profile_pic;
               var others = [{'name': 'firstname', 'data' : $scope.firstname},
                            {'name': 'lastname', 'data' : $scope.lastname},
                            {'name': 'email', 'data' : $scope.email}];
                     patients.create(infile, others )
                        .success(function(data) {
                               toastr.info('Patient Created');
                        })
                        .error(function(data) {
                                console.log('Error: ' + data);
                        })
                        .finally(function(data) {
                           console.log("getAll create pat");
                               $scope.getAll();
                        });
        };

        $scope.deletePat = function(id) {
                //$http.delete('/api/patients/' + id)
                   patients.delete($scope.firstname)
                        .success(function(data) {
                               toastr.info('Patient Deleted');
                                //$scope.patients = data;
                        })
                        .error(function(data) {
                                console.log('Error: ' + data);
                        })
                        .finally(function(data) {
                           console.log("getAll delete pat");
                            $scope.getAll();
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
