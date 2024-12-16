<?php
require_once "php/create_theme.php";

$theme = new CreateTheme();

echo "<pre>";
print_r(htmlspecialchars($theme->text));
