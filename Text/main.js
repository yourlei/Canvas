/**
 *core canvas 3-1
 *
*/
var canvas = document.getElementById('canvas1'),
	context = canvas.getContext('2d'),
	fillCheckbox = document.getElementById('fillCheckbox'),
	strokeCheckbox = document.getElementById('strokeCheckbox'),
	shadowCheckbox = document.getElementById('shadowCheckbox'),
	text = 'HTML5';

function draw()
{
	context.clearRect(0,0,canvas.width,canvas.height);//擦除画布，重新绘制
	drawBackground(context);

	if (shadowCheckbox.checked) 
	{
		turnShadowon();//添加阴影效果
	}else
	{
		turnShadowoff(); //关闭阴影效果
	}

	drawText(); //绘制文本
}
function drawBackground(context)	//绘制画布的标尺
{
	var step_y = 12,	//水平标尺的间距
		top_margin = step_y*4,	
		left_margin = step_y*3,
		i = context.canvas.height;

	context.strokeStyle = 'lightgray'; //描边颜色
	context.lineWidth = 0.5;

	while(i > top_margin) //绘制canvas的Y轴48px一下位置
	{
		context.beginPath();
		context.moveTo(0,i);
		context.lineTo(context.canvas.width,i);
		context.stroke();
		i -= step_y;

	}

	// vertical line
	context.strokeStyle = 'rgba(100,0,0,0.3)';
	context.lineWidth = 1;
	context.beginPath();
	context.moveTo(left_margin,0);
	context.lineTo(left_margin,context.canvas.height);
	context.stroke();
}
function turnShadowon()
{
	context.shadowColor = 'rgba(0,0,0,0.8)';
	context.shadowOffsetX = 5;
	context.shadowOffsetY = 5;
	context.shadowBlur = 10;
}
function turnShadowoff()
{
	context.shadowColor = undefined;
	context.shadowOffetX = 0;
	context.shadowOffsetY = 0;
	context.shadowBlur = 0;
}

function drawText()
{
	var TextX = 65,	//基于文本的左下角位置
		TextY = context.canvas.height / 2 + 35;

	context.strokeStyle = 'blue';

	if (fillCheckbox.checked) 
	{
		context.fillText(text, TextX, TextY);
	}
	if (strokeCheckbox) 
	{
		context.fillText(text, TextX, TextY);
	}
}

//事件绑定
fillCheckbox.onchange = draw;
strokeCheckbox.onchange = draw;
shadowCheckbox.onchange = draw;

//initial
context.font = '128px Palatino';
context.lineheight = 1.0;
context.fillStyle = 'cornflowerblue';

turnShadowon();
draw();

/*******************canvas2 gradient color***********************/
var canvas2 = document.getElementById('canvas2'),
	context2 = canvas2.getContext('2d'),
	gradient = context2.createLinearGradient(canvas2.width,canvas2.height,0,0),//对角线方向
	gradient2 = context2.createLinearGradient(0, 0, canvas2.width,canvas2.height),//对角线方向

	text2 = 'Canvas';

//set gradient color
gradient.addColorStop(0,'blue');
gradient.addColorStop(0.25, 'blue');
gradient.addColorStop(0.5, 'white');
gradient.addColorStop(0.75, 'red');
gradient.addColorStop(1.0, 'yellow');

gradient2.addColorStop(0,'rgba(0,0,0,0.8)');
gradient2.addColorStop(0.25, 'rgba(255,255,255,.8)');
gradient2.addColorStop(0.5, 'red');
gradient2.addColorStop(0.75, 'blue');
gradient2.addColorStop(1.0, 'black');
// set canvas shadow
context2.shadowColor = 'rgba(0,0,0,0.8)';
context2.shadowOffetX = 5;
context2.shadowOffsetY = 5;
context2.shadowBlur = 10;
function drawGradient()
{
	context2.font = "128px Palatino";
	context2.fillStyle = gradient;
	context2.fillText(text2, 65, 155);
	context2.strokeText(text2, 65, 155);

	context2.fillStyle = gradient2;
	context2.font = "100px Palatino";
	context2.fillText("Hello world!",65, 255);
}
drawBackground(context2);
drawGradient();