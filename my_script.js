var app1 = angular.module('app1', []);

app1.controller('ctrl1', function($scope) {

  $scope.lon = -97.00;
  $scope.lat = 35;
  $scope.total_rows = 0;
  $itration = 1;
  var data_all = [];

  $scope.lat_r = 2.5;
  $scope.lon_r = 2.5;

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

  $scope.getValue = function(flag) {  
    if(flag == 'new'){
      delete $scope.bookmark;
      data_all = [];
      $itration = 1;
    }
    $.ajax({
      url : 'api.php',
      type : 'GET',
      data : {
          'lon' : $scope.lon,
          'lat' : $scope.lat,
          'lon_range': $scope.lat_r,
          'lat_range': $scope.lon_r,
          'bookmark': $scope.bookmark,
        },
      dataType:'json',
      success : function(data) {  
        if(flag == 'new'){
          data_all = data.rows;
        } else {
          data_all.push.apply(data_all,data.rows);
        }      
        if(data.total_rows > 25*$itration){
          $scope.$apply(function () {
            $scope.bookmark = data.bookmark;
          });
          $itration++;
          $scope.getValue('old');
        } else {
          data_all.sort(function(a, b){ return a.fields.miles - b.fields.miles;});
          //console.clear();
          //console.log('Data: '+JSON.stringify(data_all, null, 2));
          $scope.assign(data,data_all);
        }
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

  $scope.assign = function(data,data_all) {
    $scope.$apply(function () {
      $scope.total_rows = data.total_rows;
      $scope.data_all = data_all;
    });
  }; 

});