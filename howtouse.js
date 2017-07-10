var currentWinHowToUse = Ti.UI.currentWindow;

var imgViewHowToUse = Ti.UI.createImageView({
	width: 320,
	height: 420,
	top: 0,
	left: 0,
	image: 'Images/HowToUse.png'
});

currentWinHowToUse.add(imgViewHowToUse);

var btnHowToUse = Ti.UI.createButton({
	width: 80,
	height: 48,
	top: 405,
	left: 120,
	backgroundImage: 'Images/BackButton.png'
});

btnHowToUse.addEventListener('click', function(e){
	currentWinHowToUse.close();
});

currentWinHowToUse.add(btnHowToUse);
