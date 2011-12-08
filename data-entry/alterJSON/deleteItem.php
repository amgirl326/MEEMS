<?php

$pk = $_POST['primarykey'];
$filename = '../../data.json';

$json = file_get_contents($filename);
$json = json_decode($json,true);
for($i=0; $i<count($json); $i++){
	if($json[$i]['type'] == 'MENU') {
		$idx = array_search($pk, $json[$i]['items']);
		
		//die(print_r($json[$i]['items'], true));
		
		if($idx !== FALSE) {
			//die("found $pk at elem $idx\n");
			array_splice($json[$i]['items'],$idx,1); 
		}
	}

	if($json[$i]['pk'] == $pk) {
		array_splice($json,$i,1);
	}
}
$fp = fopen($filename, 'w');
fwrite($fp, json_encode($json));
fclose($fp);

?>

