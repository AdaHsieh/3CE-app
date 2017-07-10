Titanium.UI.setBackgroundColor('#fff');

var tabGroup = Ti.UI.createTabGroup({
	navBarHidden: true,
});

tabGroup.addEventListener('android:back', function(e){
	var alertDialog = Ti.UI.createAlertDialog({
		message: '請點選上方的分頁來進行商品採購或點選返回鍵回到上一頁，謝謝您! ',
		ok: '好的!',
		title: '不好意思!'
	}).show();
});

var db = Ti.Database.install('SQLData/Commodity.sqlite','w');

// ----------------Jam----------------

var winJam = Ti.UI.createWindow({
	width: 320,
	height: 480,
	top: 0,
	left: 0,
	backgroundImage: 'Images/background.png',
	backgroundColor: 'white',
	navBarHidden: true
});

var jamData = [];

var rowJam = db.execute('SELECT name, price, imageurl FROM jam');

while(rowJam.isValidRow()){	
	
	var row = Ti.UI.createTableViewRow({
		hasChild: true,
		className: 'jam-row',
		path: 'products.js',
		prodName: ''+ rowJam.fieldByName('name') + '',
		type: 'jam',
		prodPrice: '' + rowJam.fieldByName('price') + ''
	});
	
	var lblJamName = Ti.UI.createLabel({
		text: rowJam.fieldByName('name'),
		textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
		font: {fontSize: 20, fontWeight: 'bold'},
		color: '#ff1e78',
		left: 80,
		top: 10,
		height: 40,
		width: 210
	});
	row.add(lblJamName);
	
	var lblJamPrice = Ti.UI.createLabel({
		text: "$ " + rowJam.fieldByName('price'),
		textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
		shadowColor: '#aaa',
		shadowOffset: {x:1, y:1},
		font: {fontSize: 15, fontWeight: 'bold'},
		color: '#000',
		right: 25,
		top: 30,
		height: 30,
		width: 100
	});
	row.add(lblJamPrice);
	
	var imgJamImage = Ti.UI.createImageView({
		image: '' + rowJam.fieldByName('imageurl') + '',
		width: 50,
		height: 50,
		left: 10,
		top: 5
	});
	row.add(imgJamImage);
	
	jamData.push(row);
	
	rowJam.next();
};

var tblJam = Ti.UI.createTableView({
	height: 375,
	width: 320,
	top: 55,
	left: 0,
});

tblJam.data = jamData;

tblJam.addEventListener('click', function(e){
	if(e.rowData.path)
	{
		var winProduct = Ti.UI.createWindow({
			url: e.rowData.path,
			title: e.rowData.prodName,
			backgroundImage: 'Images/background.png',
			backgroundColor: 'white',
			navBarHidden: true
		});
		var prod = e.rowData.prodName;
		winProduct.prod = prod;
		var type = e.rowData.type;
		winProduct.type = type;
		var price = e.rowData.prodPrice;
		winProduct.price = price;
		winProduct.open();
	}
});

winJam.add(tblJam);

var btnReturnOnJam = Ti.UI.createButton({
	width: 100,
	height: 45,
	top: 12,
	left: 5,
	backgroundImage: 'Images/Return.png'
});

btnReturnOnJam.addEventListener('click', function(e){
	var dialog = Ti.UI.createAlertDialog({
		cancel: 1,
		buttonNames: ['確定', '取消'],
		message: '返回上一頁，將清空購物車，請問是否繼續 ?',
		title: '注意!'
	});
	
	dialog.addEventListener('click', function(e){
		if(e.index == 0)
		{
			tabGroup.close();
			cleanOrderData();
		}
	});
	
	dialog.show();
});

winJam.add(btnReturnOnJam);

var btnCheckoutOnJam = Ti.UI.createButton({
	width: 150,
	height: 45,
	top: 12,
	right: 5,
	backgroundImage: 'Images/Checkout.png'
});

btnCheckoutOnJam.addEventListener('click', function(e){
	var winCheckout = Ti.UI.createWindow({
		url: 'checkout.js',
		title: '訂單確認',
		backgroundImage: 'Images/background.png',
		backgroundColor: 'white',
		navBarHidden: true
	});
	winCheckout.open();
});

