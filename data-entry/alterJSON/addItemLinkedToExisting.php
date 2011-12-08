<?php

$json = file_get_contents("../../data.json");
$jsonIterator = json_decode($json,true);

$pkCounter = array();
$menuPk = 0;
for($counter=0; $counter<=count($jsonIterator); $counter += 1){
	array_push($pkCounter, $jsonIterator[$counter]['pk']);
	if($jsonIterator[$counter]['type'] == "MENU" && $jsonIterator[$counter]['pk'] == $_POST["primarykey"]){
		$menuPk = $counter;
	}
	
}

$newItemArray = array();
echo "####";
$newPK = max($pkCounter)+1;
$nextPK = $_POST["nextPK"];

print_r($jsonIterator[$menuPk]['items']);
array_push($jsonIterator[$menuPk]['items'], $newPK);
print_r($jsonIterator[$menuPk]['items']);
$newItemArray['pk'] = $newPK;
$newItemArray['title'] = $_POST["title"];
$newItemArray['type'] = "ITEM";
$newItemArray['next'] = $nextPK;
print_r($newItemArray);
array_push($jsonIterator, $newItemArray);

$filename = '../../data.json';
$fp = fopen($filename, 'w');
fwrite($fp, json_encode($jsonIterator));
fclose($fp);

?>
