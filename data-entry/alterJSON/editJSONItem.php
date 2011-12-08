<?php

$type = $_POST['type'];
$pk = $_POST['primarykey'];
$newdata = $_POST["editData"];
$filename = '../../data.json';

if(!$type) {
	$type = 'data';
}

$json = file_get_contents($filename);
$json = json_decode($json,true);
for($i=0; $i<count($json); $i++){
//	if(array_key_exists($type,$json[$i])){
		if($json[$i]['pk'] == $pk) {
			$json[$i][$type] = $newdata;
		}
//	}
}
$fp = fopen($filename, 'w');
fwrite($fp, json_encode($json));
fclose($fp);

?>
