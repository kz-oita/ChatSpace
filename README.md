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
- has_many :users,through :groups_users

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false,index: true|
|email|string|null: false,unique: true|
|psaaword|string|null: false,unique: true|
### Association
- has_many :messages
  has_many :groups_users
- has_many :groups,through :groups_users

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

