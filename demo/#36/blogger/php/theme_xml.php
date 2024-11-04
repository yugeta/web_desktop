<?php

class ThemeXml{
  var $text = "";

  function __construct(){
    $this->text = $this->theme_xml();
  }

  function theme_xml(){
    $path = __DIR__."/../theme.xml";
    return file_get_contents($path);
  }
}