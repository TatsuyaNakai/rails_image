### slack にも記載してあるので、重複します。

## 質問事項

・`front_end/src/components/Users.jsx` において、58 行目に書かれている JS 構文が即時関数なのかな。と思ったのですが、即時関数であれば関数の最後に()の実行するための括弧があるはずなので、違うと思い、そもそも `function` と書かれていないじゃないか、と思い即時関数ではないなと考え、また引数が何を指しているのかわからず止まってしまいました。58 行目は何を意味しているのか教えてもらいたいです！
・`front_end/src/components/Users.jsx` 38 行目の `payload` を引数として持っているのですが、56 行目の createUser において引数をセットしていないので、このままでは axios で post できないと思うのですが、こちらのサイトではこのような書き方をしてうまく行っているそうです。github からコードを取ってきましたが、僕のコードと同じでした。
・`app/controllers/users_controller.rb `において create アクションのところになります。
`user=User.create!(user_params)`
との記載があるのですが、今回テーブルは作成していますが、モデルは作成していません。create で作成できるのでしょうか。

今のところ、製作者の方とコードは class コンポーネントで書かれている部分と、ポート番号（サイトでは React が 3000 , Rails が 3001 ですが、僕は逆なので、CORS と axios の送信する URI を逆にしています。）以外では僕のコードは同じだと思っています。しかしうまくいかず、上記の疑問点を残しながら止まってしまいました。
下記のサイトを使って調べ、実践しましたが、結果としては、
`POST http://localhost:3000/users 500`
とのブラウザ表示になり、ターミナルでは、
`NameError (uninitialized constant UsersController::User):`
`app/controllers/users_controller.rb:9:in 'create'`

と書かれていました。やはり User のモデルを作成していない事もエラーにつながっていると思っています。

ご確認お願いします！
