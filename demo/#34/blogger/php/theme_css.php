<?php

/**
 * BloggerのTheme.xmlに登録するcss
 * - 起点となるcssファイルから、importされるcssファイルを順に読み込んで1テキストデータにする。
 * - rootは、style.css
 * - @import "%target-css-file-path";
 */

class ThemeCss{
  var $data = null;
  var $text = null;
  var $dir  = null;
  var $imports = [];

  function __construct(){
    $this->dir  = __DIR__;
    $path       = __DIR__ ."/../../css/style.css";
    $this->text = $this->load_css($path);
  }

  function load_css($path=""){
    $text   = file_get_contents($path);
    $imports = $this->get_imports($text, $path);
    $this->imports = $imports;
    $res = $this->replace_imports($text, $imports);
    return $res;
  }

  function get_imports($line_str="", $path=""){
    preg_match_all("/@import.*?[\"\'](.+?)[\"\'];.*?/", $line_str, $matches);
    if($matches){
      $datas = [];
      for($i=0,$c=count($matches[0]); $i<$c; $i++){
        $datas[] = [
          "base" => $matches[0][$i],
          "file" => $matches[1][$i],
          "path" => $this->adjust_path($path, $matches[1][$i]),
        ];
      }
      return $datas;
    }
    else{
      return [];
    }
  }

  function replace_imports($text="", $imports=[]){
    for($i=0,$c=count($imports); $i<$c; $i++){
      $comment = "/**\n * {$imports[$i]["base"]}\n */";
      $css     = $this->load_css($imports[$i]["path"]);
      $text    = str_replace($imports[$i]["base"], $comment."\n".$css."\n", $text);
    }
    return $text;
  }

  function adjust_path($current_path="", $import_path=""){
    $sp1 = explode("/", $current_path);
    $sp2 = array_splice($sp1, 0, -1);
    $dir = implode("/", $sp2);
    return $dir ."/". $import_path;
  }

}