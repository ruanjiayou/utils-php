<?php
  include('../validater.php');
  $validation = new Validater(array());
  $rule1 = $validation->_str2rule('required');
  var_dump($rule1);
  $rule2 = $validation->_str2rule('enum:pending, success, fail');
  var_dump($rule2);
?>