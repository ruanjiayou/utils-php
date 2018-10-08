<?php
  include('../../utils/Validater.php');
  $validation = new Validater([
    'name'=>'required|array|alias:goods_%'
  ]);
  $input = $validation->validate(['name'=>['a1','a2']]);
  var_dump($input);
?>