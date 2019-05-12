
var Game = function(){

	this.aParticles = [];

	Game.prototype.init = function()
	{


		var oParticle = new Particles();
		this.aParticles.push( oParticle );
	
	}


	Game.prototype.pop = function(){

		var addP = this.addParticle.bind( this );

		setTimeout(function(){

			addP()

		}, ( 1000 - guiControls.popFreq ) / 10 );

	}

	Game.prototype.addParticle = function(){
		
		this.aParticles.push( new Particles() );

		this.pop();

		
	}

	Game.prototype.removeParticle = function( _i ){

		this.aParticles.splice( _i, 1 );

	}


	Game.prototype.rec_rec_collision = function( r1, r2)
	{

		if ( r1.x < r2.x + r2.w && r1.x + r1.w > r2.x && r1.y < r2.y + r2.h && r1.h + r1.y > r2.y ) 
		   	return true;
		else 
			return false; 

	}

	Game.prototype.circle_circle_collision = function( dot1, dot2 ){

		var dx = dot1.x - dot2.x;
		var dy = dot1.y - dot2.y;
		var distance = Math.sqrt(dx * dx + dy * dy);

		if ( distance < dot1.r + dot2.r)
			return true;
		else
			return false;

	}


	Game.prototype.getDist = function( dot1, dot2 )
	{

		var dx = dot1.x - dot2.x;
		var dy = dot1.y - dot2.y;
		var distance = Math.sqrt(dx * dx + dy * dy);

		return distance;

	}



	Game.prototype.jump = function()
	{	
		
		for (var i = this.aParticles.length - 1; i >= 0; i--) {
		
			this.aParticles[i].vy -= rand( guiControls.jumpForce * .3, guiControls.jumpForce );
			this.aParticles[i].vx += rand( -2, 2 );			

		};
		

	};

	Game.prototype.update = function()
	{	
		
		for (var i = this.aParticles.length - 1; i >= 0; i--) {
		
			this.aParticles[i].update( i );

		};
		

	};


	Game.prototype.draw = function( ctx ) 
	{

		for (var i = 0; i <= this.aParticles.length - 1; i++) {
			
			this.aParticles[i].draw( ctx );
			
		};

	};

	this.init();


}



var Particles = function(){

	this.w 			= rand( 0, guiControls.width );

	if( !guiControls.mousePop ){

		this.x 			= rand( 0, oSize.w );
		this.y 			= rand( 0, oSize.h );

	}else {

		this.x 			= oMouse.x;
		this.y 			= oMouse.y;

	}

	this.lx 	 	= this.x;
	this.ly 	 	= this.y;

	
	if( oMouse.vx > -2 && oMouse.vx < 2 )
		this.vx 		= rand( -5, 5 );
	else
		this.vx 		= oMouse.vx * guiControls.mouseVelocity;
	
	if( oMouse.vy > -2 && oMouse.vy < 2 )
		this.vy 		= rand( -15, -10 );
	else
		this.vy 		= oMouse.vy * guiControls.mouseVelocity;
	
	this.life 		= rand( ( guiControls.life - 5 ), ( guiControls.life + 5 ) );

	this.bounceY 	= rand( guiControls.bounceY - 0.2, guiControls.bounceY + 0.2 );
	this.bounceX 	= rand( 0.8, 0.99 );

	this.a 			= 0;
	this.ta 		= 1;
	this.gravity 	= guiControls.gravity;

	this.c 			= iParticlesColor;
	
	
	
	


	Particles.prototype.update = function( i )
	{

		this.lx 	 	= this.x;
		this.ly 	 	= this.y;

		if( this.a < this.ta && this.life > 0 )
			this.a += 0.06;

		this.vy += this.gravity;
		
		if( this.vy > 50 )
			this.vy = 50;
		
		this.x += this.vx;
		this.y += this.vy;

		if( this.y > oSize.h - ( this.w / 2 ) ){

			this.vy *= -this.bounceY;
			this.vx *=  this.bounceX;
			this.y = oSize.h - ( this.w / 2 );

		}

		if( this.x <= ( this.w / 2 ) ){

			this.x = ( this.w / 2 );
			this.vy *= this.bounceY;
			this.vx *= -this.bounceX;

		}


		if( this.x >= oSize.w - ( this.w / 2 ) ){

			this.x = oSize.w - ( this.w / 2 );
			this.vy *= this.bounceY;
			this.vx *= -this.bounceX;

		}


		this.updateLife( i );


	}

	Particles.prototype.updateLife = function( _i ){

		if( this.life <= 0 )
			this.a -= 0.05;
		else
			this.life -= 0.05;

		if( this.life <= 0 && this.a <= 0 )
			oGame.removeParticle( _i );

	}

	Particles.prototype.draw = function( ctx )
	{

		ctx.beginPath();
		
		if( this.lx == this.x || this.ly == this.y )
			ctx.moveTo( this.lx - .1 , this.ly - .1);
		else
			ctx.moveTo( this.lx, this.ly);
		
		ctx.lineTo( this.x, this.y);
		ctx.strokeStyle = "hsla( " + this.c + ", 100%, 50%, " + this.a + " )";
		ctx.lineWidth = this.w;
		ctx.lineCap = 'round';
		ctx.stroke();

  		ctx.closePath();

	};


};











