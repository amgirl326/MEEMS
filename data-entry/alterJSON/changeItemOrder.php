<?php

$pk = $_POST['primarykey'];
$pk = (int)$pk;
$menuPK = $_POST['menuPK'];
$direction = $_POST['direction'];
$filename = '../../data.json';

$json = file_get_contents($filename);
$json = json_decode($json,true);
for($i=0; $i<count($json); $i++){
	if($json[$i]['pk'] == $menuPK) {
		$currentOrder = $json[$i]['items'];
		print_r($currentOrder);
		$index = array_search($pk, $currentOrder);
		$last_index =  count($currentOrder) - 1;
		if(($index == 0 and $direction == "up") or ($index == $last_index and $direction == "down")){
			print("no change");
		}
		elseif($direction == "up"){
			$movingvalue = $currentOrder[$index-1];
			$currentOrder[$index-1] = $pk;
			$currentOrder[$index] = $movingvalue;
		}
		elseif($direction == "down"){
			$movingvalue = $currentOrder[$index+1];
			$currentOrder[$index+1] = $pk;
			$currentOrder[$index] = $movingvalue;
		}
		$json[$i]['items'] = $currentOrder;
	}
}
$fp = fopen($filename, 'w');
fwrite($fp, json_encode($json));
fclose($fp);

?>
