Ti.include('commodity.js','origin.js','contactus.js');

var win1 = Ti.UI.currentWindow;

var logo = Ti.UI.createView({
	width:320,
	height: 48,
	top:0,
	left:0,
	backgroundImage: 'Images/3ce.jpg'
});

win1.add(logo);

var dm = Ti.UI.createScrollableView({
	width: 300,
	height: 180,
	top: 60,
	left: 10,
	views: [
		Ti.UI.createImageView({image: 'Images/DM_2.jpg'}),
		Ti.UI.createImageView({image: 'Images/DM_3.jpg'}),
		Ti.UI.createImageView({image: 'Images/DM_4.jpg'})],
	showPagingControl: false,
});

win1.add(dm);

var TextArrayDM = [];
TextArrayDM.push('Welcome to 3CONCEPT EYES');
TextArrayDM.push('韓國3CE(3CONCEPT EYES)超顯色唇膏');
TextArrayDM.push('STYLENANDA旗下的子牌 眾多偶像韓星推薦的品牌');

var TextDM = Ti.UI.createLabel({
	width: 280,
	height: 30,
	top: 240,
	left: 20,
	color: '#000',
	font: {fontSize: 11, fontFamily: 'Helvetica Neue', fontWeight: 'bold'},
	textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
	text: TextArrayDM[0]
});

win1.add(TextDM);

var dmPage = dm.getViews();
var page = 0;

setInterval(function(e){
	if(page >= dmPage.length){
		page = 0;
	}
	dm.scrollToView(page);
	TextDM.setText(TextArrayDM[page]);
	page++;
}, 3000);

var btnCommodity = Ti.UI.createButton({
	top: 280,
	left: 20,
	width: 80,
	height: 80,
	backgroundImage: 'Images/Commodity.png'
});

btnCommodity.addEventListener('click',function(e){
    tabGroup.setActiveTab(tabJam);
    tabGroup.open();
});

win1.add(btnCommodity);

var btnPreferential = Ti.UI.createButton({
	top: 280,
	left: 120,
	width: 80,
	height: 80,
	backgroundImage: 'Images/Preferential.png'
});

btnPreferential.addEventListener('click',function(e){
	
    tabGroup.setActiveTab(tabPreferential);
    tabGroup.open();
    
});

win1.add(btnPreferential);

var winNews= Ti.UI.createWindow({
	width:320,
	height:480,
	backgroundColor:'white'
	
});


var btnNews = Ti.UI.createButton({
	top: 280,
	left: 220,
	width: 80,
	height: 80,
	backgroundImage: 'Images/News.png'
});


var dmNews = Ti.UI.createScrollableView({
	width: 300,
	height: 180,
	top: 80,
	left: 10,
	views: [
		Ti.UI.createImageView({image: 'Images/DM_6.jpg'}),
		Ti.UI.createImageView({image: 'Images/DM_5.jpg'}),
		Ti.UI.createImageView({image: 'Images/DM_4.jpg'}),
		Ti.UI.createImageView({image: 'Images/DM_7.jpeg'}),
		Ti.UI.createImageView({image: 'Images/DM_8.jpeg'}),
		Ti.UI.createImageView({image: 'Images/DM_11.jpeg'})],
	showPagingControl: false,
});

winNews.add(dmNews);

var TextArrayDMNews = [];
TextArrayDMNews.push('Welcome to 3CONCEPT EYES');
TextArrayDMNews.push('韓國3CE(3CONCEPT EYES)超顯色唇膏');
TextArrayDMNews.push('STYLENANDA旗下的子牌 眾多偶像韓星推薦的品牌');

var TextDMNews = Ti.UI.createLabel({
	width: 280,
	height: 30,
	top: 260,
	left: 20,
	color: '#000',
	font: {fontSize: 11, fontFamily: 'Helvetica Neue', fontWeight: 'bold'},
	textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
	text: TextArrayDM[0]
});

winNews.add(TextDMNews);

var dmPageNews = dmNews.getViews();
var pageNews = 0;

setInterval(function(e){
	if(pageNews >= dmPageNews.length){
		pageNews = 0;
	}
	dmNews.scrollToView(pageNews);
	TextDMNews.setText(TextArrayDMNews[pageNews]);
	pageNews++;
}, 3000);




