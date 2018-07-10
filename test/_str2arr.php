<?php
  include('../validater.php');
  $validation = new Validater();
  $str = $validation->_str2arr('1,2,3');
  var_dump($str);
?>