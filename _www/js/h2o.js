/**
 * H2O
 */
function h2o(elt)
{
	var c = elt.getContext('2d'),
		self = this,
		world,
		grid,
		tools,
		info,
		gridWidth = 40,
		gridHeight = 30;

	//Create the grid
	grid = new Grid(c, gridWidth, gridHeight);
	//Generate a new map
	grid.generateMap();

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

	//Build the tools window
	tools = new Tools(c, document.getElementById('tools'));

	//Build the info window
	info = new Info(c, document.getElementById('status'));

	//Build world object
	world = new World(grid);

	//Listeners
	tools.addListener('toolSelected', function(selectedTool){
		info.message('You selected the "' + selectedTool + '"');
	});

	//Listen to mouse clicks
	self.mouseClicked = function(e)
	{
		//Get relative coordinates
		var coords = grid.getCoordinates(e.offsetX|e.layerX, e.offsetY|e.layerY),
			x = coords.x,
			y = coords.y,
			currentTool = tools.getCurrentTool(),
			currentTile = grid.getTile(x, y);

		//Add or remove a tile, depending if a tile was already there or not
		if( currentTile !== null && currentTile.type === currentTool.tile ) {
			grid.removeTile(x, y);
			grid.addTile({
				x: x,
				y: y,
				type: TILE_GRASS
			});
		}
		else {
			grid.addTile({
				x: x,
				y: y,
				type: tools.getCurrentTool().tile
			});
		}

		//Process the tiles
		world.processTiles();
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