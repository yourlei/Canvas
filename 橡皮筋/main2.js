var canvas = document.getElementById('canvas'),	
	ctx = canvas.getContext('2d'),

	resetBtn = document.getElementById('resetButton'),

	image = new Image(),

	mousedown = {},
	Rectangle = {},

	imageData,
	copyImageData = ctx.createImageData(canvas.width, canvas.height),

	dragging = false;

function WindowToCanvas (canvas, x, y) 
{
	var bbox = canvas.getBoundingClientRect();

	return {
		x: x - bbox.left,
		y: y - bbox.top
	};
}


function captureCanvasPixels()
{
	imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	copyCanvasPixels();
}
function copyCanvasPixels()
{
	var i = 0 ;

	//复制第一个像素的red、green、blue
	for (i = 0; i < 3; i++) {
		copyImageData.data[i] = imageData.data[i];
	}

	for (i = 3; i < imageData.data.length - 4; i+=4) {
		
		copyImageData.data[i] = imageData.data[i]/2;		//Alpha
		copyImageData.data[i+1] = imageData.data[i+1];	//red
		copyImageData.data[i+2] = imageData.data[i+2];	//green
		copyImageData.data[i+3]	= imageData.data[i+3];	//blue
	}
}

function restoreRectPixels()
{
	// ctx.putImageDate(imageData, 0, 0);	//重绘背景
	ctx.putImageData(copyImageData, 0, 0, Rectangle.left+ctx.lineWidth, Rectangle.top+ctx.lineWidth,
					 Rectangle.width - 2*ctx.lineWidth, Rectangle.height - 2*ctx.lineWidth
					 );

}

function setRectangle(x, y)
{
	Rectangle.left = Math.min(x, mousedown.x);
	Rectangle.top = Math.min(y, mousedown.y);
	Rectangle.width = Math.abs(x - mousedown.x);
	Rectangle.height = Math.abs(y - mousedown.y);

	console.log("drawrect" + Rectangle.width);
}
function drawRectangle()
{
	ctx.strokeRect(Rectangle.left + ctx.lineWidth,
				   Rectangle.top + ctx.lineWidth,
				   Rectangle.width - 2*ctx.lineWidth,
				   Rectangle.height - 2*ctx.lineWidth);
	// console.log("hai, drawRect.");
}

function rectStart (x, y) 
{
	mousedown.x = x;
	mousedown.y = y;

	Rectangle.left = mousedown.x;
	Rectangle.top = mousedown.y;

	Rectangle.width = 0;
	Rectangle.height = 0;

	dragging = true;

	captureCanvasPixels();	//拷贝canvas ImageData
}

function rubberbandStretch(x, y)
{
	if (Rectangle.width > 2*ctx.lineWidth 
		&& Rectangle.height > 2*ctx.lineWidth) 
	{
		if (imageData !== undefined) 
		{
			restoreRectPixels();
		}
	}

	setRectangle(x, y);
	if (Rectangle.width > 2*ctx.lineWidth 
		&& Rectangle.height > 2*ctx.lineWidth)
	{
		drawRectangle();
	} 
}
function rubberbandEnd()
{
	ctx.putImageData(imageData, 0, 0);
	ctx.drawImage(canvas,
				  Rectangle.left + ctx.lineWidth,
  				  Rectangle.top + ctx.lineWidth,
  				  Rectangle.width - 4*ctx.lineWidth,
  				  Rectangle.height - 4*ctx.lineWidth,
  				  0, 0, canvas.width, canvas.height);

	dragging = false;
	imageData = undefined;
}

//event handle
canvas.onmousedown = function(e)
{
	var loc = WindowToCanvas(canvas, e.clientX, e.clientY);

	e.preventDefault();
	rectStart(loc.x, loc.y);

	// console.log("down " + Rectangle.height +  " --"+  Rectangle.width);							
	// console.log(imageData);
}

canvas.onmousemove = function(e)
{
	var loc;
	if (dragging) 
	{
		loc = WindowToCanvas(canvas, e.clientX, e.clientY);

		rubberbandStretch(loc.x, loc.y);
		// console.log("move " + Rectangle.height + Rectangle.width);
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
};

resetBtn.onclick = function()
{
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
}

ctx.strokeStyle = 'orange';
ctx.lineWidth = 1.0;

// console.log(imageData);
