/**
 * 共通データや処理関連のモジュール
 */

export class Common{
  // 数字を表示するエレメント
  static get elm_result(){
    return document.querySelector(`.calculator .result`)
  }

  // 入力して表示されている数値（文字列）を取得
  static get current_str(){
    return Common.elm_result.textContent
  }
}