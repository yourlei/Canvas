var canvas = document.getElementById('canvas'),
	ctx = canvas.getContext('2d'),
	width = canvas.width,
	height = canvas.height,

	btn = document.getElementById('animateBtn'),
	paused = true,
	lastTime = 0,
	fps = 0,
	skyOffset = 0,
	speedX = 35.

	sky = new Image();
function  draw ()
{
	skyOffset = skyOffset < width ? skyOffset + speedX / fps : 0;

	ctx.save();

	ctx.translate(-skyOffset, 0);
	ctx.drawImage(sky, 0, 0);
	ctx.drawImage(sky, width - 1, 0);

	ctx.restore();
}

function calculatFps(now)
{
	var fps = 1000 / (now - lastTime);
	lastTime = now;

	return fps;
}
function animate(now)
{
	if(now === undefined)
	{
		now = +new Date;
	}
	fps = calculatFps(now);

	if (!paused)
	{
		ctx.clearRect(0, 0, width, height);
		draw();
	}

	window.requestNextAnimationFrame(animate);
}

btn.onclick = function(e)
{
	paused = paused ? false : true;
	if (paused) 
	{
		animateBtn.value = "Animate";
	}
	else
	{
		animateBtn.value = "paused";
	}
};

sky.src = "sky.png";
sky.onload = function(e)
{
	draw();
};

window.requestNextAnimationFrame(animate);