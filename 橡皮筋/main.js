var canvas = document.getElementById('canvas'),
	ctx = canvas.getContext('2d'),

	restbtn = document.getElementById('resetButton'),

	image = new Image(),
	imageData,

	mouseDown = {},	//鼠标按下时坐标
	rubberbanRect = {},	//存储矩形框的左上角坐标，宽，高

	imagedataCopy = ctx.createImageData(canvas.width, canvas.height),

	dragging = false;

function WindowToCanvas (canvas, x, y) 
{
	var bbox = canvas.getBoundingClientRect();

	return {
		x: x - bbox.left,
		y: y - bbox.top
	}
}
function copyCanvasPixels()
{
	var i = 0;

	for(i = 0; i < 3; i++)
	{
		imagedataCopy.data[i] = imageData.data[i];
	}

	for(i = 3; i < imageData.data.length - 4; i += 4)
	{
		imagedataCopy.data[i] = imageData.data[i] / 2;	//修改透明度

		imagedataCopy.data[i+1] = imageData.data[i + 1];	//red
		imagedataCopy.data[i+2] = imageData.data[i + 2];	//green
		imagedataCopy.data[i+3] = imageData.data[i + 3];	//blue
	}
}
//获取矩形框中的图像数据
function CaptureRectImage()
{
	/*imageData = ctx.getImageData(rubberbanRect.left,
								 rubberbanRect.top,
								 rubberbanRect.width,
								 rubberbanRect.height);*/

	imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	copyCanvasPixels();
}
//what--------
function restoreRectImage()
{

	// ctx.putImageData(imageData, rubberbanRect.left, rubberbanRect.top);
	// ctx.putImageData(imagedataCopy, 0, 0,
	// 				rubberbanRect.left+ ctx.lineWidth ,
	// 			    rubberbanRect.top + ctx.lineWidth,
	// 			    rubberbanRect.width - 4*ctx.lineWidth,
	// 			    rubberbanRect.height - 4*ctx.lineWidth);

	var deviceWidthOverCSSPixels = imageData.width / rubberbanRect.width,
	    deviceHeightOverCSSPixels = imageData.height / rubberbanRect.height;
/*
	
	ctx.putImageData(imageData,
	                     rubberbanRect.left * deviceWidthOverCSSPixels,
	                     rubberbanRect.top * deviceHeightOverCSSPixels);*/

	ctx.putImageData(imageData, 0, 0);
	ctx.putImageData(imagedataCopy, 0, 0,
	   (rubberbanRect.left + ctx.lineWidth),
	   (rubberbanRect.top + ctx.lineWidth),
	   (rubberbanRect.width - 2*ctx.lineWidth) ,
	   (rubberbanRect.height - 2*ctx.lineWidth));
}
//绘制矩形框
function drawRect()
{
	ctx.strokeRect(rubberbanRect.left+ctx.lineWidth,
				   rubberbanRect.top+ctx.lineWidth,
				   rubberbanRect.width - 2*ctx.lineWidth,
				   rubberbanRect.height - 2*ctx.lineWidth
				   );
}
//设置矩形框的左上角坐标，及width，height
function setRubberbandRect(x,y)
{
	rubberbanRect.left = Math.min(x, mouseDown.x);
	rubberbanRect.top = Math.min(y, mouseDown.y);
	rubberbanRect.width = Math.abs(x - mouseDown.x);
	rubberbanRect.height = Math.abs(y - mouseDown.y);
}
/*function updatRubberband()
{
	CaptureRectImage();
	drawRect();
}*/
function rubberRectStart(x, y)
{
	mouseDown.x = x;
	mouseDown.y = y;

	rubberbanRect.left = mouseDown.x;
	rubberbanRect.top = mouseDown.y;

	rubberbanRect.width = 0;
	rubberbanRect.height = 0;

	dragging = true;

	CaptureRectImage();
}
function rubberbandStretch(x, y)
{
	if (rubberbanRect.width > 2*ctx.lineWidth 
		 && rubberbanRect.height > 2*ctx.lineWidth) 
	{
		if (imageData !== undefined) 
		{
			restoreRectImage();
		}
	}

	setRubberbandRect(x, y);

	if (rubberbanRect.width > 2*ctx.lineWidth 
		 && rubberbanRect.height > 2*ctx.lineWidth) 
	{
		// updatRubberband();
		drawRect();
	}
}
function rubberbandEnd()
{
	ctx.putImageData(imageData, 0, 0);
	ctx.drawImage(canvas, rubberbanRect.left+ ctx.lineWidth *2,
				  rubberbanRect.top + ctx.lineWidth*2,
				  rubberbanRect.width - 5*ctx.lineWidth,
				  rubberbanRect.height - 5*ctx.lineWidth,
				  0, 0, canvas.width, canvas.height);
	dragging = false;
	imageData = undefined;
}

//mouse event
canvas.onmousedown = function(e)
{
	var loc = WindowToCanvas(canvas, e.clientX, e.clientY);

	e.preventDefault();
	// console.log(loc.x, loc.y);
	rubberRectStart(loc.x, loc.y);
}

canvas.onmousemove = function(e)
{
	var loc;

	if (dragging) 
	{
		loc = WindowToCanvas(canvas, e.clientX, e.clientY);
		rubberbandStretch(loc.x, loc.y);
	}
}

canvas.onmouseup = function(e)
{
	rubberbandEnd();
}

//initialization 
image.src = './arch.png';

image.onload = function()
{
	ctx.drawImage(image,0, 0, canvas.width, canvas.height);
}
restbtn.onclick = function(e)
{	
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
}

ctx.strokeStyle = 'navy';
ctx.lineWidth = 1.0;