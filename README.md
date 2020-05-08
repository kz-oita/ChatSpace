# アプリ名
## ChatSpace
(http://18.178.142.247/)

# テストアカウント
メールアドレス  : test@gmail.com

パスワード      : 11111111

# 概要
メッセージアプリ （プログラミングスクールの課題）

# 機能
- ユーザー登録/編集
- グループ作成/編集
- メーッセージ送信（非同期通信）
- 画像送信（非同期通信）

# 開発環境
- haml
- sass
- ruby on rails
- jquery
- AWS
- Nginx
- Capistrano
- mysql
- guthub


## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
### Association
- has_many :messages
  has_many :groups_users
- has_many :users,through: :groups_users

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false,index: true|
|email|string|null: false,unique: true|
|psaaword|string|null: false,unique: true|
### Association
- has_many :messages
  has_many :groups_users
- has_many :groups,through: :groups_users

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text||
|image|string||
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user