btnNews.addEventListener('click',function(e){
   winNews.open();
   var ViewNews = Ti.UI.createView({
  	top:'20%',left:'20%',width:'60%',height:'auto',
  	});
  	var viewNews1 = Ti.UI.createImageView({
	top:30,
	left:60,
	width:200,
	height:50,
	image:'Images/News1.png'
});
winNews.add(viewNews1);
var btnHome = Ti.UI.createButton({
	top: 390,
	left: 130,
	width: 60,
	height: 60,
	backgroundImage: 'Images/Home.png'
});
btnHome.addEventListener('click', function(e){
	winNews.close();
});
winNews.add(ViewNews);
winNews.add(btnHome);

});
win1.add(btnNews);

var btnLogin = Ti.UI.createButton({
	top: 370,
	left: 20,
	width: 80,
	height: 80,
	backgroundImage: 'Images/Login.png'
});

btnLogin.addEventListener('click',function(e){
    var win_1 = Ti.UI.createWindow({
		//url: 'login.js',
		title: '登入',
		//backgroundImage: 'Images/background.png',
		backgroundColor: 'white',
		navBarHidden: true
	});
	
	var btn1 = Ti.UI.createButton({});
var View1 = Ti.UI.createView({
  	top:'20%',left:'23%',width:'60%',height:'8%',
  	backgroundImage:'Images/Login1.png'
});
var labal_1 = Ti.UI.createLabel({
 height:'20%',
 top:'35%',left:'20%',
 color:'#000',
 text:'帳號：',
 font:{fontSize:13}
});
var textField_id = Ti.UI.createTextField({
	left:'31%',top:'42%',width:'50%',height:'6%',
	borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
  color: '#336699',
  
});
var labal_2 = Ti.UI.createLabel({
 height:'20%',
 top:'42%',left:'20%',
 color:'#000',
 text:'密碼：',
 font:{fontSize:13}
});
var textField_pw = Ti.UI.createTextField({
	left:'31%',top:'49%',width:'50%',height:'6%',
	borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
  color: '#336699',
  
});

var btn1 = Ti.UI.createButton({
	//left:232,top:303,width:40,
	left:'70%',top:'55%',width:'30%',height:'6%',
	backgroundColor:'#fff',
	title:'登入',});
	
	
	btn1.addEventListener('click',function(e){
	if(textField_id='Iem356')
	{ 
		if (textField_id='0000') 
		{
    win_1.close();
    btn1.title='登入成功';
	var alertyes = Ti.UI.createAlertDialog({
			message: '現在有優惠活動，請點優惠，謝謝您！',
			ok: '好的!',
			title: '親愛的會員您好！'
			}).show();
			 yesorno=0;
		};
	};
	});
	
	var btn2 = Ti.UI.createButton({
	left:'5%',top:'55%',width:'45%',height:'6%',
	backgroundColor:'#fff',
	title:'尚未成為會員',
	});
	
	btn2.addEventListener('click',function(e){
    win_1.close();
    var yesorno = 1;
    var alertnot = Ti.UI.createAlertDialog({
			message: '您尚未成為會員！還沒有辦法參加優惠活動哦！',
			ok: '好的!',
			title: 'sorry!'
		}).show();
});
win_1.add(btn1);
win_1.add(btn2);
win_1.add(labal_2);
win_1.add(textField_id);
win_1.add(textField_pw);
win_1.add(labal_1);
win_1.add(View1);
win_1.open();
win1.add(win_1);
});
win1.add(btnLogin);

var btnOrigin = Ti.UI.createButton({
	top: 370,
	left: 120,
	width: 80,
	height: 80,
	backgroundImage: 'Images/Origin.png'
});

btnOrigin.addEventListener('click',function(e){
    winOrigin.open();
});

win1.add(btnOrigin);


var btnContactUs = Ti.UI.createButton({
	top: 370,
	left: 220,
	width: 80,
	height: 80,
	backgroundImage: 'Images/ContactUs.png'
});

btnContactUs.addEventListener('click',function(e){
	winContactUs.open();
});

win1.add(btnContactUs);

var logo_2 = Ti.UI.createImageView({
	width: 30,
	height: 30,
	top: 450,
	left: 145,
	image: 'Images/3CE_logo1.jpg'
});

win1.add(logo_2);

win1.open();

function cleanOrderData(){
	var db = Ti.Database.install('SQLData/Order.sqlite', 'OrderData');
	var rowOrder = db.execute('SELECT id FROM orders');
	
	while(rowOrder.isValidRow()){
		var orderId = rowOrder.fieldByName('id');
		db.execute('DELETE FROM orders WHERE id=?', orderId);
		rowOrder.next();
	};
};
