var currentWinCustomerInfo = Ti.UI.currentWindow;

currentWinCustomerInfo.addEventListener('android:back', function(e){
	var alertDialog = Ti.UI.createAlertDialog({
		message: '請點選返回鍵回到上一頁，謝謝您! ',
		ok: '好的!',
		title: '不好意思!'
	}).show();
});

var totalNumber = Ti.UI.currentWindow.totalNumber;
var totalPrice = Ti.UI.currentWindow.totalPrice;

var btnFlexSpace = Ti.UI.createButton({
	systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});

var db = Ti.Database.install('SQLData/Address.sqlite', 'AddressData');

var imgCustomerInfoTitle = Ti.UI.createView({
	width: 320,
	height: 50,
	top: 0,
	left: 0,
	backgroundImage: 'Images/CustomerInfoTiTle.png'
});
currentWinCustomerInfo.add(imgCustomerInfoTitle);

var lblMemo_1 = Ti.UI.createLabel({
	text: "總計",
	textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
	font: {fontSize: 18, fontWeight: 'bold'},
	color: '#000',
	left: 20,
	top: 55,
	height: 30,
	width: 50
});
currentWinCustomerInfo.add(lblMemo_1);

if(totalPrice<2000){
	var lblFreight = Ti.UI.createLabel({
		text: '(已含運費：$ 150)',
		textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
		font: {fontSize: 15, fontWeight: 'bold'},
		color: 'red',
		left: 70,
		top: 80,
		height: 30,
		width: 230
	});
	currentWinCustomerInfo.add(lblFreight);
	totalPrice = totalPrice + 150;
}
else{
	var lblFreight = Ti.UI.createLabel({
		text: '(消費滿$ 2000，免運費)',
		textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
		font: {fontSize: 15, fontWeight: 'bold'},
		color: '#810202',
		left: 70,
		top: 80,
		height: 30,
		width: 230
	});
	currentWinCustomerInfo.add(lblFreight);
}

var lblMemo_2 = Ti.UI.createLabel({
	text: "數量：" + totalNumber + "     金額：" + totalPrice,
	textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
	font: {fontSize: 18, fontWeight: 'bold'},
	color: '#810202',
	left: 70,
	top: 55,
	height: 30,
	width: 230
});
currentWinCustomerInfo.add(lblMemo_2);

var lblCustomerName = Ti.UI.createLabel({
	text: "姓名：",
	textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
	font: {fontSize: 22, fontWeight: 'bold'},
	color: '#080151',
	shadowColor: '#aaa',
	shadowOffset: {x:1, y:1},
	left: 20,
	top: 115,
	height: 40,
	width: 80
});
currentWinCustomerInfo.add(lblCustomerName);

var txtfName = Ti.UI.createTextField({
	left: 100,
	top: 115,
	height: 40,
	font:{fontSize: 22},
	width: 200,
	keyboardType: Titanium.UI.KEYBOARD_DEFAULT,
	returnKeyType: Ti.UI.RETURNKEY_DONE,
	keyboardToolbar: [btnFlexSpace],
	color: '#000000',
	backgroundImage: 'Images/CustomerInfoTextField.png'
});
currentWinCustomerInfo.add(txtfName);

var lblCustomerTel = Ti.UI.createLabel({
	text: "電話：",
	textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
	font: {fontSize: 22, fontWeight: 'bold'},
	color: '#080151',
	shadowColor: '#aaa',
	shadowOffset: {x:2, y:2},
	left: 20,
	top: 160,
	height: 40,
	width: 80
});
currentWinCustomerInfo.add(lblCustomerTel);

var btnDoneTel = Ti.UI.createButton({
	title: 'Done',
	width: 100,
	style: Ti.UI.iPhone.SystemButtonStyle.DONE
});
btnDoneTel.addEventListener('click', function(e){
	txtfTel.blur();
});
var txtfTel = Ti.UI.createTextField({
	left: 100,
	top: 160,
	height: 40,
	font:{fontSize: 22},
	width: 200,
	keyboardType: Titanium.UI.KEYBOARD_NUMBER_PAD,
	keyboardToolbar: [btnFlexSpace, btnDoneTel],
	color: '#000000',
	backgroundImage: 'Images/CustomerInfoTextField.png'
});
currentWinCustomerInfo.add(txtfTel);

