## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user

## groupテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|member|string|null: false|
|user_id|integer|null: false, foreign_key: true|
### Association
- has_many :messages
- has_many :users

## userテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|string|null: false,unique: true|
|psaaword|string|null: false,unique: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- has_many :messages
- has_many :groups

## messageテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|image|string||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user

