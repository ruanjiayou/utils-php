<?php
  include('../../utils/Validater.php');
  try {
    $validation = new Validater(array());
    $rule2 = $validation->_str2rule('enum:pending, success, fail');
    var_dump($rule2);
    $rule1 = $validation->_str2rule('required');
    var_dump($rule1);
  } catch(Exception $e) {
    echo('查看详情要用Hinter类的方法!');
    echo($e->getMessage());
  }
?>