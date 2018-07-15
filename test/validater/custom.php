<?php
class Hinter extends Exception {
    public function errorMessage() {
        $errorMsg = 'Error on line ' . $this->getLine() . ' in ' . $this->getFile() . ': <b>' . $this->getMessage() . '</b> is not a valid E-Mail address';
        return $errorMsg;
    }
}
  
// 使用
try {
    //throw new Hinter('error message');
    throw new Exception('error message');
} catch (Hinter $e) {
    echo $e->errorMessage();
} catch (Exception $e2) {
    echo $e2->getMessage();
}
?>