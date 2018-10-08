<?php
  include('../../utils/Validater.php');
  try {
    $validation = new Validater([
      'test1'=>'required|array|maxlength:1|default:(toString)'
    ]);
    $input = $validation->validate(['test1'=>['a1','a2']]);
    var_dump($input);
  } catch(Hinter $h) {
    var_dump($h->info);
  }
?>