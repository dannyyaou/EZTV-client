var EZTV = angular.module('EZTV', []);

EZTV.controller('first_controller', function ($scope){
	$scope.getShowList = function(){
    var showList = {};
    $.ajax({
      async: false,
      url:'http://localhost:8080/allshowlist',
      type: 'GET',
      dataType: 'json',
      success: function(data) {
        showsList = data;
      }
    });
    return showsList;
  };
  $scope.getEpisodeList = function(href){
    var episodeList = {};
    $.ajax({
      async: false,
      url:'http://localhost:8080/showlist?url='+href,
      type: 'GET',
      dataType: 'json',
      success: function(data) {
        episodeList = data;
      }
    });
    return episodeList;
  };
  $scope.showsList = $scope.getShowList();
  $scope.init = function(){
  	console.log($scope.showsList);
    $scope.video = false;
  };
  $scope.showEpisode = function(){
  	this.next().toggle();
  };
  $scope.showVideo = function(url){
    $scope.video = true;
    $('.playerSide_inside')
      .append("<iframe class='videoEmbed' src='http://localhost:8080/videodiv?url="+url+"'></iframe>");
  };
  $scope.videoClose = function(){
    $('.playerSide_inside').empty();
    $scope.video = false;
  };
  $scope.showEpisodes = [];
  $scope.showEpisodeList = function(href){
    console.log(href);
    $scope.showEpisodes = [];
    $scope.showEpisodes = $scope.getEpisodeList(href);
    console.log($scope.showEpisodes);
  };
  $scope.changeSearch = function(stuff){
    $scope.search = stuff;
  };
});























