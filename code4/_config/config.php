<?php
// set default timezone
date_default_timezone_set('Asia/Jakarta');
session_start();

// connection
$HOST = 'localhost';
$USER = 'root';
$PASSWORD = '';
$DATABASE = 'ti_4a_2019';

$conncrud = mysqli_connect($HOST, $USER, $PASSWORD, $DATABASE);
if (mysqli_connect_errno()) {
    echo mysqli_connect_errno();
}
function base_url($url = null)
{
    $base_url = "http://dev.karyogi.polnes.ac.id";
    if ($url != null) {
        return $base_url . "/" . $url;
    } else {
        return $base_url;
    }
}
