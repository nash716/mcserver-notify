#MCServer-notify
Minecraft Server に誰かが入ってきたら iPhone にプッシュ通知を送る何か
##導入
* im.kayac.com に登録 & iPhone アプリを入れてログイン
* `git clone https://github.com/nash716/mcserver-notify.git`
* settings.json を書く
* `node app.js`

##settings.json 記述例
```
{
	"logFile": "/path/to/logfile", // Minecraft Server が吐くログファイルへのパス
	"users": [
		{
			"minecraft": "hello1", // Minecraft ID
			"kayac": "hello2" // Minecraft ID "hello1" さんの im.kayac.com での ID
		},
		{
			"minecraft": "hello3", // Minecraft ID
			"kayac": "hello4" // Minecraft ID "hello3" さんの im.kayac.com での ID
		}
	]
}
```
##node のバージョン
v0.8.14, v0.8.15 でのみ確認しました。  
`fs.watch` をつかうので、それなりに新しいバージョンがいいと思います。
