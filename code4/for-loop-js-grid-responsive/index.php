<?php
include_once('../_config/config.php');
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <title>For loop - Js, Grid responsive</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  <link rel="stylesheet" href="css/style.css" />
</head>

<body>

  <div class="X">
    <h1>For loop - Js</h1>

    <ul>
      <?php
      $query = "SELECT * FROM galery";
      $hasil = mysqli_query($conncrud, $query);
      while ($row = mysqli_fetch_row($hasil)) {
        ?>
        <li>
          <div class="box">
            <img src="img/<?php echo $row[4] ?>">
          </div>
        </li>
      <?php
    }
    ?>
    </ul>
    <h2>By: @wilder_taype</h2>
  </div>
  <!--Fonts: Gooogle and Awesome-->
  <link href="//goo.gl/yDbmRB" rel="stylesheet" />
  <link href="//goo.gl/HLXxEE" rel="stylesheet" />


</body>

</html>