<?php
if($_POST['page']){
$page=$_POST['page'];
}else{
$page=$_GET['page'];
}
switch ($page) {

	case 'pageA':
		include ("pageA.html");
 	break;
	case 'pageB':
		include ("pageB.php");
 	break;
	
	}
?>