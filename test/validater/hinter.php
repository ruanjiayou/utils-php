<?php
  include('../../utils/Validater.php');
  $validation = new Validater(array(
      'member_id' => 'required|int'
  ));

  try {
    //throw new Exception('ha 23333');
    $input = $validation->validate(array());
    var_dump($input);
  } catch(Hinter $e2) {
    var_dump('hinter');
    var_dump($e2->info);
  } catch(Exception $e1) {
    var_dump('exception');
  }
?>