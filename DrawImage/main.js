var canvas = document.getElementById('canvas'),
	ctx = canvas.getContext('2d'),

	offscreenCanvas = document.createElement('canvas'),
	offscreenCtx = offscreenCanvas.getContext('2d'),

	image = new Image(),

	slider = document.getElementById('scaleSlider'),

	scale = 1.0,
	minScale = 1.0,
	maxScale = 3.0;

//function ---------
//method 1
/*function drawImage (scale)
{
	var w = canvas.width,
		h = canvas.height,
		scaleW = w * scale,
		scaleH =  h * scale;

	ctx.clearRect(0, 0, canvas.width, canvas.height);//擦除画布

	ctx.drawImage(image, 0, 0, canvas.width, canvas.height);//重绘背景图

	drawWatermark();//绘制水印

	ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height,
				  -scaleW/2+w/2, -scaleH/2+h/2, scaleW, scaleH);
	//图像缩放大于1.0后，绘制的图像会超出canvas之内;然而浏览器会忽略canvas之外的图像
}*/

//Method 2
function  ScaleImage()
{
	var w = canvas.width,
		h = canvas.height,
		scaleW = w * scale,
		scaleH =  h * scale;

	ctx.drawImage(offscreenCanvas, 0, 0, offscreenCanvas.width, offscreenCanvas.height,
				  -scaleW/2+w/2, -scaleH/2+h/2, scaleW, scaleH);
}
function drawWatermark(ctx)
{
	var text1 = "Hello world",
		textMetrics,	//文本宽度
		fontHeight = 128;

	ctx.save();

	ctx.fillStyle = 'cornflowerblue';
	ctx.strokeStyle = 'yellow';

	ctx.shadowColor   = 'rgba(50, 50, 50, 1.0)';
	ctx.shadowOffsetX = 5;
	ctx.shadowOffsetY = 5;
	ctx.shadowBlur    = 10;

	ctx.font = fontHeight + 'px Arial';
	textMetrics = ctx.measureText(text1)/2;

	ctx.textAlign = 'center';
	// ctx.textBaseline = 'middle';

	ctx.fillText(text1, canvas.width/2, canvas.height/2 + fontHeight/2);
	ctx.strokeText(text1, canvas.width/2, canvas.height/2 + fontHeight/2);

	ctx.restore();
}
//update text
function updateText(value)
{
	var text = parseFloat(value).toFixed(2);
	var percent = parseFloat(value - minScale) / parseFloat(maxScale - minScale);

	scaleOutput.innerText = text;
	percent = percent < 0.35 ? 0.35 : percent;
	scaleOutput.style.fontSize = percent*maxScale/1.5 + 'em';
}

//scaleSlider change event 
scaleSlider.onchange = function(e)
{
	scale = e.target.value;

	if (scale < minScale) 
	{
		scale = minScale;
	}
	if(scale > maxScale)
	{
		scale = maxScale;
	}
	updateText(scaleSlider.value);
	ScaleImage();
};
//initalization------------
offscreenCanvas.width = canvas.width;
offscreenCanvas.height = canvas.height;
image.src = "../images/curved-road.png";
image.onload = function(e)
{
	// drawImage(scale);

	ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
	offscreenCtx.drawImage(image, 0, 0, canvas.width, canvas.height);

	drawWatermark(ctx);
	drawWatermark(offscreenCtx);
	updateText(scaleSlider.value);
};