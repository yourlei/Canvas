var canvas = document.getElementById('canvas'),
	ctx = canvas.getContext('2d'),
	Width = canvas.width,
	Height =  canvas.height,

	//设置中心圆点样式
	CenterIdR = 10,	//圆心点半径
	CenterStrokeStyle = 'rgba(0, 0, 0, .5)',
	CenterFillStyle = 'rgba(80, 190,240, .6)',

	RingInnerR = 35,
	RingOuterR = 55,

	//表盘上文字样式
	AnnotationFillStyle = 'rgba(0, 0, 230, .9)',
	AnnotationTextSize = 12,

	TickWidth = 10, //表盘上刻度粗细
	TickLongStrokeStyle = 'rgba(100, 140, 230, .9)',
	TickShortStrokeStyle = 'rgba(100, 140, 230, .7)',

	TrackingDialStrokeStyle = 'rgba(100, 140, 230, .7)',

	GuidewireStrokeStyle = 'goldenrod',
	GuidewrireFillStyle = 'rgba(250, 250, 0, .6)',

	//设置圆属性
	circle = {
		x: canvas.width/2,
		y: canvas.height/2,
		radius: 150
	};

//绘制网格
function drawGrid(color,stepx,stepy)
{
	ctx.strokeStyle = color;
	ctx.lineWidth = 0.5;
	//绘制垂直方向上的线
	for (var i = stepx+0.5; i < Width; i+=stepx) {
		ctx.beginPath();
		ctx.moveTo(i, 0);
		ctx.lineTo(i, Height);	
		ctx.stroke();
	}
	//绘制水平方向上的线
	for (var i = stepy+0.5; i < Height; i+=stepy) {
		 ctx.moveTo(0,i);
		 ctx.lineTo(Width, i);
		 ctx.stroke();
	}
}
function drawDial()
{
	var loc = {
		x: circle.x,
		y: circle.y
	};

	drawCentorid();
	drawCentroidGuidewire(loc);
	drawRing();
	drawInnerCircle();
	drawTicks();
	drawAnnotations();

}
//绘制中心圆点
function drawCentorid()
{
	ctx.beginPath();
	ctx.save();
	ctx.strokeStyle = CenterStrokeStyle;
	ctx.fillStyle = CenterFillStyle;

	ctx.arc(circle.x, circle.y, CenterIdR, 0, Math.PI*2, false);

	ctx.stroke();
	ctx.fill();
	ctx.restore();
}
//绘制表盘指针
function drawCentroidGuidewire(loc)
{
	var angle = -Math.PI/4,
		radius,
		endpt;

	radius = circle.radius + RingOuterR;

	//what -------------
	if (loc.x >= circle.x) 
	{
		endpt = {
			x: circle.x + radius*Math.cos(angle),
			y: circle.y + radius*Math.sin(angle)
		};
	} 
	else
	{
		endpt = {
			x: circle.x - radius*Math.cos(angle),
			y: circle.y - radius*Math.sin(angle)
		};
	}

	ctx.save();
	ctx.strokeStyle = GuidewireStrokeStyle;
	ctx.fillStyle = GuidewrireFillStyle;

	ctx.beginPath();
	ctx.moveTo(circle.x, circle.y);
	ctx.lineTo(endpt.x, endpt.y);

	ctx.stroke();

	//绘制指针末端小圆
	ctx.beginPath()
	ctx.strokeStyle = TickLongStrokeStyle;
	ctx.arc(endpt.x, endpt.y, 5, 0, Math.PI*2, false);

	ctx.fill();
	ctx.stroke();

	ctx.restore();
}
//绘制表盘圆圈，剪纸效果,非零环绕原则
function drawRing()
{
	ctx.shadowColor = 'rgba(0, 0, 0, .7)';
	ctx.shadowOffsetX = 3;
	ctx.shadowOffsetY = 3, 
	ctx.shadowBlur = 6,

	ctx.strokeStyle = TrackingDialStrokeStyle,
	ctx.beginPath();	//共用同一路径
	ctx.arc(circle.x, circle.y, circle.radius+RingOuterR, 0, Math.PI*2, true);
	ctx.stroke();

	ctx.strokeStyle = 'rgba(0, 0, 0, .1)';
	ctx.fillStyle = 'rgba(100, 140, 230, .1)';
	ctx.arc(circle.x, circle.y, circle.radius+RingInnerR, 0, Math.PI*2, false);
	ctx.fill();
	ctx.stroke();
}
//绘制内部圆形线框
function drawInnerCircle()
{
	ctx.save();

	ctx.beginPath();
	ctx.strokeStyle = 'rgba(0, 0, 0, .3)';
	ctx.arc(circle.x, circle.y, circle.radius+RingInnerR-TickWidth, 0, Math.PI*2, false);
	ctx.stroke();

	ctx.restore();	
}
//绘制刻度线
function drawTicks()
{
	var radius = circle.radius+RingInnerR,
		AngleMax = Math.PI*2,
		AngleDelta = Math.PI / 64;

	ctx.save();
	for (var angle = 0, ctn = 0; angle < AngleMax; angle += AngleDelta, ctn++) {
		 drawTick(angle, radius, ctn++);
	}

	ctx.restore();
}
function drawTick(angle, radius, ctn)
{
	var tickWidth = ctn % 4 === 0 ? TickWidth : TickWidth/2;

	ctx.beginPath();
	ctx.moveTo(circle.x + Math.cos(angle)*(radius - tickWidth),
			   circle.y + Math.sin(angle)*(radius - tickWidth));
	ctx.lineTo(circle.x + Math.cos(angle)*radius, 
			   circle.y + Math.sin(angle)*radius);

	ctx.strokeStyle = TickShortStrokeStyle;
	ctx.stroke();
}
//绘制表盘上的数字
function drawAnnotations()
{
	var radius = circle.radius + RingInnerR;

	ctx.save();
	ctx.fillStyle = AnnotationFillStyle;

	ctx.font = AnnotationTextSize + 'px Helvetica';

	for (var angle = 0; angle < 2*Math.PI; angle += Math.PI/8) {
		 ctx.beginPath();
		 ctx.fillText((angle*180/Math.PI).toFixed(0),
		 		       circle.x - Math.cos(angle)*(radius-TickWidth*2),
		 			   circle.y - Math.sin(angle)*(radius - TickWidth*2));
	}
	ctx.restore();
}
//initialization
ctx.textAlign = 'center';
ctx.textBaseline = 'middle'; 

drawGrid('lightgray',10,10);
drawDial();