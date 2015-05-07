var EZTV = angular.module('EZTV', []);

EZTV.controller('first_controller', function ($scope){
	$scope.getShowList = function(){
    var showList = {};
    $.ajax({
      async: false,
      url:'https://quiet-castle-3852.herokuapp.com/showlist',
      type: 'GET',
      dataType: 'json',
      success: function(data) {
        showList = data;
      }
    });
    return showList;
  };
  $scope.showList = $scope.getShowList();
  $scope.init = function(){
  	console.log($scope.showList);
    $scope.video = false;
  };
  $scope.showEpisode = function(){
  	this.next().toggle();
  };
  $scope.showVideo = function(url){
    $scope.video = true;
    $('.playerSide_inside')
      .append("<iframe class='videoEmbed' src='https://quiet-castle-3852.herokuapp.com/videodiv?url="+url+"'></iframe>");
  };
  $scope.videoClose = function(){
    $('.playerSide_inside').empty();
    $scope.video = false;
  };
  $scope.showEpisodeList = function(x){
    $('.listActive').removeClass('listActive');
    $('.'+x).addClass('listActive');
  };
});