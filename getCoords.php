<?php
	header( 'content-type: text/plain' );
	$cfile = file_get_contents( 'js/coords.js' );
	$coords = (array) json_decode( trim( $cfile ) );
	$url = 'http://maps.googleapis.com/maps/api/geocode/json?sensor=false&address=';
	$zips = file( 'zipcodes.csv' );
	$ch = curl_init();
	curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
	$fail_count = 0;
	foreach ( $zips as $zip ) {
		$zip = trim( $zip );
		if ( ! array_key_exists( $zip, $coords ) ) {
			curl_setopt( $ch, CURLOPT_URL, $url . $zip );
			$geo = json_decode( curl_exec( $ch ) );
			if ( 'OK' == $geo->status ) {
				$geo = $geo->results[ 0 ]->geometry->location;
				$coords[ $zip ] = (object) array( 'lat' => $geo->lat, 'lng' => $geo->lng );
			} else {
				$fail_count++;
				//print_r( $geo );
			}
		}
	}
	echo "Failed: $fail_count\n";
	echo "Count: " . count( $coords ) . "\n";
	$cfile = fopen( 'js/coords.js', 'w' );
	fwrite( $cfile, json_encode( $coords ) );
	fclose( $cfile );
	print_r( $coords );