winJam.add(btnCheckoutOnJam);

var tabJam = Ti.UI.createTab({
	height: 'auto',
	width: 'auto',
	icon: 'Images/JamIcon.png',
	title: 'Lips',
	window: winJam
});


// ----------------Dessert----------------

var winDessert = Ti.UI.createWindow({
	width: 320,
	height: 480,
	top: 0,
	left: 0,
	backgroundImage: 'Images/background.png',
	backgroundColor: 'white',
	navBarHidden: true
});

var dessertData = [];

var rowDessert = db.execute('SELECT name, price, imageurl FROM dessert');

while(rowDessert.isValidRow()){
	var row = Ti.UI.createTableViewRow({
		hasChild: true,
		className: 'dessert-row',
		path: 'products.js',
		prodName: ''+ rowDessert.fieldByName('name') + '',
		type: 'dessert',
		prodPrice: '' + rowDessert.fieldByName('price') + ''
	});
	
	var lblDessertName = Ti.UI.createLabel({
		text: rowDessert.fieldByName('name'),
		textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
		font: {fontSize: 16, fontWeight: 'bold'},
		color: '#ff1e78',
		left: 80,
		top: 10,
		height: 40,
		width: 210
	});
	row.add(lblDessertName);
	
	var lblDessertPrice = Ti.UI.createLabel({
		text: "$ " + rowDessert.fieldByName('price'),
		textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
		shadowColor: '#aaa',
		shadowOffset: {x:1, y:1},
		font: {fontSize: 15, fontWeight: 'bold'},
		color: '#000',
		right: 10,
		top: 30,
		height: 30,
		width: 100
	});
	row.add(lblDessertPrice);
	
	var imgDessertImage = Ti.UI.createImageView({
		image: '' + rowDessert.fieldByName('imageurl') + '',
		width: 50,
		height: 50,
		left: 10,
		top: 5
	});
	row.add(imgDessertImage);
	
	dessertData.push(row);
	
	rowDessert.next();
};

var tblDessert = Ti.UI.createTableView({
	height: 375,
	width: 320,
	top: 55,
	left: 0,
});

tblDessert.data = dessertData;

tblDessert.addEventListener('click', function(e){
	if(e.rowData.path)
	{
		var winProduct = Ti.UI.createWindow({
			url: e.rowData.path,
			title: e.rowData.prodName,
			backgroundImage: 'Images/background.png',
			backgroundColor: 'white',
			navBarHidden: true
		});
		var prod = e.rowData.prodName;
		winProduct.prod = prod;
		var type = e.rowData.type;
		winProduct.type = type;
		var price = e.rowData.prodPrice;
		winProduct.price = price;
		winProduct.open();
	}
});

winDessert.add(tblDessert);

var btnReturnOnDessert = Ti.UI.createButton({
	width: 100,
	height: 45,
	top: 12,
	left: 5,
	backgroundImage: 'Images/Return.png'
});

btnReturnOnDessert.addEventListener('click', function(e){
	var dialog = Ti.UI.createAlertDialog({
		cancel: 1,
		buttonNames: ['確定', '取消'],
		message: '返回上一頁，將清空購物車，請問是否繼續 ?',
		title: '注意!'
	});
	
	dialog.addEventListener('click', function(e){
		if(e.index == 0)
		{
			tabGroup.close();
			cleanOrderData();
		}
	});
	
	dialog.show();
});
winDessert.add(btnReturnOnDessert);

var btnCheckoutOnDessert = Ti.UI.createButton({
	width: 150,
	height: 45,
	top: 12,
	right: 5,
	backgroundImage: 'Images/Checkout.png'
});

btnCheckoutOnDessert.addEventListener('click', function(e){
	var winCheckout = Ti.UI.createWindow({
		url: 'checkout.js',
		title: '訂單確認',
		backgroundImage: 'Images/background.png',
		backgroundColor: 'white',
		navBarHidden: true
	});
	winCheckout.open();
});

winDessert.add(btnCheckoutOnDessert);

var tabDessert = Ti.UI.createTab({
	height: 'auto',
	width: 'auto',
	icon: 'Images/DessertIcon.png',
	title: 'Cheek',
	window: winDessert
});

