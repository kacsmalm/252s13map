jQuery( document ).ready( function( $ ) {
	// Step 0: declare necessary variables
	var api = google.maps,											// convenience variable so I don't have to type google.maps a lot
		mapOptions = { 												// options for the map
			center: new api.LatLng( 38.4332, -78.8663 ),
			zoom: 5, 
			mapTypeId: api.MapTypeId.ROADMAP },
		map = new api.Map( $( '#map_canvas' )[ 0 ], mapOptions ),	// the actual map object
		coder = new api.Geocoder(),							 		// geocoder object for getting lat/lng from zipcodes
		markers = [],												// an array to hold all the markers
		addMarker = function( geo, status ) { 						// function to create a marker
			if ( status == api.GeocoderStatus.OK ) {				// given geographic info
				markers.push( new api.Marker( { 			
					position: geo[ 0 ].geometry.location,
					map: map
				}));
			} else {
				console.log( api.GeocoderStatus );
			}
		};
	
	// Step 1: Get the list of zipcodes from our CSV file
	$.get( 'zipcodes.csv' )
	.done( function( zips ) {
		// when the zipcodes.csv file has finished loading
		// Step 2: parse the csv file breaking it up into lines, storing it in an array
		zips = zips.split( /\r\n|\n/ );
		// Step 3: loop through the array of zipcodes
		$( zips ).each( function( i, zip ) {
			// Step 4: get the lat/long for the zip and add marker to the map
			coder.geocode( { address: zip.trim() }, addMarker );
		});
	});
});