Titanium.UI.setBackgroundColor('#fff');

var winContactUs = Ti.UI.createWindow({
	width: 320,
	height: 480,
	top: 0,
	left: 0,
	navBarHidden: true,
	backgroundColor:'white',
});

winContactUs.addEventListener('android:back', function(e){
	winContactUs.close();
});

var logo = Ti.UI.createView({
	width:320,
	height: 48,
	top:0,
	left:0,
	backgroundImage: 'Images/3ce.jpg'
});

winContactUs.add(logo);

var imgViewContectUs = Ti.UI.createImageView({
	width: 135,
	height: 135,
	top: 70,
	left: 20,
	image: 'Images/HomePage.png'
});

winContactUs.add(imgViewContectUs);

imgViewContectUs.addEventListener('click', function(e){
	Ti.Platform.openURL('http://en.stylenanda.com/products/3-concept-eyes/AS000000/');
});

var imgViewEmail = Ti.UI.createImageView({
	width: 135,
	height: 135,
	top: 70,
	left: 165,
	image: 'Images/E-mail.png'
});

winContactUs.add(imgViewEmail);


function sentEmail(){
	var emailDialog = Ti.UI.createEmailDialog();
	emailDialog.subject = 'I need to order wonderful ...';
	emailDialog.toRecipients = ['E.taiwan@stylenanda.com'];
	emailDialog.messageBody = 'I need ...';
	emailDialog.open();
};

imgViewEmail.addEventListener('click', function(e){
	sentEmail();
});

var imgViewPhoneNumber = Ti.UI.createImageView({
	width: 135,
	height: 135,
	top: 215,
	left: 20,
	image: 'Images/Phome.png'
});

winContactUs.add(imgViewPhoneNumber);

imgViewPhoneNumber.addEventListener('click', function(e){
	Ti.Platform.openURL('tel:+886920223095');
});

var imgViewAdress = Ti.UI.createImageView({
	width: 135,
	height: 135,
	top: 215,
	right: 20,
	image: 'Images/adress.png'
});

winContactUs.add(imgViewAdress);

imgViewAdress.addEventListener('click', function(e){
	Ti.Platform.openURL('Maps://www.google.com.tw/maps/place/%E9%9F%93%E5%9B%BD%E4%BB%81%E5%B7%9D/@37.46455,126.67435,11z/data=!3m1!4b1!4m2!3m1!1s0x35796f2596138247:0x7d37fd902cb76142?hl=zh-TW');
});


var btnHome = Ti.UI.createButton({
	top: 390,
	left: 130,
	width: 60,
	height: 60,
	backgroundImage: 'Images/Home.png'
});

btnHome.addEventListener('click', function(e){
	winContactUs.close();
});

winContactUs.add(btnHome);
