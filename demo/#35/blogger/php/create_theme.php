<?php

require_once "php/theme_css.php";
require_once "php/theme_js.php";
require_once "php/theme_xml.php";
require_once "php/index_html.php";

class CreateTheme{
  var $text = "";
  var $index_html = null;
  var $theme_xml  = null;
  var $theme_css  = null;
  var $theme_js   = null;
  var $theme_widget = null;
  // var $test = null;

  function __construct(){
    $this->index_html = new IndexHtml();
    $this->theme_xml  = new ThemeXml();
    $this->theme_css  = new ThemeCss();
    $this->theme_js   = new ThemeJs();
    $this->text       = $this->get_text();
  }

  function get_text(){
    $html = $this->theme_xml->text;
    $html = str_replace("{{theme_css}}", $this->theme_css->text  , $html);
    $html = str_replace("{{theme_js}}" , $this->theme_js->text   , $html);
    $html = str_replace("{{html}}"     , $this->index_html->html , $html);
    $html = str_replace("{{head}}"     , $this->index_html->head , $html);
    $html = str_replace("{{body}}"     , $this->index_html->body , $html);
    $html = $this->get_main($html);
    return $html;
  }

  // widget設定
  function get_widget(){
    return <<<WIDGET
<b:section id='メイン' class='main'>
<b:widget id='Blog1' locked='true' title='WebDesktop' type='Blog' visible='true' version='2'>
  <b:includable id='main'>
    <b:switch var='data:blog.pageType'>

      <b:case value='index'/>
        <b:if cond='data:blog.searchQuery'>
          # 検索結果
          <b:loop var='post' values='data:posts'>
            <b:include name='articles' />
          </b:loop>

          <b:elseif cond='data:blog.searchLabel'/>
          # ラベル検索結果
          <b:loop var='post' values='data:posts'>
            <b:include name='articles' />
          </b:loop>

          <b:else/>
          # 記事一覧(index)
          <b:loop var='post' values='data:posts'>
            <b:include name='articles' />
          </b:loop>
        </b:if>

      <b:case value='item'/>
        <b:loop var='post' values='data:posts'>
          <b:include name='article' />
        </b:loop>

      <b:case value='static_page'/>
        <b:loop var='post' values='data:posts'>
          <b:include name='page' />
        </b:loop>

      <b:default/>
      <h1>Not found page.</h1>
        <data:blog.pageType/>
        <b:loop var='post' values='data:blogPosts'>
          <b:include name='articles' />
        </b:loop>

    </b:switch>
  </b:includable>


  <b:includable id='page'>
    <data:post.body />
  </b:includable>

  <b:includable id='articles'>
    <data:post.body />
  </b:includable>
  
  <b:includable id='article'>
  <data:post.body />
  </b:includable>

</b:widget>
</b:section>
WIDGET;
  }

  function get_main($html){
    $reg = "/(<main.*?>).*?(<\/main>)/is";
    preg_match($reg, $html, $match);
    if($match){
      $html = str_replace($match[0], $match[1].$this->get_widget().$match[2], $html);
    }
    return $html;
  }
}