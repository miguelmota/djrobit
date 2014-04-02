"use strict";function onGoogleReady(){angular.bootstrap(document.body,["robitApp"])}angular.module("robitApp",["ngCookies","ngResource","ngSanitize","ngRoute","ui.bootstrap","ui.map","ui.event"]).config(["$routeProvider","$logProvider","$httpProvider","$locationProvider",function(a,b,c,d){b.debugEnabled(!0),a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).otherwise({redirectTo:"/"}),d.html5Mode(!0)}]),angular.module("robitApp").constant("SOUNDCLOUD",{clientId:"a5936f4a6e935d8695c2c6e0de46b830"}).constant("POSTMARK",{serverToken:"b5772e33-070e-4bff-a840-704a56f9e373"}).constant("INSTAGRAM",{accessToken:"211404734.6ceae3f.59bb5cf01d78429184eed7a20da06383"}),angular.module("robitApp").controller("MainCtrl",["$scope","$location","$anchorScroll","$timeout",function(a,b,c,d){a.goToAnchor=function(a){d(function(){b.hash(a),c()})}}]),angular.module("robitApp").directive("rbSoundcloud",["Soundcloud","$log","$sce",function(a,b,c){return{templateUrl:"views/partials/soundcloud.tpl.html",restrict:"A",controller:["$scope","$element","$attrs",function(d){d.iframeUrls=[],d.getTracks=function(e){e=e||{},a.getTracks(e).then(function(a){b.debug("Soundcloud data:",a),_.each(a,function(a){b.debug("Item:",a);var e=!1;d.iframeUrls.push(c.trustAsResourceUrl("https://w.soundcloud.com/player/?url="+encodeURIComponent(a.uri)+"&amp;color=000000&amp;auto_play="+e+"&amp;show_artwork=false"))})})}}],link:function(a,b,c){a.getTracks({username:c.username})}}}]),angular.module("robitApp").service("Soundcloud",["$http","$log","$q","SOUNDCLOUD",function(a,b,c,d){function e(b){var e=_.assign({},b),f=c.defer();return a.get("http://api.soundcloud.com/users/"+e.username+"/tracks.json?client_id="+d.clientId).success(function(a){f.resolve(a)}).error(function(){f.reject()}),f.promise}return{getTracks:e}}]),angular.module("robitApp").controller("SoundcloudCtrl",["$scope",function(){}]),angular.module("robitApp").directive("rbPodcast",["PodcastFeed",function(a){return{templateUrl:"views/partials/podcast-feed.tpl.html",restrict:"A",controller:["$scope","$element","$attrs",function(b){b.entries=[],b.getEntries=function(){a.getFeed().then(function(a){b.entries=a.entries})}}],link:function(a){a.getEntries()}}}]),angular.module("robitApp").service("PodcastFeed",["$http","$q","$log",function(a,b){function c(){var c=b.defer();return a.get("http://www.djrobit.com/podcast/feed.json?callback=?").success(function(a){c.resolve(a)}).error(function(){c.reject()}),c.promise}return{getFeed:c}}]),angular.module("robitApp").service("InstagramFeed",["$http","$q","$log","INSTAGRAM",function(a,b,c,d){function e(){var e=b.defer(),f={username:"djrobit",userId:211404734,count:9},g="https://api.instagram.com/v1/users/"+f.userId+"/media/recent?access_token="+d.accessToken+"&count="+f.count+"callback=?",h="http://proxy.miguelmota.com/?url=".concat(encodeURIComponent(g));return a.get(h).success(function(a){c.debug(a),e.resolve(a)}).error(function(){e.reject()}),e.promise}return{getPhotos:e}}]),angular.module("robitApp").directive("rbInstagram",["InstagramFeed",function(a){return{templateUrl:"views/partials/instagram-feed.tpl.html",restrict:"A",controller:["$scope","$element","$attrs",function(b){b.photos=[],b.getPhotos=function(){a.getPhotos().then(function(a){_.each(a.data,function(a){var c=(a.caption&&a.caption.text?a.caption.text:null,a.link),d=(a.images.thumbnail.url,a.images.standard_resolution.url,a.images.low_resolution.url),e=(a.likes?a.likes.count:null,a.created_time,{permalink:c,url:d});b.photos.push(e)}),b.photos=b.photos.slice(0,8)})}}],link:function(a){a.getPhotos()}}}]),angular.module("robitApp").controller("ContactCtrl",["$scope","$http","$log","POSTMARK",function(a,b,c,d){a.success=!1,a.error=!1,a.send=function(){var e="<div>Name: "+a.msg.name+"</div><div>Email: "+a.msg.email+"</div><div>Message: "+a.msg.body+"</div><div>Date: "+(new Date).toString()+"</div>",f="Name: "+a.msg.name+"\nEmail: "+a.msg.email+"\nMessage: "+a.msg.body+"\nDate: "+(new Date).toString()+"\n";c.debug("Send action called."),b.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded";var g="https://api.postmarkapp.com/email",h={From:"m@moogs.io",To:"official.robit@gmail.com",ReplyTo:a.msg.email,Cc:"hello@miguelmota.com",HtmlBody:e,TextBody:f,Subject:"New Contact Form Submission"},i={Accept:"application/json","Content-Type":"application/json","X-Postmark-Server-Token":d.serverToken},j=$.param({url:g,data:JSON.stringify(h),headers:JSON.stringify(i)});b({method:"POST",url:"http://proxy.miguelmota.com",data:j}).success(function(b){console.log(b),a.success=!0,a.msg={}}).error(function(b){console.log("err"),console.log(b),a.error=!0})}}]),angular.module("robitApp").directive("rbScrollTo",function(){return function(a,b,c){angular.element(b).bind("click",function(a){a.preventDefault(),$(document.body).animate({scrollTop:$(c.href).offset().top-$(".navbar-default").height()},500)})}}),angular.module("robitApp").controller("MapCtrl",["$scope","$timeout",function(a,b){a.model={myMap:void 0};var c=new google.maps.LatLng(34.056346,-118.234578);a.mapOptions={center:c,zoom:6,mapTypeId:google.maps.MapTypeId.ROADMAP},a.myMarkers=[],b(function(){a.myMarkers.push(new google.maps.Marker({map:a.model.myMap,position:c}))})}]);