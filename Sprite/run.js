 var canvas = document.getElementById('canvas'),
	ctx = canvas.getContext('2d'),
	canvasWidth = canvas.width,
	canvasHeight = canvas.height,

	btn = document.getElementById('animateBtn'),
	spritesheet = new Image(),
	runnerCells = [
	  { left: 0,   top: 0, width: 47, height: 64 },
	  { left: 55,  top: 0, width: 44, height: 64 },
	  { left: 107, top: 0, width: 39, height: 64 },
	  { left: 150, top: 0, width: 46, height: 64 },
	  { left: 208, top: 0, width: 49, height: 64 },
	  { left: 265, top: 0, width: 46, height: 64 },
	  { left: 320, top: 0, width: 42, height: 64 },
	  { left: 380, top: 0, width: 35, height: 64 },
	  { left: 425, top: 0, width: 35, height: 64 },
	],
	sprite = new Sprite('runner', new SpriteSheetPainter(runnerCells)),
	interval,
	last = 0,
	pasued = false,
	pageInterval = 100;

function drawBack()
{
	var step = 10;
	for(; step < canvasHeight; step +=10)
	{
		ctx.save();
		ctx.beginPath();
		ctx.moveTo(0, step);
		ctx.lineTo(canvasWidth, step);

		ctx.strokeStyle = 'rgba(0, 0, 0, 0.4)';
		ctx.lineWidth = 0.2;
		ctx.stroke();
	}
}
function Pasue()
{
	btn.value = "Animate";
	pasued = true;
}
function StartAnimate()
{
	btn.value = 'pasue';
	pasued = false;

	time = +new Date();

	window.requestNextAnimationFrame(animate);
}
function animate(time)
{
	if(!pasued)
	{
		ctx.clearRect(0, 0,canvasWidth, canvasHeight);
		drawBack();
		ctx.drawImage(spritesheet, 0, 0);

		sprite.paint(ctx);
		// console.log('hell');
		console.log(time - last);

		if(time - last > pageInterval)
		{
			sprite.painter.advance();
			last = time;
		}
		window.requestNextAnimationFrame(animate);
	}
}
btn.onclick = function(e)
{
	if (btn.value === 'Animate')
	 {
	 	StartAnimate();
	 }
	 else
	 {
	 	Pasue();
	 }
}

//init
spritesheet.src = 'run.png';
spritesheet.onload = function(e)
{
	ctx.drawImage(spritesheet, 0, 0);
};
sprite.left = 200;
sprite.top = 100;