// ----------------Preferential----------------

var winPreferential = Ti.UI.createWindow({
	width: 320,
	height: 480,
	top: 0,
	left: 0,
	backgroundImage: 'Images/background.png',
	backgroundColor: 'white',
	navBarHidden: true
});

var preferentialData = [];

var rowPreferential = db.execute('SELECT name, price, imageurl FROM preferential');

while(rowPreferential.isValidRow()){
	var row = Ti.UI.createTableViewRow({
		hasChild: false,
		className: 'preferential-row',
	});
	
	var lblPreferentialName = Ti.UI.createLabel({
		text: rowPreferential.fieldByName('name'),
		textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
		font: {fontSize: 20, fontWeight: 'bold'},
		color: '#ff1e78',
		left: 80,
		top: 0,
		height: 40,
		width: 210
	});
	row.add(lblPreferentialName);
	
	var lblPreferentialPrice = Ti.UI.createLabel({
		text: rowPreferential.fieldByName('price'),
		textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
		shadowColor: '#aaa',
		shadowOffset: {x:1, y:1},
		font: {fontSize: 18, fontWeight: 'bold'},
		color: '#000',
		right: 40,
		top: 30,
		height: 30,
		width: 100
	});
	row.add(lblPreferentialPrice);
	
	var imgPreferentialImage = Ti.UI.createImageView({
		image: '' + rowPreferential.fieldByName('imageurl') + '',
		width: 50,
		height: 50,
		left: 10,
		top: 5
	});
	row.add(imgPreferentialImage);
	
	preferentialData.push(row);
	
	rowPreferential.next();
};

var tblPreferential = Ti.UI.createTableView({
	height: 375,
	width: 320,
	top: 55,
	left: 0,
});

tblPreferential.data = preferentialData;

tblPreferential.addEventListener('click', function(e){
	var alertDialog = Ti.UI.createAlertDialog({
		message: '本程式會於結帳時，自動為您進行優惠計算，敬請放心!',
		ok: '知道了!',
		title: '謝謝您的點選!'
	}).show();
});

winPreferential.add(tblPreferential);

var btnReturnOnPreferential = Ti.UI.createButton({
	width: 100,
	height: 45,
	top: 12,
	left: 5,
	backgroundImage: 'Images/Return.png'
});

btnReturnOnPreferential.addEventListener('click', function(e){
	var dialog = Ti.UI.createAlertDialog({
		cancel: 1,
		buttonNames: ['確定', '取消'],
		message: '返回上一頁，將清空購物車，請問是否繼續 ?',
		title: '注意!'
	});
	
	dialog.addEventListener('click', function(e){
		if(e.index == 0)
		{
			tabGroup.close();
			cleanOrderData();
		}
	});
	
	dialog.show();
});

winPreferential.add(btnReturnOnPreferential);

var btnCheckoutOnPreferential = Ti.UI.createButton({
	width: 150,
	height: 45,
	top: 12,
	right: 5,
	backgroundImage: 'Images/Checkout.png'
});

btnCheckoutOnPreferential.addEventListener('click', function(e){
	var winCheckout = Ti.UI.createWindow({
		url: 'checkout.js',
		title: '訂單確認',
		backgroundImage: 'Images/background.png',
		backgroundColor: 'white',
		navBarHidden: true
	});
		
	winCheckout.open();
});

winPreferential.add(btnCheckoutOnPreferential);

var tabPreferential = Ti.UI.createTab({
	height: 'auto',
	width: 'auto',
	icon: 'Images/PreferentialIcon.png',
	title: 'Preferential',
	window: winPreferential
});

tabGroup.addTab(tabJam);
tabGroup.addTab(tabDessert);
tabGroup.addTab(tabPreferential);

function cleanOrderData(){
	var db = Ti.Database.install('SQLData/Order.sqlite', 'OrderData');
	var rowOrder = db.execute('SELECT id FROM orders');
	
	while(rowOrder.isValidRow()){
		var orderId = rowOrder.fieldByName('id');
		db.execute('DELETE FROM orders WHERE id=?', orderId);
		rowOrder.next();
	};
};
