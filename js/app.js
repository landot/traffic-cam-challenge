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
   
    //coordinates of the starting center point
    var center = {
        lat: 47.6,
        lng: -122.3
    };

    //creates google map at a specified location
    var map = new google.maps.Map(mapElem, {
        center: center,
        zoom: 12
    });

	//creates info window 
    var infoWindow = new google.maps.InfoWindow();

    //initializes the height of the map
    affectDimensions();
	
	//catches window object resize event and adjusts map height
	$(window).resize(function() {
		affectDimensions();
	});


    //makes the height of the map 20 pixels less than the window height
	function affectDimensions() {
		$('#map').css({
			'height' : $(window).height() - $('#map').position().top - 20
		});
	}

    var cameras;
    var cameraMarkers = [];

    //creates and tests whether the marker should be shown on the map
    //based off of search bar and marker cameralabel
    $.getJSON('https://data.seattle.gov/resource/65fc-btcc.json')
        .done(function(data) {
            cameras = data;
            data.forEach(function(camera) {
                var marker = new google.maps.Marker({
                    position: {
                        lat: Number(camera.location.latitude),
                        lng: Number(camera.location.longitude)
                    },
                    map: map
                });
                cameraMarkers.push(marker);

                //populates the infoWindow based on the marker that is clicked
                //displays name of camera and also image from camera in an infoWindow
                google.maps.event.addListener(marker, 'click', function() {
                    var html = '<h3>' + camera.cameralabel + '</h3>';
                    html += '<img src=' + camera.imageurl.url + ' alt="camera image">';
                    infoWindow.setContent(html);
                    //pans the map so the marker clicked is in the center
                    map.panTo(marker.getPosition());
                    infoWindow.open(map, this);
                });

                //creates the search that looks through the camera labels in the JSON file 
                //based on the typed in input(not case sensitive)
                $("#search").bind("search keyup", function () {
                    var searchString = camera.cameralabel.toLowerCase().indexOf(this.value.toLowerCase());
                    if(searchString < 0) {
                        marker.setMap(null);
                    }else {
                        marker.setMap(map);
                    }
                });
            });
        })

		//logs error if fail occurs
        .fail(function(error) {
            console.log(error);
        })
        .always(function() {
            $('#ajax-loader').fadeOut();
        })

});