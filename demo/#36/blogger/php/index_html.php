<?php

class IndexHtml{
  var $text = "";
  var $html = "";
  var $head = "";
  var $body = "";
  var $main = "";

  function __construct(){
    $this->text = $this->index_html();
    $this->html = $this->get_html();
    $this->head = $this->get_head();
    $this->body = $this->get_body();
  }

  function index_html(){
    $path = __DIR__."/../../index.html";
    return file_get_contents($path);
  }

  function get_html(){
    $reg = "/(<html.*?>)/is";
    preg_match($reg, $this->text, $match);
    return $match[1];
  }

  function get_head(){
    $reg = "/<head.*?>(.*?)<\/head>/is";
    preg_match($reg, $this->text, $match);
    return $match[1];
  }

  function get_body(){
    $reg = "/(<body.*?>.+?<\/body>)/is";
    preg_match($reg, $this->text, $match);
    return $match[1];
  }
}