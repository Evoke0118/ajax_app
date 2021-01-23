class PostsController < ApplicationController

  def index  # indexアクションを定義した
    @posts = Post.all.order(id: "DESC")  # 新しいメモが一番上に表示されるように
  end


  def create
    Post.create(content: params[:content])
    redirect_to action: :index   #メモを保存した後にトップページへリダイレクトされるように。
  end

  def checked                     #既読の操作を行ったときに実行されるアクション
    post = Post.find(params[:id])
    if post.checked 　　　　　　　　　#既読やったら、
      post.update(checked: false)　#既読を解除するためにfalseへ変更
    else　　　　　　　　　　　　　　　　#既読じゃなかったら
      post.update(checked: true)   #既読するためにtrueに変更
    end

    item = Post.find(params[:id])　　#更新したレコードをここで取得し直し、
    render json: { post: item }     #JSON形式（データ）としてchecked.jsに返却
  end

end
