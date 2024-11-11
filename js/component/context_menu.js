export const ComponentContextMenu = {
  desktop  : [
    {
      name : "新規フォルダ",
      mode : "new_folder"
    },
    {
      name : "アイコン整列",
      mode : "icon_alignment"
    },
    {
      name : "ウィンドウ整列",
      mode : "window_alignment"
    },
    {
      name : "壁紙の設定",
      mode : "change_background"
    },
    {
      name : "アラート表示",
      mode : "view_modal"
    }
  ],

  window : [
    {
      name : "新規フォルダ",
      mode : "new_folder",
      auth : {
        system_flg : false
      }
    },
    {
      name : "アイコン整列",
      mode : "icon_alignment"
    }
  ],

  icon     : [
    {
      name : "開く",
      mode : "icon_open"
    },
    {
      name : "名前変更",
      mode : "name_change",
      auth : {
        system_flg : false
      }
    },
    {
      name : "ゴミ箱に入れる",
      mode : "to_trash",
      auth : {
        system_flg : false
      }
    }
  ]
}