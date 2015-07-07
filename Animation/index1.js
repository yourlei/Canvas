var canvas = document.getElementById('canvas'),
	ctx = canvas.getContext('2d'),
	width = canvas.width,
	height = canvas.height,

	paused = true,

	//ball
	discs = [
		{
			x: 150,		//圆心坐标
			y: 250,
			lastX: 150,
			lastY: 250,
			speedx: -3.2,	//x、y轴上的移动速度
			speedy: 3.5,
			radius: 25,		//半径
			innerColor: 'rgba(255, 255, 0, 1)',
			middleColor: 'rgba(255, 255, 0, 0.7)',
			outerColor: 'rgba(255, 255, 0, 0.5)',
			strokeStyle: 'gray'
		},
		{
			x: 50,		//圆心坐标
			y: 150,
			lastX: 50,
			lastY: 150,
			speedx: 2.2,	//x、y轴上的移动速度
			speedy: 2.5,
			radius: 25,		//半径
			innerColor: 'rgba(100, 145, 230, 1)',
			middleColor: 'rgba(100, 145, 230, 0.7)',
			outerColor: 'rgba(100, 145, 230, 0.5)',
			strokeStyle: 'blue'
		},
		{
			x: 150,		//圆心坐标
			y: 75,
			lastX: 150,
			lastY: 75,
			speedx: 1.2,	//x、y轴上的移动速度
			speedy: 1.5,
			radius: 25,		//半径
			innerColor: 'rgba(255, 0, 0, 1)',
			middleColor: 'rgba(255, 0, 0, 0.7)',
			outerColor: 'rgba(255, 0, 0, 0.5)',
			strokeStyle: 'blue'
		}
	],
	count = discs.length,
	btn = document.getElementById('animateBtn'),
	lastTime = 0;

function drawGrid () {

	var  speed;

	ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
	ctx.lineWidth = 0.5;

	for (speed = 10; speed < height; speed += 10) 
	{
		ctx.beginPath();
		ctx.moveTo(0, speed);
		ctx.lineTo(width, speed);
		ctx.stroke();
	}

}
//更新circle的位置
function update()
{
	var disc = null;
	for (var i = 0; i < count; i++) {
		disc = discs[i];

		if (disc.x + disc.speedx + disc.radius > width
			|| disc.x + disc.speedx - disc.radius < 0) 
		{
			disc.speedx = -disc.speedx;
		}
		if (disc.y + disc.speedy + disc.radius > height
			|| disc.y + disc.speedy - disc.radius < 0) 
		{
			disc.speedy = -disc.speedy;
		}

		disc.x += disc.speedx;
		disc.y += disc.speedy;
	}
}
function drawCircle()
{
	var circle = null;

	for (var i = 0; i < count; i++) {
		 circle = discs[i];

		 gradient = ctx.createRadialGradient(circle.x, circle.y, 0, circle.x, circle.y, circle.radius);
		 gradient.addColorStop(0.3, circle.innerColor);
		 gradient.addColorStop(0.5, circle.middleColor);
		 gradient.addColorStop(1, circle.outerColor);

		 ctx.save();
		 ctx.beginPath();
		 ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI*2, false);
		 ctx.fillStyle = gradient;
		 ctx.strokeStyle = circle.strokeStyle;

		 ctx.fill();
		 ctx.stroke();

		 ctx.restore();
	}
}

function animate(time)
{
	if(!paused)
	{
		ctx.clearRect(0, 0, width, height);
		drawGrid();
		update();
		drawCircle();

		ctx.fillStyle = "cornflowerblue";
		ctx.fillText(calculateFps().toFixed() + 'fps', 20, 60);
		window.requestNextAnimationFrame(animate);	//递归调用animte()
	}
}
function calculateFps()
{
	var now = (+new Date),
		fps = 1000/(now - lastTime);

	lastTime = now;

	return fps;
}
btn.onclick = function(e)
{
	paused = paused ? false : true;

	if(paused)
	{
		btn.value = "animate";
	}
	else
	{
		window.requestNextAnimationFrame(animate);
		btn.value = "paused";
	}
}

ctx.font = "48px Arial";
// drawGrid();