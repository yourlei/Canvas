var canvas = document.getElementById('canvas'),
	ctx = canvas.getContext('2d'),
	canvasWidth = canvas.width,
	canvasHeight = canvas.height,

	clockRadius = canvasHeight/2 - 50,
	hourHand = 35,

	//painter, paint circle
	ballPainter = {
		paint: function(sprite, ctx)
		{
				var x = sprite.left + sprite.width/2,
					y = sprite.top + sprite.height/2,
					width = sprite.width,
					height = sprite.height,
					radius = sprite.width/2;
				ctx.save();
				ctx.beginPath();
				ctx.arc(x, y, radius, 0, Math.PI*2, false);
				ctx.clip();	//why-------

				//set circle shadow
				ctx.shadowColor = 'rgb(0, 0, 0)';
				ctx.shadowOffsetX = -4;
				ctx.shadowOffsetY = -4;
				ctx.shadowBlur =8;

				ctx.fillStyle = 'orange';
				ctx.fill();

				ctx.lineWidth = 2;
				ctx.strokeStyle = 'rgb(100, 100, 195)';
				ctx.stroke();

				ctx.restore();
		}
	},

	ball = new Sprite('ball', ballPainter);//create a Sprite object

//paint grid
function drawGrid()
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
//paint hand of Clock
function drawHand(loc, isHour)
{
	var angle = Math.PI*2*(loc/60) - Math.PI/2, //what------
		hand = isHour ? clockRadius - 35 : clockRadius,

		lineEnd = {
			x: canvasWidth/2 + Math.cos(angle)* (hand-ball.width/2),
			y: canvasHeight/2 + Math.sin(angle)* (hand-ball.width/2)
		};

	ctx.beginPath();
	ctx.strokeStyle = 'orange';
	ctx.lineWidth = 1;
	ctx.moveTo(canvasWidth/2, canvasHeight/2);
	ctx.lineTo(lineEnd.x, lineEnd.y);

	ctx.stroke();

	ball.left = canvasWidth/2 + Math.cos(angle)*clockRadius - ball.width/2;
	ball.top = canvasHeight/2 + Math.sin(angle)*clockRadius - ball.height/2;

	ball.paint(ctx);
}
function drawHands()
{
	var date = new Date(),
		hour = date.getHours();

	ball.width = 20;
	ball.height = 20;
	drawHand(date.getSeconds(), false);

	hour = hour > 12 ? hour -12 :  hour;

	ball.width = 30;
	ball.height = 30;
	drawHand(date.getMinutes(), false);

	ball.width = 40;
	ball.height = 40;

	drawHand(hour*5 + (date.getMinutes()/60)*5);//??????

	ball.width =10;
	ball.height = 10;
	ball.left = canvasWidth/2 - ball.width/2;
	ball.top = canvasHeight/2 - ball.height/2;
	ballPainter.paint(ball, ctx);
}
function drawClockFace()
{
	ctx.beginPath();
	ctx.arc(canvasWidth/2, canvasHeight/2, clockRadius, 0, Math.PI*2, false);

	ctx.save();
	ctx.strokeStyle = 'rgb(0, 0, 0)';
	ctx.stroke();
	ctx.restore();
}
function drawClock()
{
	drawClockFace();
	drawHands();
}
function animate()
{
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	drawGrid();
	drawClock();

	window.requestNextAnimationFrame(animate);

}
//init

window.requestNextAnimationFrame(animate);
drawGrid();