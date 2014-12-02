// List of Seattle Traffic Cameras
// http://data.seattle.gov/resource/65fc-btcc.json

"use strict";

//put your code here to create the map, fetch the list of traffic cameras
//and add them as markers on the map
//when a user clicks on a marker, you should pan the map so that the marker
//is at the center, and open an InfoWindow that displays the latest camera
//image
//you should also write the code to filter the set of markers when the user
//types a search phrase into the search box

$(document).ready(function() {
	var mapElem = document.getElementById('map');

		var map= new google.maps.Map(mapElem, {
			center: center,
			zoom: 12,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		});
		var infoWindow = new google.maps.InfoWindow();
	
	var center = {
		lat: 47.6,
		lng: -122.3
	};	

	var cameras;
	var markers = [];

	$.getJSON('http://data.seattle.gov/resource/65fc-btcc.json')
		.done(function(data) {
			cameras = data;
			data.forEach(function(camera) {
				var marker = new google.maps.Marker({
					position: {
						lat: Number(camera.location.latitude),
						lng: Number(camera.location.longitude)
					}
					map: map
				});
				markers.push(marker);

                google.maps.event.addListener(marker, 'click', function() {
	                var html = "<h3>" + camera.cameralabel + "</h3>";
	                html+=
	                infoWindow.setContent(html);
	                infoWindow.open(map, this);    
	            });
            });            
		})




});