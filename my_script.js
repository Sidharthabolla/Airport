var app1 = angular.module('app1', []);

app1.controller('ctrl1', function($scope) {

  $scope.lon = 15.00;
  $scope.lat = 5;
  $scope.total_rows = 0;

  $scope.lat_r = 5;
  $scope.lon_r = 15;

  $scope.lat_stick = $scope.lat_r*5;
  $scope.lon_stick = $scope.lon_r*5;

  if($scope.lat_stick > 325){
    $scope.lat_stick = 325;
  }

  $scope.addValue = function(a,b) {
    $scope[b] = (+a + 2.5);
    if($scope[b]*5 <= 220){
      if(b == 'lat_r'){ c = 'lat_stick';}else{ c = 'lon_stick';}
      $scope[c] = $scope[b]*5;
    }
  };

  $scope.subValue = function(a,b) {
    if(a > 0){
      $scope[b] = (+a - 2.5);
      if($scope[b]*5 <= 220){
        if(b == 'lat_r'){ c = 'lat_stick';}else{ c = 'lon_stick';}
        $scope[c] = $scope[b]*5;
      }
    }
  };

  $scope.getValue = function() {  
    $.ajax({
      url : 'api.php',
      type : 'GET',
      data : {
          'lon' : $scope.lon,
          'lat' : $scope.lat,
          'lon_range': $scope.lat_r,
          'lat_range': $scope.lon_r,
        },
      dataType:'json',
      success : function(data) {              
          //console.log('Data: '+JSON.stringify(data, null, 2));
            data.rows.sort(function(a, b){ return a.fields.miles - b.fields.miles;});
            $scope.assign(data);
      },
      error : function(request,error)
      {
        alert("Request: "+JSON.stringify(request));
      }
    }); 

    $("#listing").show();
  };
    

  $scope.airport_name = '';
  $scope.airport_distance = '';

  $scope.assign = function(data) {
    $scope.$apply(function () {
      $scope.total_rows = data.total_rows;
      $scope.data_all = data.rows;
    });
  }; 

});