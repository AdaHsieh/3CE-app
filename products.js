var currentWinProduct = Ti.UI.currentWindow;
var dbc = Ti.Database.install('SQLData/Commodity.sqlite','k');
var dbo = Ti.Database.install('SQLData/Order.sqlite', 'OrderData');

var prod = Ti.UI.currentWindow.prod;
var type = Ti.UI.currentWindow.type;
var price = Ti.UI.currentWindow.price;
var quantity = 1;

currentWinProduct.addEventListener('android:back', function(e){
	var alertDialog = Ti.UI.createAlertDialog({
		message: '請點選返回鍵回到上一頁，謝謝您! ',
		ok: '好的!',
		title: '不好意思!'
	}).show();
});

var TextDescription = Ti.UI.createLabel({
	width: 320,
	height: 30,
	top: 30,
	left: 0,
	color: '#ff0000',
	font: {fontSize: 18, fontFamily: 'Helvetica Neue', fontWeight: 'bold'},
	shadowColor: '#aaa',
	shadowOffset: {x:1, y:1},
	textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
	text: '' + prod + ''
});

currentWinProduct.add(TextDescription);

var imageurl = 'SELECT imageurl FROM ' + type + ' WHERE name = "' + prod + '"';

var imageData = dbc.execute(imageurl);

if(imageData.isValidRow()){	

	var imgProduct = Ti.UI.createImageView({
		width: 230,
		height: 230,
		top: 60,
		left: 45,
		image: '' + imageData.fieldByName('imageurl') + '',
		backgroundColor:'white'
	});
	
	currentWinProduct.add(imgProduct);
}

var description = 'SELECT description FROM ' + type + ' WHERE name = "' + prod + '"';

var descriptionData = dbc.execute(description);

if(descriptionData.isValidRow()){	
	
	var TextDescription = Ti.UI.createLabel({
		width: 260,
		height: 105,
		top: 280,
		left: 30,
		color: '#000',
		font: {fontSize: 13, fontFamily: 'Helvetica Neue', fontWeight: 'bold'},
		textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
		text: '' + descriptionData.fieldByName('description') + ''
	});
	currentWinProduct.add(TextDescription);
}

var TextNumber = Ti.UI.createLabel({
	width: 65,
	height: 40,
	top: 345,
	left: 30,
	color: 'black',
	font: {fontSize: 20, fontFamily: 'Helvetica Neue', fontWeight: 'bold'},
	textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
	text: '數量：'
});
currentWinProduct.add(TextNumber);

var sliderOrderNumber = Ti.UI.createSlider({
	min: 1,
	max: 20,
	value: quantity,
	width: 150,
	height: 40,
	top: 345,
	left: 100,
	thumbImage: 'Images/SliderThumb.png'
});
currentWinProduct.add(sliderOrderNumber);

var lblOrderNumber = Ti.UI.createLabel({
	width: 30,
	height: 40,
	top: 345,
	left: 260,
	color: 'black',
	font: {fontSize: 20, fontFamily: 'Helvetica Neue', fontWeight: 'bold'},
	textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
	text: quantity
});
currentWinProduct.add(lblOrderNumber);

sliderOrderNumber.addEventListener('change', function(e){
	lblOrderNumber.text = Math.round(e.value);
	quantity = Math.round(e.value);
});

var btnBack = Ti.UI.createButton({
	top: 390,
	left: 30,
	width: 80,
	height: 48,
	backgroundImage: 'Images/BackButton.png'
});

btnBack.addEventListener('click', function(e){
	currentWinProduct.close();
});

currentWinProduct.add(btnBack);

var btnCart = Ti.UI.createButton({
	top: 390,
	left: 120,
	width: 80,
	height: 48,
	backgroundImage: 'Images/CartButton.png'
});

btnCart.addEventListener('click', function(e){
	var examine = dbo.execute('SELECT * FROM orders WHERE name = "' + prod + '"');
	if(examine.isValidRow())
	{
		dbo.execute('UPDATE orders SET quantity=? WHERE name=?', parseInt(quantity) + parseInt(examine.fieldByName('quantity')), prod);
	}
	else
	{
		dbo.execute('INSERT INTO orders (name,price,quantity) VALUES (?,?,?)', prod, price, quantity);
	}
	
	
	var dialog = Ti.UI.createOptionDialog({
		options:['繼續購物', '結帳'],
		title: '已加入購物車',
	});
	
	dialog.addEventListener('click', function(e){
		if(e.index == 0)
		{
			currentWinProduct.close();
		}
		else
		{
			var winCheckout = Ti.UI.createWindow({
				url: 'checkout.js',
				title: '訂單確認',
				backgroundImage: 'Images/background.png',
				backgroundColor: 'white',
				navBarHidden: true
			});
		
			winCheckout.open();
		}
	});
	
	dialog.show();
});

currentWinProduct.add(btnCart);

var btnUse = Ti.UI.createButton({
	top: 390,
	left: 210,
	width: 80,
	height: 48,
	backgroundImage: 'Images/UseButton.png'
});

btnUse.addEventListener('click', function(e){
	var winHowToUse = Ti.UI.createWindow({
		url: 'howtouse.js',
		backgroundImage: 'Images/background.png',
		backgroundColor: 'white',
		navBarHidden: true
	});
	winHowToUse.open();
});

currentWinProduct.add(btnUse);
