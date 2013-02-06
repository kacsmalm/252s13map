jQuery( document ).ready( function( $ ) {
	// Step 1: Get the list of zipcodes from our CSV file
	$.get( 'zipcodes.csv' )
	.done( function( zips ) {
		// when the zipcodes.csv file has finished loading
		console.log( zips );
	});
});