export const Icons = [
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