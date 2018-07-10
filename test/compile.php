<?php
  include('../validater.php');
  $validation = new Validater(array());
  $str1 = $validation->compile('姓名: {{ name }}, 年龄: {{age }}', array('name'=>'max', 'age'=>18));
  var_dump($str1);
?>