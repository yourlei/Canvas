var canvas = document.getElementById('canvas'),
	ctx = canvas.getContext('2d'),
	Width = canvas.width,
	Height =  canvas.height,
	
	AxisMargin = 50,	//X，Y轴末端距canvas边缘的距离
	AxisOrigin = {		//坐标轴原点
		x: AxisMargin,
		y: Height - AxisMargin
	},

	AxisTop = AxisMargin,	//Y轴末端的y点坐标
	AxisRight = Width - AxisMargin,	//X轴末端的x点坐标
	
	//刻度线间的间隔	
	HTickSpacing = 10,
	VTickSpacing = 10,

	//X,Y轴的长度
	AxisWidth =  AxisRight - AxisMargin,
	AxisHeight = AxisOrigin.y - AxisTop,

	//将XY轴划分为段
	NumVTicks = AxisHeight / VTickSpacing,
	NumHTicks = AxisWidth / HTickSpacing,

	TickWidth = 10,
	TicksLinewidth = 0.5,
	TicksColor = 'navy',

	//轴的粗细及颜色
	AxisLinewidth = 1,
	AxisColor = 'blue',

	SpaceLabelsAndAxis = 20;	//文本标签和轴的距离

//Function ------
//绘制网格
function drawGrid(ctx,color,stepx,stepy)
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
//绘制坐标轴
function drawAxes()
{
	ctx.save();
	ctx.strokeStyle = AxisColor;
	ctx.lineWidth = AxisLinewidth;

	//调用函数，画X、Y轴
	drawHAxis();
	drawVAxis();

	//绘制X、Y轴上的刻度线
	ctx.lineWidth = TicksLinewidth;
	ctx.strokeStyle = TicksColor;
	
 	drawVAxisTicks();
	drawHAxisTicks();

	ctx.restore();
}
//画X轴
function drawHAxis()
{
	ctx.beginPath();
	ctx.moveTo(AxisOrigin.x, AxisOrigin.y);
	ctx.lineTo(AxisRight, AxisOrigin.y);
	ctx.stroke();
}
//画Y轴
function drawVAxis()
{
	ctx.beginPath();
	ctx.moveTo(AxisOrigin.x, AxisOrigin.y);
	ctx.lineTo(AxisOrigin.x, AxisTop);
	ctx.stroke();
}
//绘制Y轴上的刻度
function drawVAxisTicks()
{	
	var deltaY;	//刻度粗细

	for (var i = 1; i < NumVTicks; i++) {
		 ctx.beginPath();
		 if (i %5 ===0) 
		 {
		 	deltaX = TickWidth;
		 }
		 else
		 {
		 	deltaX = TickWidth / 2;
		 }
		 ctx.moveTo(AxisOrigin.x - deltaX, AxisOrigin.y - i*VTickSpacing);
		 ctx.lineTo(AxisOrigin.x + deltaX, AxisOrigin.y - i*VTickSpacing);

		 ctx.stroke();
	}
	console.log(deltaX);
}
//绘制X轴上的刻度
function drawHAxisTicks()
{
	var deltaY;	//刻度粗细

	for (var i = 0; i < NumHTicks; i++) {
		ctx.beginPath() ;
		if (i%5 === 0) 
		{
			deltaY = TickWidth;
		}
		else
		{
			deltaY = TickWidth / 2;
		}
		ctx.moveTo(AxisOrigin.x + i*HTickSpacing, AxisOrigin.y - deltaY);
		ctx.lineTo(AxisOrigin.x + i*HTickSpacing, AxisOrigin.y + deltaY);
		ctx.stroke();
	}
}
//绘制文本标签
function drawAxisLabels()
{
	ctx.fillStyle = 'blue';
	drawHAxisLabels();
	drawVAxisLabels();
}
function drawHAxisLabels()
{
	ctx.textAlign = 'center';
	ctx.textBaseline = 'top';

	for (var i = 0; i < NumHTicks; i++) {
		if (i%5 ===0) 
		{
			ctx.fillText(i, AxisOrigin.x + i*HTickSpacing, AxisOrigin.y+SpaceLabelsAndAxis);
		}
	}
}
function drawVAxisLabels()
{
	ctx.textAlign = 'right';
	ctx.textBaseline = 'middle';

	for (var i = 0; i < NumVTicks; i++) {
		if (i%5 ===0) 
		{
			ctx.fillText(i, AxisOrigin.x - SpaceLabelsAndAxis, AxisOrigin.y - i*VTickSpacing);
		} 
	}
}
//initialization
drawGrid(ctx, 'lightgray',10,10);
drawAxes();
drawAxisLabels();
