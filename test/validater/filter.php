<?php
  include('../../utils/Validater.php');
  $validation = new Validater(array(
      'member_id' => 'required|int',
      'member_name' => 'required|string'
  ));
  $input = $validation->filter(array('member_id'=>1,'member_name'=>'max','member_avatar'=>'http://'));
  var_dump($input);
?>