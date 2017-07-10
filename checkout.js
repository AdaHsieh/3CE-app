var currentWinCheckOut = Ti.UI.currentWindow;

currentWinCheckOut.addEventListener('android:back', function(e){
	var alertDialog = Ti.UI.createAlertDialog({
		message: '請點選返回鍵回到上一頁，謝謝您! ',
		ok: '好的!',
		title: '不好意思!'
	}).show();
});

var dbcheck = Ti.Database.install('SQLData/Order.sqlite', 'OrderData');

var imgCheckOutTitle = Ti.UI.createView({
	width: 200,
	height: 50,
	top: 0,
	left: 60,
	backgroundImage: 'Images/CheckOutTitle.png'
});
currentWinCheckOut.add(imgCheckOutTitle);

var lblTotalNumber = Ti.UI.createLabel({
	text: '0',
	textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
	shadowColor: '#aaa',
	shadowOffset: {x:1, y:1},
	font: {fontSize: 18, fontWeight: 'bold'},
	color: '#ff1e78',
	left: 130,
	top: 370,
	height: 30,
	width: 50
});

var lblTotalPrice　= Ti.UI.createLabel({
	text: '0',
	textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
	shadowColor: '#aaa',
	shadowOffset: {x:1, y:1},
	font: {fontSize: 18, fontWeight: 'bold'},
	color: '#ff1e78',
	left: 220,
	top: 370,
	height: 30,
	width: 50
});

var tblOrder = Ti.UI.createTableView({
	height: 320,
	width: 320,
	top: 50,
	left: 0,
});

var orderData = [];

var indexOrder = 0;

var totalNumber = 0;

var totalPrice = 0;

setTableViewData();

function setTableViewData(){

	var rowOrder = dbcheck.execute('SELECT name, price, quantity FROM orders');

	while(rowOrder.isValidRow()){	
	
		var row = Ti.UI.createTableViewRow({
			hasChild: false,
			className: 'order-row'
		});
		
		var productName = rowOrder.fieldByName('name');
		var lblProductName =  Ti.UI.createLabel({
			text: productName,
			textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
			font: {fontSize: 18, fontWeight: 'bold'},
			color: '#ff1e78',
			left: 10,
			top: 5,
			height: 40,
			width: 200
		});
		row.add(lblProductName);
	
		var productPrice = rowOrder.fieldByName('price');
		var lblProductPrice = Ti.UI.createLabel({
			text: "單價:  $ " + productPrice,
			textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
			shadowColor: '#aaa',
			shadowOffset: {x:1, y:1},
			font: {fontSize: 18, fontWeight: 'bold'},
			color: '#000',
			left: 210,
			top: 12,
			height: 30,
			width: 110
		});
		row.add(lblProductPrice);
	
		var productQuantity = rowOrder.fieldByName('quantity');
		var lblProductQuantity　= Ti.UI.createLabel({
			width: 120,
			height: 30,
			top: 45,
			left: 10,
			text: "訂購數量: " + Math.round(productQuantity),
			textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
			font: {fontSize: 18, fontWeight: 'bold'},
			color: '#333'
		});
		row.add(lblProductQuantity);
	
		var btnProduct = Ti.UI.createButton({
			width: 60,
			height: 30,
			top: 45,
			left: 140,
			productName: productName,
			backgroundImage: 'Images/DeleteOrder.png',
			index: indexOrder
		});
		btnProduct.addEventListener('click', function(e){
			orderData = [];
			indexOrder = 0;
			totalNumber = 0;
			totalPrice = 0;
			
			dbcheck.execute('DELETE FROM orders WHERE name=?', e.source.productName);
			tblOrder.deleteRow(e.source.index);
			setTableViewData();
		});
		row.add(btnProduct);
	
		var lblTempPrice　= Ti.UI.createLabel({
			text: "小計:  $ " + calTempCost(productPrice, productQuantity),
			textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
			shadowColor: '#aaa',
			shadowOffset: {x:1, y:1},
			font: {fontSize: 18, fontWeight: 'bold'},
			color: 'red',
			left: 210,
			top: 45,
			height: 30,
			width: 110
		});
		row.add(lblTempPrice);
	
		orderData.push(row);
	
		rowOrder.next();
	
		indexOrder = indexOrder + 1;
		
		totalNumber = totalNumber + parseInt(productQuantity);
		
		totalPrice = totalPrice + parseInt(calTempCost(productPrice, productQuantity));
	};
	
	tblOrder.setData(orderData);
	lblTotalNumber.text = totalNumber;
	lblTotalPrice.text = totalPrice;
};

currentWinCheckOut.add(tblOrder);
currentWinCheckOut.add(lblTotalNumber);
currentWinCheckOut.add(lblTotalPrice);

var lblTotal_1 = Ti.UI.createLabel({
	text: '總計',
	textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
	font: {fontSize: 20, fontWeight: 'bold'},
	color: '#000000',
	left: 20,
	top: 370,
	height: 30,
	width: 50
});
currentWinCheckOut.add(lblTotal_1);

var lblTotal_2 = Ti.UI.createLabel({
	text: '數量: ',
	textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
	font: {fontSize: 18, fontWeight: 'bold'},
	color: '#000000',
	left: 80,
	top: 370,
	height: 30,
	width: 50
});
currentWinCheckOut.add(lblTotal_2);

var lblTotal_3 = Ti.UI.createLabel({
	text: '金額: ',
	textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
	font: {fontSize: 18, fontWeight: 'bold'},
	color: '#000000',
	left: 170,
	top: 370,
	height: 30,
	width: 50
});
currentWinCheckOut.add(lblTotal_3);

var btnReturn = Ti.UI.createButton({
	width: 100,
	height: 45,
	top: 405,
	left: 5,
	backgroundImage: 'Images/Return.png'
});

btnReturn.addEventListener('click', function(e){
	currentWinCheckOut.close();
});

currentWinCheckOut.add(btnReturn);

var btnCustomerInfo = Ti.UI.createButton({
	width: 100,
	height: 45,
	top: 405,
	right:5,
	backgroundImage: 'Images/Next.png'
});

btnCustomerInfo.addEventListener('click', function(e){
	if(totalPrice == 0)
	{
		var alertDialog = Ti.UI.createAlertDialog({
			message: '您並未選購任何商品喔，麻煩請選擇返回上一頁，進行商品採購，謝謝您!',
			ok: '好的!',
			title: '不好意思!'
		}).show();
	}
	else
	{
		var winCustomer = Ti.UI.createWindow({
			url: 'customerinfo.js',
			title: '顧客資訊',
			backgroundImage: 'Images/background.png',
			backgroundColor: 'white',
			navBarHidden: true,
			totalNumber: lblTotalNumber.text,
			totalPrice: lblTotalPrice.text
		});
		winCustomer.open();
	}
});

currentWinCheckOut.add(btnCustomerInfo);


function calTempCost(price, quantity){
	var tempCost = 0;
	for(var i=1; i<=quantity; i++)
	{
		if(i%2 == 1)
		{
			tempCost = tempCost + price;
		}
		else
		{
			tempCost = tempCost + Math.round((price*0.8));
		}
	}
	
	return tempCost;
};