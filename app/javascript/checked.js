function check() {                                   //関数を定義  // 表示されているすべてのメモを取得している
  const posts = document.querySelectorAll(".post");   //querySelectorAllメソッドで、postをクラス名にもつ要素を取得
  posts.forEach(function (post) {                     //それぞれの要素への処理を記述する場所を用意
    if (post.getAttribute("data-load") != null) {     //addEventListenerが重複して追加されることを回避
      return null;
    }
    post.setAttribute("data-load", "true");           //回避文ここまで/要素にdata-load = "true"と属性を追加 
    post.addEventListener("click", () => {            //addEventListenerメソッドを使用し、引数にclickの指定   //メモをクリックした場合に実行する処理を定義している
      const postId = post.getAttribute("data-id");    //メモのidを取得       // どのメモをクリックしたのか、カスタムデータを利用して取得している
      const XHR = new XMLHttpRequest();               //オブジェクトを生成。エンドポイントを呼び出すため。
      XHR.open("GET", `/posts/${postId}`, true);     //open リクエストの詳細を指定
      XHR.responseType = "json";                      //responseType レスポンスとして欲しい情報の形式を指定
      XHR.send();                                    //リクエストが行える証拠
      XHR.onload = () => {                           //レスポンスなどの受信が成功した場合に呼び出されるイベントハンドラー
        if (XHR.status != 200) {                     //200以外の場合は、
          alert(`Error ${XHR.status}: ${XHR.statusText}`);  //アラートを表示する処理
          return null;                                      //JSの処理から抜け出せる＝エラーが出たときに１５行目以降の処理は行わないようにするため
        }
        const item = XHR.response.post;              //XHR.responseでレスポンスされてきたJSONにアクセスできる。
        if (item.checked === true) {
          post.setAttribute("data-check", "true");    // 既読状態であれば、灰色に変わるcssを適用するためのカスタムデータを追加している
        } else if (item.checked === false) {
          post.removeAttribute("data-check");         // 未読状態であれば、カスタムデータを削除している

        }
      };
    });       
  });     
}

setInterval(check, 1000);
