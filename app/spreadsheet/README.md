
# Develop

- 参考ページ
> https://b-risk.jp/blog/2022/11/js-spreadsheet/

1. アクセス先のスプレッドシートの作成
- https://docs.google.com/spreadsheets/d/1oFMDcwDraq6q_I1BZKIGbsq4IziqY2CxPz_hubyvuqg/edit?gid=0#gid=0

2. GAS設定
- 追加
```
function readData() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  const sheet1 = spreadsheet.getSheetByName('サイト一覧')
  const data_range = sheet1.getRange('A2:C7')
  const data_values = data_range.getValues()
 
  const return_data = data_values.map(data_row => {
    //data_rangeで設定した範囲内の行数を回す
    var colors = []

    for( var i = 0; i < 5; i++) {
      colors.push( data_row[3+i] ) //D列からH列までの値を順に配列に追加
    }
 
    return {
      image: data_row[0], //スプレッドシートのA列の値を追加
      name: data_row[1], //スプレッドシートのB列の値を追加
      price: data_row[2], //スプレッドシートのC列の値を追加
      colors: colors, //colorsという変数を追加
    }
  })
 
  return return_data
}
 
function doGet() {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
    const sheet1 = spreadsheet.getSheetByName('サイト一覧')
    const data_range = sheet1.getRange('A2:C7')
    const data = data_range.getValues()
    
    const response = ContentService.createTextOutput()
    response.setMimeType(MimeType.JSON)
    response.setContent(JSON.stringify(data))
    return response; 
}
```

- プロジェクトの保存
- スタート関数の指定
- 新しいデプロイ
```
# デプロイID
AKfycbzIk6P1Gnx1ZQlyUXl1bJaLVhS3nWU0XII7yGHXXyjL1dTVXxCpN1lmp59c4iFPmem56w

# URL
https://script.google.com/macros/s/AKfycbzIk6P1Gnx1ZQlyUXl1bJaLVhS3nWU0XII7yGHXXyjL1dTVXxCpN1lmp59c4iFPmem56w/exec
```

