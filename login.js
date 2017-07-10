// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#fff');
var tabGroup = Titanium.UI.createTabGroup();
var win_1 = Ti.UI.createWindow({
	title:'登入'
});

var tab1 = Ti.UI.createTab({
	window:win_1,
	title:'登入',
	icon:'KS_nav_views.png'
});


//win_1
var btn1 = Ti.UI.createButton({});
var View1 = Ti.UI.createView({
  	top:'20%',left:'20%',width:'60%',height:'auto',
  	backgroundImage:'Images/Login1.png',
});
var labal_1 = Ti.UI.createLabel({
 height:'20%',
 top:'40%',left:'20%',
 color:'#000',
 text:'帳號：',
 font:{fontSize:13}
});
var textField_id = Ti.UI.createTextField({
	left:'31%',top:'47%',width:'50%',height:'6%',
	borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
  color: '#336699',
  
});
var labal_2 = Ti.UI.createLabel({
 height:'20%',
 top:'47%',left:'20%',
 color:'#000',
 text:'密碼：',
 font:{fontSize:13}
});
var textField_pw = Ti.UI.createTextField({
	left:'31%',top:'54%',width:'50%',height:'6%',
	borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
  color: '#336699',
  
});

var btn1 = Ti.UI.createButton({
	//left:232,top:303,width:40,
	left:'70%',top:'64%',width:'30%',height:'6%',
	backgroundColor:'#fff',
	title:'登入',
	
  
});
var btn2 = Ti.UI.createButton({
	left:'35%',top:'64%',width:'45%',height:'6%',
	backgroundColor:'#fff',
	title:'使用facebook登入',
	
  
});
win_1.add(btn1);
win_1.add(btn2);
win_1.add(labal_2);
win_1.add(textField_id);
win_1.add(textField_pw);
win_1.add(labal_1);
win_1.add(View1);


tabGroup.open();


