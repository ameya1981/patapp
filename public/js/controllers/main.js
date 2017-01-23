/*
The only controller in this app.
Manages all the calls from the and binds to different data-types
*/

angular.module('PatientController', [])

    .controller('MainController', function($scope, $http, patients) {

        this.formtoreset = "";
        $scope.submitMethod = "POST";
        $scope.rowSelected = "false";
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
		$scope.rowSelected = !row.isSelected;
                if (row.isSelected) {
			$scope.firstname = row.entity.firstname;
			$scope.lastname = row.entity.lastname;
			$scope.email = row.entity.email;
			$scope.img_src = "/profiles/" + $scope.firstname + "_profile_pic";
                        $scope.submitMethod = 'PUT';
			console.log(row);
                }else {
                   reset_fields($scope.editform);
                                        }
	      });

	      /*gridApi.selection.on.rowSelectionChangedBatch($scope,function(rows){
		var msg = 'rows changed ' + rows.length;
		console.log(msg);
	      });*/
	    }; 
          
        var reset_fields = function() {

             $scope.submitMethod = 'POST';
             //howto form.reset
	     $scope.firstname = "";
	     $scope.lastname = "";
	     $scope.email = "";
	     $scope.img_src = "";
        }

        //$http.get('/api/patients')
        $scope.getAll = function(){
        patients.getall()
                .success(function(data) {
                    $scope.gridOptions.data = data;
                    toastr.info('Showing all patients');
                })
                .error(function(data) {
                    toastr.error('Could not fetch patient data');
                    console.log('Error: ' + data);
                })
		.finally(function(data) {
                   reset_fields($scope.editform);
		});
         }

         $scope.getPatient = function(firstname) {
           patients.get($scope.searchfirstname)
             .success(function(data) {
                $scope.gridOptions.data = data;
                toastr.success('Patient Found');
             })
             .error(function(data) {
                toastr.error(data); 
             });
         };

        $scope.createPat = function() {

               var infile = $scope.profile_pic;
               var firstname = $scope.firstname;
               var others = [{'name': 'firstname', 'data' : firstname},
                            {'name': 'lastname', 'data' : $scope.lastname},
                            {'name': 'email', 'data' : $scope.email}];
               var submitMethod = $scope.submitMethod;
                     patients.create(infile, others, submitMethod, firstname )
                        .success(function(data) {
                               toastr.info('Patient Data Submitted');
                        })
                        .error(function(data) {
                             toastr.error('Error: ' + data);
                        })
                        .finally(function(data) {
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
   }]);//directive required as ng-model not supported for type=file
