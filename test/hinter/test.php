<?php
  try {
    throw (new Hinter())->setHinter(['message'=>'test']);
    //throw new Exception('??');
  } catch(Hinter $h) {
    return $h->info;
  } catch(Exception $e) {
    
  }
?>