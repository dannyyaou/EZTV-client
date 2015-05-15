var EZTV = angular.module('EZTV', ['angular-loading-bar']);

EZTV.controller('first_controller', function ($scope,$http){
  $scope.showsList;
  $scope.getEpisodeList = function(href){
    var episodeList = {};
    $http.get('https://quiet-castle-3852.herokuapp.com/showlist?url='+href)
    .success(function(response) {
      console.log(response);
      $scope.showEpisodes=response;
      episodeList = response;
    });
    return episodeList;
  };

  $scope.init = function(){
    if(window.localStorage.likes == undefined){
      window.localStorage.likes = "[]";
    }
    $scope.likes = JSON.parse(window.localStorage.likes);
    console.log($scope.likes);
    $scope.video = false;
    $http.get('https://quiet-castle-3852.herokuapp.com/allshowlist')
    .success(function(response) {
      var likenumber = 0;
      $scope.showsList=response;
      console.log($scope.showsList);
      for (var i = $scope.showsList.length - 1; i >= 0; i--) {
        for (var p = $scope.showsList[i].showslist.length - 1; p >= 0; p--) {
          for (var j = $scope.likes.length - 1; j >= 0; j--) {
            if ( $scope.showsList[i].showslist[p].showid == $scope.likes[j] + ".html" ){
              likenumber ++ ;
              $scope.showsList[i].showslist[p].like = 'liked';
            }
          }
        }
      }
      console.log('you got '+ likenumber + 'likes');
    });


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
  $scope.showEpisodes = [];
  $scope.showEpisodeList = function(href){
    $scope.episodeListShow = true;
    console.log(href);
    $scope.showEpisodes = [];
    $scope.showEpisodes = $scope.getEpisodeList(href);
    console.log($scope.showEpisodes);
  };
  $scope.changeSearch = function(stuff){
    $scope.search = stuff;
  };
  $scope.episodeListShow = false;
  $scope.closeBtn1 = function(){
    $scope.episodeListShow = false;
  };
  $scope.random = function() {
        return 0.5 - Math.random();
  };
  $scope.like = function(url){
    var iai = false;
    var indexPlusOne;
    for (var i = 0; i < $scope.likes.length; i++) {
      if ( $scope.likes[i] == url ){
        iai = true;
        indexPlusOne = i;
      }
    }
    if(!iai){
      $scope.likes.push(url);
      window.localStorage.likes = JSON.stringify($scope.likes);
      $('img.'+url).attr('src','images/liked.png');
      for (var i = $scope.showsList.length - 1; i >= 0; i--) {
        for (var p = $scope.showsList[i].showslist.length - 1; p >= 0; p--) {
          if ( $scope.showsList[i].showslist[p].showid == $scope.likes[$scope.likes.length-1] + ".html" ){
            $scope.showsList[i].showslist[p].like = 'liked';
          }
        }
      }
    }
    if (iai) {
      $('img.'+url).attr('src','images/booshihuan.png');
      for (var i = $scope.showsList.length - 1; i >= 0; i--) {
        for (var p = $scope.showsList[i].showslist.length - 1; p >= 0; p--) {
          if ( $scope.showsList[i].showslist[p].showid == $scope.likes[indexPlusOne] + ".html" ){
            $scope.showsList[i].showslist[p].like = 'booshihuan';
          }
        }
      }
      $scope.likes.splice(indexPlusOne, 1);
      window.localStorage.likes = JSON.stringify($scope.likes);
    };
  };
});























