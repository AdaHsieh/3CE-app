Titanium.UI.setBackgroundColor('#fff');

var winOrigin = Ti.UI.createWindow({
	width: 320,
	height: 480,
	top: 0,
	left: 0,
	navBarHidden: true,
	backgroundImage: 'Images/background.png',
	backgroundColor:'white'
	
});

winOrigin.addEventListener('android:back', function(e){
	winOrigin.close();
});

var logo = Ti.UI.createView({
	width:320,
	height: 48,
	top:0,
	left:0,
	backgroundImage: 'Images/3ce.jpg'
});

winOrigin.add(logo);

var imgViewOrigin = Ti.UI.createImageView({
	width: 320,
	height: 360,
	top: 48,
	left: 0,
	image: 'Images/OriginContents.png'
});

winOrigin.add(imgViewOrigin);

var btnHome = Ti.UI.createButton({
	top: 390,
	left: 130,
	width: 60,
	height: 60,
	backgroundImage: 'Images/Home.png'
});

btnHome.addEventListener('click', function(e){
	winOrigin.close();
});

winOrigin.add(btnHome);