var lblCustomerAddress = Ti.UI.createLabel({
	text: "地址：",
	textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
	font: {fontSize: 22, fontWeight: 'bold'},
	color: '#080151',
	shadowColor: '#aaa',
	shadowOffset: {x:2, y:2},
	left: 20,
	top: 210,
	height: 40,
	width: 80
});
currentWinCustomerInfo.add(lblCustomerAddress);

var rowData = db.execute('SELECT name FROM city');
var cityData = [];

while(rowData.isValidRow()){
	var city = rowData.fieldByName('name');
	var pickerRow = Ti.UI.createPickerRow({title: city});
	cityData.push(pickerRow);
	rowData.next();
};

var tr = Ti.UI.create2DMatrix();
tr = tr.rotate(90);

var btnDrop = Ti.UI.createButton({
	style: Ti.UI.iPhone.SystemButton.DISCLOSURE,
	transform: tr
});

var txtFieldCity = Ti.UI.createTextField({
	hintText: "請輸入或選擇縣市",
	top:210,
	left:100,
	height:40,
	width:200,
	borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	returnKeyType: Ti.UI.RETURNKEY_DONE,
	rightButton: btnDrop,
	rightButtonMode: Ti.UI.INPUT_BUTTONMODE_ALWAYS
});
currentWinCustomerInfo.add(txtFieldCity);

var pickerView = Ti.UI.createView({
	height:251,
	bottom:-251
});

var btnCancelPicker = Ti.UI.createButton({
	title: 'Cancel',
	style: Ti.UI.iPhone.SystemButtonStyle.BORDERED
});
var btnDonePicker = Ti.UI.createButton({
	title:'Done',
	style: Ti.UI.iPhone.SystemButtonStyle.DONE
});
var tlbPicker = Ti.UI.iOS.createToolbar({
	top: 0,
	items: [btnCancelPicker, btnFlexSpace, btnDonePicker]
});

var pickerCity = Ti.UI.createPicker({
	top: 43
});
pickerCity.selectionIndicator = true;

pickerCity.add(cityData);
pickerView.add(tlbPicker);
pickerView.add(pickerCity);
currentWinCustomerInfo.add(pickerView);

var slideIn = Ti.UI.createAnimation({bottom:0});
var slideOut = Ti.UI.createAnimation({bottom: -251});

txtFieldCity.addEventListener('focus', function(){
	pickerView.animate(slideOut);
	showFunction();
});
btnDrop.addEventListener('click', function(){
	pickerView.animate(slideIn);
	hideFunction();
});
btnCancelPicker.addEventListener('click', function(){
	pickerView.animate(slideOut);
	showFunction();
});
btnDonePicker.addEventListener('click', function(){
	txtFieldCity.value = pickerCity.getSelectedRow(0).title;
	pickerView.animate(slideOut);
	showFunction();
});

function hideFunction (){
	txtfAddress_1.hide();
	txtfAddress_2.hide();
	lblPaymentChoice.hide();
	switchReceipt.hide();
	btnReturn.hide();
	btnSentoutOrders.hide();
};
function showFunction (){
	txtfAddress_1.show();
	txtfAddress_2.show();
	lblPaymentChoice.show();
	switchReceipt.show();
	btnReturn.show();
	btnSentoutOrders.show();
};

//var transformPicker = Ti.UI.create2DMatrix().scale(0.5);
//var pickerCity = Ti.UI.createPicker({
//   top: 210,
//    left:100,
//    heigth: 40,
//    width: 120,
//    transform:transformPicker
//});
//pickerCity.add(cityData);
//currentWinCustomerInfo.add(pickerCity);

var txtfAddress_1 = Ti.UI.createTextField({
	left: 100,
	top: 260,
	height: 40,
	font:{fontSize: 22},
	width: 200,
	keyboardType: Titanium.UI.KEYBOARD_DEFAULT,
	returnKeyType: Ti.UI.RETURNKEY_DONE,
	keyboardToolbar: [btnFlexSpace],
	color: '#000000',
	backgroundImage: 'Images/CustomerInfoTextField.png'
});
txtfAddress_1.addEventListener('focus', function(e){
	if(Ti.Platform.osname == 'iphone'){
		lblCustomerName.visible = false;
		txtfName.visible = false;
		lblCustomerTel.visible = false;
		txtfTel.visible = false;
		lblCustomerAddress.top = 115;
		txtfAddress_1.top = 115;
		txtfAddress_2.top = 160;
	}
});
txtfAddress_1.addEventListener('return', function(e){
	if(Ti.Platform.osname == 'iphone'){
		txtfName.blur();
		txtfTel.blur();
		lblCustomerAddress.top = 260;
		txtfAddress_1.top = 260;
		txtfAddress_2.top = 305;
		lblCustomerName.visible = true;
		txtfName.visible = true;
		lblCustomerTel.visible = true;
		txtfTel.visible = true;
	}
});
currentWinCustomerInfo.add(txtfAddress_1);

