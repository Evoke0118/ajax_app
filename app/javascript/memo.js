function memo() {                                    //ページを読み込み時に実行されるように
  const submit = document.getElementById("submit");
  submit.addEventListener("click", (e) => {
    const formData = new FormData(document.getElementById("form"));   //FormData=フォームに入力された値を取得できるオブジェクト
    const XHR = new XMLHttpRequest();         //非同期通信を実装するために必要なオブジェクト生成
    XHR.open("POST", "/posts", true);         //openメソッドを記述してリクエストの内容を引数へ追記
    XHR.responseType = "json";                //返却されるデータ形式はjson
    XHR.send(formData);
    XHR.onload = () => {
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }
      const item = XHR.response.post;          //レスポンスとして返却されたメモのレコードデータを取得
      const list = document.getElementById("list");   //描画する親要素のlistの要素を取得
      const formText = document.getElementById("content"); //メモの入力ホームをリセットするため
      const HTML = `   
        <div class="post" data-id=${item.id}> 
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;
      list.insertAdjacentHTML("afterend", HTML);  //listに対してinsertAdjacentHTMLでHTMLを追加
      formText.value = "";                        //メモの入力ホームに入力されたままの文字はリセットされる
    };
    e.preventDefault();  //標準設定されているイベントを阻止するメソッド
  });

}                     
window.addEventListener("load", memo);

