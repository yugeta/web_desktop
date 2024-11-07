

export class Setting{
  static desktop_icons = [
    {
      id   : "setting",
      name : "System",
      type : "folder",
      icon : "img/icon/folder_setting.svg"
    },
    {
      id   : "app",
      name : "App",
      type : "folder",
      icon : "img/icon/folder_app.svg"
    },
    {
      id   : "sample_3",
      name : "Heart",
      type : "folder",
      icon : "img/icon/like-svgrepo-com.png",
      parent_id : "sample_1"
    },
    {
      id   : "sample_4",
      name : "World",
      type : "folder",
      icon : "img/icon/the-internet-svgrepo-com.png",
      parent_id : "sample_1"
    },
    {
      id   : "files",
      name : "ファイル一覧",
      type : "folder",
      parent_id : ""
    },
    {
      id   : "file_1",
      type : "file",
      parent_id : "files",
      target : "data/files/サンプルファイル.txt"
    },
    {
      id   : "trash",
      name : "ゴミ箱",
      type : "trash"
    },
    {
      id   : "contact",
      name : "お問い合わせ",
      type : "app",
      parent_id : "app",
      target : "app/contact/index.html",
      window_size : {
        width  : 500,
        height : 400
      }
    },
    {
      id   : "calculator",
      name : "計算機",
      type : "app",
      parent_id : "app"
    },
    {
      id   : "browser",
      name : "ブラウザ",
      type : "app",
      parent_id : "app"
    },
    {
      id   : "blogger",
      name : "Blog",
      type : "app",
      parent_id : "app"
    },
    {
      id   : "spreadsheet",
      name : "Spread Sheet",
      type : "app",
      parent_id : "app"
    },
    {
      id   : "calendar",
      name : "カレンダー",
      type : "app",
      window_size : {
        width  : 500,
        height : 500
      },
      parent_id : "app"
    }
  ]

  static windows2 = [
    {
      id : "calendar",
      w : 500,
      h : 500,
      position : {
        x : "center",
        y : "center"
      },
      offset  :{
        x : 100,
        y : 100
      }
    }
  ]

  static icon = {
    size : {
      w : 100,
      h : 100,
      z : 1
    }
  }

  static window = {
    pos : {
      x: 80, 
      y: 20
    },
    gap : {
      x: 30, 
      y: 40
    },
    size : {
      w : 300,
      h : 200
    },
    z : 1000
  }

  static context_menu = {
    desktop:[
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
    "window":[
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
    icon:[
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

  static google_auth = {
    client_id  : "804503220905-iav9l316ldg3e7f9ijeos4kf597ij9ec.apps.googleusercontent.com",
    module_src : "https://accounts.google.com/gsi/client" 
  }

  static background = "linear-gradient(-45deg, #6bd8e5, #98cead)"
}