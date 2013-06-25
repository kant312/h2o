/**
 * H2O
 */
function h2o(elt)
{
	var c = elt.getContext('2d'),
		self = this,
		grid,
		gridWidth = 16,
		gridHeight = 12;

	//Create the grid
	grid = new Grid(c, gridWidth, gridHeight);

	//Clear the game container
	self.clear = function()
	{
		elt.width = elt.width;
	};
	
	//Draw the whole game
	self.draw = function()
	{
		//First we clear the game container
		self.clear();
		//Then we draw the grid
		grid.draw();
	};

	//Listen to mouse clicks
	self.mouseClicked = function(e)
	{
		//Get relative coordinates
		var coords = grid.getCoordinates(e.offsetX|e.layerX, e.offsetY|e.layerY),
			x = coords.x,
			y = coords.y;

		//Add or remove a block, depending if a block was already there or not
		if( grid.getBlock(x, y) === null ) {
			grid.addBlock(x, y, 'w');
		}
		else {
			grid.removeBlock(x, y);
		}

		//Redraw the game container
		self.draw();
	};
	elt.onclick = self.mouseClicked;

}

window.onload = function()
{
	var game = new h2o(document.getElementById('game-container'));
	game.draw();
};