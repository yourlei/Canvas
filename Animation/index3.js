var canvas = document.getElementById('canvas'),
	ctx = canvas.getContext('2d'),
	width = canvas.width,
	height = canvas.height,

	btn = document.getElementById('animateBtn'),

	littleTree = new Image(),
	bigTree = new Image(),
	grass = new Image(),
	grass2 = new Image(),
	sky = new Image(),

	paused = true,
	lastTime = 0,
	lastFps = {
		time: 0,
		value: 0
	},

	fps = 60,
	skyOffset = 0,
	grassOffset = 0,
	bigTreeOffset = 0,
	littleTreeOffset = 0,

	slowTreeSpeed = 20,
	fastTreeSpeed = 40,
	skySpeed = 8,
	grassSpeed = 75;

function clearRect() {
	ctx.clearRect(0, 0, width, height);
}

function draw()
{
	ctx.save();

	skyOffset = skyOffset < width ? skyOffset + skySpeed / fps : 0;
	grassOffset = grassOffset  < width ? grassOffset + grassSpeed / fps : 0;
	littleTreeOffset = littleTreeOffset < width ? littleTreeOffset + slowTreeSpeed / fps : 0;
	bigTreeOffset = bigTreeOffset < width ? bigTreeOffset + fastTreeSpeed / fps : 0;

	//sky
	ctx.save();

	ctx.translate(-skyOffset, 0);
	ctx.drawImage(sky, 0, 0);
	ctx.drawImage(sky, width -2, 0);

	ctx.restore();

	//little trees
	ctx.save();

	ctx.translate(-littleTreeOffset, 0);
	ctx.drawImage(littleTree, 100, 240);
	ctx.drawImage(littleTree, 1100, 240);
	ctx.drawImage(littleTree, 400, 240);
	ctx.drawImage(littleTree, 1400, 240);
	ctx.drawImage(littleTree, 700, 240);
	ctx.drawImage(littleTree, 1700, 240);

	ctx.restore();

	//big tree
	ctx.save();

	ctx.translate(-bigTreeOffset, 0);
	ctx.drawImage(bigTree, 250, 220);
	ctx.drawImage(bigTree, 1250, 220);
	ctx.drawImage(bigTree, 800, 220);
	ctx.drawImage(bigTree, 1800, 220);
	
	ctx.restore();

	ctx.save();
	ctx.translate(-grassOffset, 0);
	ctx.drawImage(grass, 0, height - grass.height);
	ctx.drawImage(grass, grass.width -5, height - grass.height);
	ctx.drawImage(grass2, 0, height - grass2.height);
	ctx.drawImage(grass2, width, height - grass2.height);

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
		clearRect();
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

//initialization
littleTree.src = 'smalltree.png';
bigTree.src = 'tree-twotrunks.png';
grass.src = 'grass.png';
grass2.src = 'grass2.png';
sky.src = 'sky.png';

sky.onload = function(e)
{
	draw();
}

window.requestNextAnimationFrame(animate);
