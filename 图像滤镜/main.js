var canvas = document.getElementById('canvas'),
	ctx = canvas.getContext('2d'),

	canvas2 = document.getElementById('canvas2'),
	ctx2 = canvas2.getContext('2d'),

	canvas3 = document.getElementById('canvas3'),
	ctx3 = canvas3.getContext('2d'),

	negativeBtn = document.getElementById('negativeBtn'),
	blackwhiteBtn = document.getElementById('blackwhiteBtn'),
	embossBtn = document.getElementById('embossBtn'),
	image = new Image();

negativeBtn.onclick = function(e)
{
	var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height),
		data = imageData.data,
		i = 0;
	for(i = 0; i < data.length - 4; i+=4)
	{
		data[i] = 255 - data[i];
		data[i + 1] = 255 - data[i + 1];
		data[i + 2] = 255 - data[i + 2];
	}

	ctx.putImageData(imageData, 0, 0);
}

blackwhiteBtn.onclick = function()
{
	var average = null;
	if (blackwhiteBtn.checked) 
	{
		ctx2.drawImage(image, 0, 0, image.width, image.height,
				      0, 0, canvas.width, canvas.height);
	}
	else
	{
		var imageData = ctx2.getImageData(0, 0, canvas.width, canvas.height),
		data = imageData.data,
		i = 0;
		for(i = 0; i < data.length - 4; i+=4)
		{
			average = (data[i] + data[i+1] + data[i+2]) / 3;

			data[i]  = average;
			data[i+1] = average;
			data[i+2] = average;
		}

		ctx2.putImageData(imageData, 0, 0);
	}
};

embossBtn.onclick = function(e)
{
	
	if (embossBtn.checked) 
	{
		ctx3.drawImage(image, 0, 0, image.width, image.height,
				  0, 0, canvas.width, canvas.height);
	}
	else
	{
		var imageData = ctx3.getImageData(0, 0, canvas.width, canvas.height),
			data = imageData.data,
			width = data.width,
			length = data.length,
			index = 3,
			i = null;

	/*	for(i = 0; i < length; i++)
		{
			if(i <= length - width*4)
			{
				if ((i+1) % 4 !== 0) 
				{
					if ((i+4) % (width*4) == 0) 
					{
						data[i] = data[i -4];
						data[i+1] = data[i -3];
						data[i+2] = data[i -2];
						data[i+3] = data[i -1];

						i += 4;
					}
					else
					{
						data[i] = 255/2+2*data[i]-data[i+4]-data[i+width*4];
					}
				}
			}
			else
			{
				if ((i+1) % 4 !== 0) {
					data[i] = data[i-width*4];
				}
			}
		}
		ctx3.putImageData(imageData, 0, 0);
	}*/

	for (i=0; i < length; i++) { // loop through every pixel

	   // if we won't overrun the bounds of the array
	   if (i <= length-width*4) {

	      // if it's not an alpha 
	      if ((i+1) % 4 !== 0) {

	         // if it's the last pixel in the row, there is
	         // no pixel to the right, so copy previous pixel's
	         // values.

	         if ((i+4) % (width*4) == 0) {
	            data[i] = data[i-4];
	            data[i+1] = data[i-3];
	            data[i+2] = data[i-2];
	            data[i+3] = data[i-1];
	            i+=4;
	         }
	         else { // not the last pixel in the row
	            data[i] = 255/2         // Average value
	                      + 2*data[i]   // current pixel
	                      - data[i+4]   // next pixel
	                      - data[i+width*4]; // pixel underneath
	         }
	      }
	   }
	   else { // last row, no pixels underneath,
	          // so copy pixel above
	      if ((i+1) % 4 !== 0) {
	         data[i] = data[i-width*4];
	      }
	   }
	}
	ctx3.putImageData(imageData, 0, 0); 
	}

};
image.src = './curved-road.png';
image.onload = function()
{
	ctx.drawImage(image, 0, 0, image.width, image.height,
				  0, 0, canvas.width, canvas.height);
	ctx2.drawImage(image, 0, 0, image.width, image.height,
				  0, 0, canvas.width, canvas.height);
	ctx3.drawImage(image, 0, 0, image.width, image.height,
				  0, 0, canvas.width, canvas.height);
};

