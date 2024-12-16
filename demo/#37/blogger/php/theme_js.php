<?php

/**
 * BloggerのTheme.xmlに登録するjs
 * - 起点となる、main.jsから、importされるjsファイルを読み込んで、1つのテキストデータにする。
 * - 1ファイル1クラス定義を前提とする。
 * - 重複クラスが無いようにする。
 */

class ThemeJs{
  var $data = null;
  var $text = null;
  var $dir  = null;
  var $imports = [];
  var $import_paths = [];

  function __construct(){
    $this->dir  = __DIR__;
    $path       = __DIR__ ."/../../js/main.js";
    $this->text = $this->load_js($path);
  }

  function load_js($path=""){
    if(!is_file($path)){return;}
    $text   = file_get_contents($path);
    // return $text;
    $imports = $this->get_imports($text, $path);
    $this->imports = $imports;
    $res = $this->replace_imports($text, $imports);
    return $res;
  }

  function get_imports($line_str="", $path=""){
    preg_match_all("/import.*?\{(.+?)\}.*?[\"\'](.+?)[\"\'].*?[\n]/", trim($line_str), $matches);
    if($matches){
      $datas = [];
      for($i=0,$c=count($matches[0]); $i<$c; $i++){
        $import_path = realpath($this->adjust_path($path, $matches[2][$i]));
        $datas[] = [
          "base" => $matches[0][$i],
          "name" => $matches[1][$i],
          "file" => $matches[2][$i],
          "path" => $import_path,
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
      if(!in_array($imports[$i]["path"], $this->import_paths)){
        $this->import_paths[] = $imports[$i]["path"];
        // $comment = "// ----------\n// {$imports[$i]["file"]}";
        $js      = $this->load_js($imports[$i]["path"]);
        $text    = str_replace($imports[$i]["base"],$js.PHP_EOL, $text);
        // $text    = str_replace($imports[$i]["base"], $comment."\n", $text);
      }
      // 重複モジュール
      else{
        $text    = str_replace($imports[$i]["base"], PHP_EOL, $text);
      }
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
