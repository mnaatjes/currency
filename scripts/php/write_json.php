<?php
    gettype($_POST);
    var_dump($_POST);
    // write file
    file_put_contents('../JSON/data_full.json', $_POST);

?>