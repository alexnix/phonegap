/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 
var test_news=[
	{
		pk:"1",
		title:"Title 1",
		content:"Description 1",
		image:"http://ocw.cs.pub.ro/courses/res/sigla_iot.png"
	},
	{
		pk:"2",
		title:"Title 2",
		content:"Description 2",
		image:"http://ocw.cs.pub.ro/courses/res/sigla_iot.png"
	},
	{
		pk:"3",
		title:"Title 3",
		content:"Description 3",
		image:"http://ocw.cs.pub.ro/courses/res/sigla_iot.png"
	},
	{
		pk:"4",
		title:"Title 4",
		content:"Description 4",
		image:"http://ocw.cs.pub.ro/courses/res/sigla_iot.png"
	},
	{
		pk:"5",
		title:"Title 5",
		content:"Description 5",
		image:"http://ocw.cs.pub.ro/courses/res/sigla_iot.png"
	}
];
 
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
		$("*[data-action=close-menu]").click(app.hideMenu);
		$("*[data-action=show-menu]").click(app.showMenu);
		$("*[data-action=toggle-menu]").click(app.toggleMenu);
		$("#content").width( $( window ).width() );
		$("#header").width( $( window ).width() );
		$("*[data-role=page]").first().show();
		hash = location.hash.substr(1).split('&');
		if(document.getElementById(hash[0])){
			app.showPage(hash[0]);
		}	

		app.updateNews();
		//setInterval(app.updateNews, 5000);

		//$(".full-container").width(window.innerWidth);

		$("button#camera").click(function(){
			

				navigator.device.capture.captureImage(function(file){
					$("img#camera").attr("src", file[0].fullPath);
				});


		});
		
		
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
		window.addEventListener('hashchange', this.hashChange, false);

		$("form").submit(app.sendMsg);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
	//events on hash/location change
	hashChange: function(){
		var hash = location.hash.substr(1);
		var values = {};
		hash = hash.split('&');
		hash.forEach(function(el,index){
			if(el.indexOf("=")>=0){
				el = {name:el.split("=")[0] , value:el.split("=")[1]};
				values[el.name] = el.value;
				hash[index]=el;
			}
		});
		if(document.getElementById(hash[0])){
			app.showPage(hash[0]);
		}
	},
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
	showPage: function(id){
		if( document.getElementById(id).getAttribute("data-role") == "page"){
			$("*[data-role=page]").hide();
			$("#"+id).show();
			app.hideMenu();
		}
	},
	showMenu: function(){
		document.getElementById("app").classList.add("show");
	},
	
	hideMenu: function(){
		document.getElementById("app").classList.remove("show");
	},
	
	toggleMenu: function(){
		if(document.getElementById("app").classList.contains("show")){
			app.hideMenu();
		}else{
			app.showMenu();
		}
	},

	updateNews: function() {
		var news = test_news;
	  $("#news").html(""); // we empty the contents of the page
	  for(var i=0; i<news.length; i++){
	    var card = $("#templates>.card.news").clone();
	    card.find(".title").html(news[i].title); //set .title element of the card
	    card.find(".content").html(news[i].content); //set .content element of the card
	    card.find(".img").attr("src",news[i].image); //set src attribute of the image
	    card.attr("data-pk",news[i].pk); //set a custom pk attribute to store the pk
	    card.find(/*selector of the read more button*/).click(function(){
	      //on click display in console the pk of the clicked card
	      console.log($(this).parent().parent().attr("data-pk"));
	    });
	    $("#news").append(card); //add card to page
	   }
	},

	sendMsg: function() {
		var username = $("#username").val();
		var message = $("#message").val();
		if( username && message ) {
			var msg = $("#templates>.card.msg").clone();

			msg.find("b").html( username );
			msg.find("p").html( message );

			$("#chat>#chat_box").append(msg);

			//$("#username").val("");
			$("#message").val("");

			var objDiv = document.getElementById("chat_box");
			objDiv.scrollTop = objDiv.scrollHeight;
		}
	},
	
};


// var app = angular.module("app", []);

// app.controller("NewsCtrl", ['$scope', function($scope){
// 	$scope.foo = "BAR";
// }]);