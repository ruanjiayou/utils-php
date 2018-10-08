<?php
  include('../../utils/Validater.php');
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
  var_dump($validation->rules);
?>