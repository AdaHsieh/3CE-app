var currentWinSentout = Ti.UI.currentWindow;

currentWinSentout.addEventListener('android:back', function(e){
	var alertDialog = Ti.UI.createAlertDialog({
		message: '已將您的訂購資訊送出，若有任何問題的話，歡迎您來電查詢!',
		ok: '好的!',
		title: '不好意思!'
	}).show();
});

var totalPrice = Ti.UI.currentWindow.totalPrice;

var imgSentOutTitle = Ti.UI.createView({
	width: 320,
	height: 50,
	top: 0,
	left: 0,
	backgroundImage: 'Images/SentOutTiTle.png'
});
currentWinSentout.add(imgSentOutTitle);

var lblMemo_1 = Ti.UI.createLabel({
	text: "您已成功訂購商品，",
	textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
	font: {fontSize: 22, fontWeight: 'bold'},
	color: '#810202',
	left: 20,
	top: 60,
	height: 30,
	width: 280
});
currentWinSentout.add(lblMemo_1);

var lblMemo_1 = Ti.UI.createLabel({
	text: "以下為匯款資訊：",
	textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
	font: {fontSize: 22, fontWeight: 'bold'},
	color: '#810202',
	left: 20,
	top: 95,
	height: 30,
	width: 280
});
currentWinSentout.add(lblMemo_1);

var imgSentOutInfo = Ti.UI.createImageView({
	width: 320,
	height: 280,
	top: 130,
	left: 0,
	image: 'Images/RemittanceInfo.png'
});
currentWinSentout.add(imgSentOutInfo);

var totalPrice = Ti.UI.createLabel({
	text: "$ " + totalPrice,
	textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
	font: {fontSize: 24, fontWeight: 'bold'},
	color: '#510101',
	left: 110,
	top: 320,
	height: 30,
	width: 190
});
currentWinSentout.add(totalPrice);

var btnSaveRemittanceInfo = Ti.UI.createButton({
	width: 150,
	height: 45,
	top: 405,
	left: 5,
	backgroundImage: 'Images/SaveRemittanceInfo.png'
});
btnSaveRemittanceInfo.addEventListener('click', function(e){
	Ti.Media.takeScreenshot(function(event){
		//var temp = Titanium.Filesystem.getFile(Titanium.Filesystem.externalStorageDirectory, 'RemittanceInfo.png');   //android
		var temp = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory , 'RemittanceInfo.png');  //iPhone
		temp.write(event.media);
		
		Ti.Media.saveToPhotoGallery(event.media); //iPhone
		if(Ti.Filesystem.getFile('RemittanceInfo.png') != null){
			var alertDialog = Ti.UI.createAlertDialog({
				message: '已將匯款資訊快照至您的手機，感謝您的訂購!',
				ok: '好的!',
				title: '謝謝您!'
			}).show();
		};
	});
});
currentWinSentout.add(btnSaveRemittanceInfo);

var btnExit = Ti.UI.createButton({
	width: 150,
	height: 45,
	top: 405,
	left: 165,
	backgroundImage: 'Images/Exit.png'
});
btnExit.addEventListener('click', function(e){
	var alertDialog = Ti.UI.createAlertDialog({
		message: '感謝您的訂購，期待您再次光臨!',
		ok: '好的!',
		title: '謝謝您!'
	});
	alertDialog.addEventListener('click', function(e){
		var winHome = Ti.UI.createWindow({
			url: 'app2.js',
			title: '首頁',
			backgroundImage: 'Images/background.png',
			backgroundColor: 'white',
			navBarHidden: true,
		});
		winHome.open();
		cleanOrderData();
	});
	alertDialog.show();
});
currentWinSentout.add(btnExit);

function cleanOrderData(){
	var db = Ti.Database.install('SQLData/Order.sqlite', 'OrderData');
	var rowOrder = db.execute('SELECT id FROM orders');
	
	while(rowOrder.isValidRow()){
		var orderId = rowOrder.fieldByName('id');
		db.execute('DELETE FROM orders WHERE id=?', orderId);
		rowOrder.next();
	};
};