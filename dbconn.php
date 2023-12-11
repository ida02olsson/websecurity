<?php
    class dbconn {
    public function dbcon() {
        global $conn;
        $conn = new mysqli('localhost','server','password','Webshop') or die 
        ('Error connecting to mysql' .mysqli_error());
        return $conn;

    }
}
?>