var canvas = document.getElementById('canvas'),
	ctx = canvas.getContext('2d');

//paint Text
function DrawText()
{
	ctx.save();
	//wet Text shadow
	ctx.shadowColor = 'rgba(100, 100, 150, .8)';
	ctx.shadowOffsetX = 5;
	ctx.shadowOffsetY = 5;
	ctx.shadowBlur = 10;

	//set text fillStyle 
	ctx.fillStyle = 'cornflowerblue';
	ctx.fillText('HTML5', 20, 250);

	//set text strokeStyle 
	ctx.strokeStyle = 'yellow';
	ctx.strokeText('HTML5', 20, 250);

	ctx.restore();
}
function setClippingRegion(radius)
{
	ctx.beginPath();
	ctx.arc(canvas.width/2, canvas.height/2, radius, 0, Math.PI*2, false);

	ctx.clip();//设置剪辑区
}
function fillCanvas (color) 
{
	ctx.fillStyle = color;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}
function endAnimation(loop)
{
	clearInterval(loop);

	setTimeout(function(e){
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		DrawText();
	}, 1000);
}
//在剪辑区内操作
function drawAnimationFrame(radius)
{
	setClippingRegion(radius);
	fillCanvas('gray');
	DrawText();
}
function animate()
{
	var radius = canvas.width/2,
		loop;

	// fillCanvas('green');
	loop = setInterval(function(){

		fillCanvas('green');
		radius -= canvas.width/100;
		if (radius > 0) 
		{
			ctx.save();

			drawAnimationFrame(radius);

			ctx.restore();
		}
		else
		{
			
			endAnimation(loop);	//取消定时器
		}
		// console.log(radius);
	},16);
}

/*window.onload = function()
{
	 
	ctx.beginPath();
	ctx.arc(canvas.width/2-80, canvas.height/2, 80, 0, Math.PI*2, false);
	ctx.stroke();
	ctx.font = '80pt Arial';
	DrawText();

	canvas.onmousedown = function(e)
	{
		animate();
	};
	ctx.lineWidth = 1;
	ctx.font = '128pt Arial';
	DrawText();
};*/

canvas.onmousedown = function(e)
{
	animate();
};
ctx.lineWidth = 1;
ctx.font = '128pt Arial';
DrawText();