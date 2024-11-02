BloggerAPI
===
```
Create : 2024-10-09
Author : Yugeta.Koji
```

# Summary
- Bloggerの記事検索をjavascriptで取得するコード
- PHPでも取得できるが現在は処理を外している。

# Howto
1. page/common/asset/blogger.json
```
{
  "mode"   : "blogger",
  "domain" : "kumamoto-universe-ks-portal.blogspot.com"
}
```

2. page/common/js/blogger.js
- blogger.jsonデータの読み込み
- 何度も呼び出さないためにデータを保持する役割

3. ニュース記事や記事ページ（単一ニュース）の読み込み
- page/news/js/news.js(article.js)
```
import { Main as BloggerMain }  from "../../../asset/blogger/main.js"

# htmlアセットの読み込み（表示用HTMLパーツ）
asset_load(){...}

# Bloggerデータ読み込み（基本データに情報を足す）
blogger_load(){
  const conv = {
    type  : "posts",
    label : "news",
  }
  const datas = {...Blogger.datas, ...conv}
  new BloggerMain(datas).promise.then(this.blogger_loaded.bind(this))
}
```

4. 受け取ったデータの表示
```
blogger_loaded(res){
  News.datas = datas
  for(const data of datas){
    const html = new Convert(this.html).double_bracket(data)
    this.root.insertAdjacentHTML("beforeend" , html)
  }
}
```

5. ページデータの場合
- page/{*page-name}/js/...js
```
import { Main as BloggerMain }  from "../../../asset/blogger/main.js"

load_blogger_page(){
  const conv  = {
    type : "pages",
    path : "/p/about.html", // 該当ページのページID（アドレス）を入力　※Bloggerのページを公開したURLから取得
  }
  const datas = {...Blogger.datas, ...conv}
  new BloggerMain(datas).promise.then(this.loaded_blogger_page.bind(this))
}

// .contentに、HTMLを入れ込む
loaded_blogger_page(data){
  if(!data || !data[0]){return}
  this.content.innerHTML = data[0].html
}
```
- 上記の場合、CSSを個別に書く必要があり、BloggerのHTMLを工夫する必要もあるため、この点に仕組みが必要。

