jQuery( document ).ready( function( $ ) {
	// Step 0: declare necessary variables
	var api = google.maps,											// convenience variable so I don't have to type google.maps a lot
		mapOptions = { 												// options for the map
			center: new api.LatLng( 38.4332, -78.8663 ),
			zoom: 5, 
			mapTypeId: api.MapTypeId.ROADMAP },
		map = new api.Map( $( '#map_canvas' )[ 0 ], mapOptions ),	// the actual map object
		markers = [];												// an array to hold all the markers
	
	// Step 1: Get the list of zipcodes from our CSV file
	$.get( 'js/coords.json' )
	.done( function( zips ) {
		$.each( zips, function( zip, coords ) {
			markers.push( new api.Marker( { 			
				position: new api.LatLng( coords.lat, coords.lng ),
				map: map
			}));
		});
	});
});