/** global vars **/
rand = function( min, max ){ return Math.random() * ( max - min) + min; };
update_mouse = function( _e ){ 
	oMouse.ly = oMouse.y; 
	oMouse.lx = oMouse.x; 
	oMouse.y = _e.pageY; 
	oMouse.x = _e.pageX; 
	oMouse.vy =  oMouse.y - oMouse.ly;
	oMouse.vx =  oMouse.x - oMouse.lx;
	
	if( oMouse.vx < -20 )
		oMouse.vx = -20;
	if( oMouse.vx > 20 )
		oMouse.vx = 20;
	
};
onresize = function () { oSize.w = canvas.width = window.innerWidth; oSize.h = canvas.height = window.innerHeight; };
merge = function(o1,o2){var o3 = {};for (var attr in o1) { o3[attr] = o1[attr]; }for (var attr in o2) { o3[attr] = o2[attr]; }return o3;};



var oSize 		= {
	h : window.innerHeight,
	w : window.innerWidth
};
var oMouse 		= {
	x : oSize.w / 2,
	y : oSize.h / 2,
	lx : oSize.h / 2,
	ly : oSize.w / 2,
	vx : 0,
	vy : 0
};

var canvas 		= document.getElementById('gravity');
var ctx	 		= canvas.getContext('2d');
var iParticlesColor = 180;
canvas.height 	= oSize.h;
canvas.width 	= oSize.w;





document.addEventListener('mousemove', update_mouse, false);
document.addEventListener('onresize', onresize, false);
window.onresize(); 





/** DAT GUI **/
var guiControls = new function(){

	this.popFreq 					= 1000;
	this.width 						= 4;
	this.gravity 					= 1;
	this.life 						= 5;
	this.bounceY 					= 0.6;
	this.mousePop 					= true;
	this.mouseVelocity 				= 2;
	this.jumpForce 					= 30;	

}
var datGUI = new dat.GUI();
datGUI.close();
//j'ajoute a mon ui les variable
datGUI.add( guiControls, 'popFreq', 0, 1000 );
datGUI.add( guiControls, 'width', 1, 100 );
datGUI.add( guiControls, 'gravity', 0.1, 3 );
datGUI.add( guiControls, 'life', 1, 40 );
datGUI.add( guiControls, 'bounceY', 0.5, 2 );
datGUI.add( guiControls, 'mousePop');
datGUI.add( guiControls, 'mouseVelocity', 0.2, 3);
datGUI.add( guiControls, 'jumpForce', 10, 100);




var oGame = new Game();

var jump = oGame.jump.bind( oGame );
document.getElementById('gravity').addEventListener('click', jump, false);

/** ANIMATION **/
function render(){
		document.getElementById('info').style.color = "hsla( " + iParticlesColor + ", 100%, 50%, 1 )";
	
	ctx.clearRect( 0, 0, oSize.w, oSize.h );
	
	

	if( iParticlesColor >= 360 )
		iParticlesColor = 0;
	else
		iParticlesColor += 0.3;
	
	
	oGame.update();

	oGame.draw( ctx );

	requestAnimationFrame( render );

}
render();

oGame.pop();