var txtfAddress_2 = Ti.UI.createTextField({
	left: 100,
	top: 305,
	height: 40,
	font:{fontSize: 22},
	width: 200,
	keyboardType: Titanium.UI.KEYBOARD_DEFAULT,
	returnKeyType: Ti.UI.RETURNKEY_DONE,
	keyboardToolbar: [btnFlexSpace],
	color: '#000000',
	backgroundImage: 'Images/CustomerInfoTextField.png'
});
txtfAddress_2.addEventListener('focus', function(e){
	if(Ti.Platform.osname == 'iphone'){
		lblCustomerName.visible = false;
		txtfName.visible = false;
		lblCustomerTel.visible = false;
		txtfTel.visible = false;
		lblCustomerAddress.top = 115;
		txtfAddress_1.top = 115;
		txtfAddress_2.top = 160;
	}
});
txtfAddress_2.addEventListener('return', function(e){
	if(Ti.Platform.osname == 'iphone'){
		txtfName.blur();
		txtfTel.blur();
		lblCustomerAddress.top = 260;
		txtfAddress_1.top = 260;
		txtfAddress_2.top = 305;
		lblCustomerName.visible = true;
		txtfName.visible = true;
		lblCustomerTel.visible = true;
		txtfTel.visible = true;
	}
});
currentWinCustomerInfo.add(txtfAddress_2);

var lblPaymentChoice = Ti.UI.createLabel({
	text: "是否需要統編",
	textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
	font: {fontSize: 22, fontWeight: 'bold'},
	color: '#080151',
	shadowColor: '#aaa',
	shadowOffset: {x:2, y:2},
	left: 20,
	top: 355,
	height: 40,
	width: 200
});
currentWinCustomerInfo.add(lblPaymentChoice);

var switchReceipt = Ti.UI.createSwitch({
	left: 225,
	top: 355,
	height: 45,
	width: 75,
	titleOff: 'No',
	titleOn: 'Yes',
	value: false
});
currentWinCustomerInfo.add(switchReceipt);

var btnReturn = Ti.UI.createButton({
	width: 100,
	height: 45,
	top: 405,
	left: 5,
	backgroundImage: 'Images/Return.png'
});
btnReturn.addEventListener('click', function(e){
	currentWinCustomerInfo.close();
});
currentWinCustomerInfo.add(btnReturn);

var btnSentoutOrders = Ti.UI.createButton({
	width: 150,
	height: 45,
	top: 405,
	left: 165,
	backgroundImage: 'Images/Sentout.png'
});
btnSentoutOrders.addEventListener('click', function(e){
	var dialog = Ti.UI.createAlertDialog({
		cancel: 1,
		buttonNames: ['確定', '取消'],
		message: '請再次確認是否送出訂單 ?',
		title: '注意!'
	});
	dialog.addEventListener('click', function(e){
		if(e.index == 0){
			if(txtfName.value == ""){
				var alertDialog = Ti.UI.createAlertDialog({
					message: '姓名欄不能為空白!',
					ok: '知道了!',
					title: '注意!'
				}).show();
			}
			else if(txtfTel.value == ""){
				var alertDialog = Ti.UI.createAlertDialog({
					message: '電話欄不能為空白!',
					ok: '知道了!',
					title: '注意!'
				}).show();
			}
			else if(txtfAddress_1.value == ""){
				var alertDialog = Ti.UI.createAlertDialog({
					message: '地址欄不能為空白!',
					ok: '知道了!',
					title: '注意!'
				}).show();
			}
			else{
				var winSentoutOrders = Ti.UI.createWindow({
					url: 'sentout.js',
					title: '送出訂單',
					backgroundImage: 'Images/background.png',
					backgroundColor: 'white',
					navBarHidden: true,
					totalPrice: totalPrice
				});	
				winSentoutOrders.open();
			}
		};
	});
	dialog.show();
});
currentWinCustomerInfo.add(btnSentoutOrders);


