var drawer =document.getElementById('up_drawer');
drawer.addEventListener('click',upDrawer);

var drawerApps = document.getElementById('drawer_app');
var settings = document.getElementById('settings_not');

var menuItems = document.getElementById('menu_Items');
var menuItemsDisplay=menuItems.style.display='none';

var	bottomBar = document.getElementById('bottom_pannel');

var wallpaper = document.getElementById('wallpaper');

var all_apps = document.getElementById('all_apps');

var bottomMenu = document.getElementById('bottomMenu').addEventListener('click',upDrawer);

var time = document.getElementById('time');

 var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  // add a zero in front of numbers<10 
  time.innerHTML = h + ":" + m;


var notification_panel = document.getElementById('notification_panel');
	notification_panel.addEventListener('click',notPannel);
	
var notification_items = document.getElementById('notification_items');
var wallpaper = document.getElementById('wallpaper');
     wallpaper.addEventListener('click',back);

function notPannel(e){
	if(menuItems.style.display='display'){


	menuItems.style.display='none';
	drawer.style.display='block';
	wallpaper.style.opacity='1';
	all_apps.innerText='';
	all_apps.style.color='white';
	all_apps.style.fontWeight='normal';
	notification_items.style.display='block';
	bottomBar.style.marginTop='223px';
	drawerApps.style.display='block';
	drawerApps.style.marginTop='10.87%';
	settings.style.display='block';
	}
	else{

	notification_items.style.display='block';
	bottomBar.style.marginTop='223px';
	settings.style.display='block';
	drawerApps.style.marginTop='10.87%';

	}
}

function back(e) {
	
		notification_items.style.display='none';
		bottomBar.style.marginTop=' 432px';
		drawerApps.style.marginTop='26.2%';
		settings.style.display='none';	
}


function upDrawer(e){

	if (notification_items.style.display=='none') {
	menuItems.style.display='block';
	bottomBar.style.marginTop='30px';
	drawer.style.display='none';
	wallpaper.style.opacity='0.5';
	all_apps.innerText='All Apps';
	all_apps.style.color='white';
	all_apps.style.fontWeight='bold';
	drawerApps.style.display='none';
 	settings.style.display='none';
 		}
else
	notification_items.style.display='none';
	menuItems.style.display='block';
	bottomBar.style.marginTop='30px';
	drawer.style.display='none';
	wallpaper.style.opacity='0.5';
	all_apps.innerText='All Apps';
	all_apps.style.color='white';
	all_apps.style.fontWeight='bold';
	drawerApps.style.display='none';
	settings.style.display='none';
}




var backBut =document.getElementById('backBut');
	backBut.addEventListener('click',backButFn);

function backButFn(e){
	
	menuItems.style.display='none';
	bottomBar.style.marginTop='432px';
	drawer.style.display='block';
	wallpaper.style.opacity='1';
	all_apps.innerText='';
	all_apps.style.color='white';
	all_apps.style.fontWeight='normal';
	notification_items.style.display='none';	
	drawerApps.style.display='block';
	drawerApps.style.marginTop='26.2%';

}