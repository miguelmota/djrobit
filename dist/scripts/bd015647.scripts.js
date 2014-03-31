"use strict";angular.module("robitApp",["ngCookies","ngResource","ngSanitize","ngRoute","ui.bootstrap"]).config(["$routeProvider","$logProvider","$httpProvider",function(a,b,c){b.debugEnabled(!0),a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).otherwise({redirectTo:"/"}),c.defaults.headers.common={},c.defaults.headers.post={},c.defaults.headers.put={},c.defaults.headers.patch={}}]),angular.module("robitApp").controller("MainCtrl",["$scope","$location","$anchorScroll",function(a,b,c){a.scrollTo=function(a){b.hash(a),c()}}]).controller("AboutCtrl",["$scope",function(){}]).controller("MusicCtrl",["$scope",function(){}]).controller("SocialCtrl",["$scope",function(){}]).controller("ContactCtrl",["$scope",function(){}]),angular.module("robitApp").directive("rbSoundcloud",["Soundcloud","$log","$sce",function(a,b,c){return{templateUrl:"views/partials/soundcloud.tpl.html",restrict:"A",controller:["$scope","$element","$attrs",function(d){d.iframeUrls=[],d.getTracks=function(e){e=e||{},e.clientIdDev="a5936f4a6e935d8695c2c6e0de46b830",a.getTracks(e).then(function(a){b.debug("Soundcloud data:",a),_.each(a,function(a){b.debug("Item:",a);var e=!1;d.iframeUrls.push(c.trustAsResourceUrl("https://w.soundcloud.com/player/?url="+encodeURIComponent(a.uri)+"&amp;color=000000&amp;auto_play="+e+"&amp;show_artwork=false"))})})}}],link:function(a,b,c){a.getTracks({username:c.username})}}}]),angular.module("robitApp").service("Soundcloud",["$http","$log","$q",function(a,b,c){function d(b){var d=_.assign({},b),e=c.defer();return a.get("http://api.soundcloud.com/users/"+d.username+"/tracks.json?client_id="+d.clientIdDev).success(function(a){e.resolve(a)}).error(function(){e.reject()}),e.promise}return{getTracks:d}}]),angular.module("robitApp").controller("SoundcloudCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("robitApp").directive("rbPodcast",["PodcastFeed",function(a){return{templateUrl:"views/partials/podcast-feed.tpl.html",restrict:"A",controller:["$scope","$element","$attrs",function(b){b.entries=[],b.getEntries=function(){a.getFeed().then(function(a){b.entries=a.entries})}}],link:function(a){a.getEntries()}}}]),angular.module("robitApp").service("PodcastFeed",["$http","$q","$log",function(a,b){function c(){var c=b.defer();return a.get("http://www.djrobit.com/podcast/feed.json?callback=?").success(function(a){c.resolve(a)}).error(function(){c.reject()}),c.promise}return{getFeed:c}}]),angular.module("robitApp").service("InstagramFeed",["$http","$q","$log",function(a,b,c){function d(){var d=b.defer(),e={clientId:"6ceae3f80d094a13b49e1a9d2a5451cf",redirectUri:"http://localhost",username:"djrobit",count:9,accessToken:"211404734.6ceae3f.59bb5cf01d78429184eed7a20da06383",userId:211404734},f="https://api.instagram.com/v1/users/"+e.userId+"/media/recent?access_token="+e.accessToken+"&count="+e.count+"callback=?",g="http://proxy.miguelmota.com/?url=".concat(encodeURIComponent(f));return a.get(g).success(function(a){c.debug(a),d.resolve(a)}).error(function(){d.reject()}),d.promise}return{getPhotos:d}}]),angular.module("robitApp").directive("rbInstagram",["InstagramFeed",function(a){return{templateUrl:"views/partials/instagram-feed.tpl.html",restrict:"A",controller:["$scope","$element","$attrs",function(b){b.photos=[],b.getPhotos=function(){a.getPhotos().then(function(a){_.each(a.data,function(a){var c=(a.caption&&a.caption.text?a.caption.text:null,a.link),d=(a.images.thumbnail.url,a.images.standard_resolution.url,a.images.low_resolution.url),e=(a.likes?a.likes.count:null,a.created_time,{permalink:c,url:d});b.photos.push(e)}),b.photos=b.photos.slice(0,8)})}}],link:function(a){a.getPhotos()}}}]),angular.module("robitApp").controller("ContactCtrl",["$scope","$http","$log",function(a,b,c){a.success=!1,a.error=!1,a.send=function(){var d="<div>Name: "+a.msg.name+"</div><div>Email: "+a.msg.email+"</div><div>Message: "+a.msg.body+"</div><div>Date: "+(new Date).toString()+"</div>";c.debug("Send action called."),b.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded";var e="https://api.postmarkapp.com/email",f={From:"m@moogs.io",To:"official.robit@gmail.com",Cc:"hello@miguelmota.com",HtmlBody:d},g={Accept:"application/json","Content-Type":"application/json","X-Postmark-Server-Token":"ccd40485-6a1a-4e7b-ae75-ea3762f0583e",Subject:"New Contact Form Submission"},h=$.param({url:e,data:JSON.stringify(f),headers:JSON.stringify(g)});b({method:"POST",url:"http://proxy.miguelmota.com",data:h}).success(function(b){console.log(b),a.success=!0,a.msg={}}).error(function(b){console.log("err"),console.log(b),a.error=!0})}}]);