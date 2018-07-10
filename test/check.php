<?php
  include('../validater.php');
  $validation = new Validater(array(
    'name' => 'required|string|minlength:6|maxlength:18',
    'age' => 'required|int|min:0|max:100',
    'money' => 'nullable|nonzero|float',
    'status' => 'nullable|string|enum:pending, success, fail',
    'description' => 'nullable|empty|string',
    'mark' => 'nullable|string|methods:other'
  ), array(
    'other' => function($v) {
      var_dump($v);
      return true;
    }
  ));

  try {
    $input1 = $validation->check(array(
        'name' => 'ruanjiayou',
        'age' => '18',
        'money' => '18.96',
        'status' => 'success',
        'description' => '',
        'mark' => '?'
    ));
    var_dump($input1);
    $input2 = $validation->check(array(
        'name' => 'ruanjiayou',
        'age' => '18',
        'money' => '18.963',
        'status' => 'success',
        'description' => '',
        'mark' => '?'
    ));
    var_dump($input2);
  } catch(Exception $e) {
    echo $e->getMessage();
  }
  
?>