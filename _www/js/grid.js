/**
 * H2O Grid
 */
function Grid(c, width, height) 
{
	var COORDS_DELIMITER = ':';

	var self = this;

	self.gridColor = "rgb(100,100,100)";
	self.tileSize = 20;
	self.tileRenderer = new TileRenderer(c, self);
	self.tiles = {};

	/**
	 * Draw the game grid
	 */
	self.draw = function()
	{
		//Draw the grid structure
		self.drawStructure();
		//Draw tiles
		self.drawTiles();
	};

	/**
	 * Draw the structure
	 */
	self.drawStructure = function()
	{
		c.strokeStyle = self.gridColor;
		for(var x=0; x < width; x++) {
			for(var y=0; y < height; y++) {
				c.strokeRect( (x*self.tileSize), (y*self.tileSize), self.tileSize, self.tileSize );
			}
		}
	};

	/**
	 * Draw tiles
	 */
	self.drawTiles = function()
	{
		//Loop on tiles
		for(var idx in self.tiles) {
			var tile = self.tiles[idx],
				coords = idx.split(COORDS_DELIMITER),
				x = coords[0],
				y = coords[1];

			self.tileRenderer.render(tile);
		}
	};

	/**
	 * Get a tile's key
	 */
	self.getTileKey = function(x,y)
	{
		return x + COORDS_DELIMITER + y;
	}

	/**
	 * Add a tile to the grid
	 */
	self.addTile = function(tile)
	{
		self.tiles[ self.getTileKey(tile.x,tile.y) ] = tile;
	};

	/**
	 * Remove a tile from the grid
	 */
	self.removeTile = function(x,y)
	{
		delete self.tiles[ self.getTileKey(x,y) ];
	};

	/**
	 * Get a tile from the grid
	 */
	self.getTile = function(x,y)
	{
		var tileKey = self.getTileKey(x,y);
		if( self.tiles.hasOwnProperty(tileKey) ) {
			return self.tiles[ tileKey ];
		}

		return null;
	}

	/**
	 * Given a mouse click event, find the corresponding grid coordinates
	 */
	self.getCoordinates = function(x,y)
	{
		var gridX = Math.floor(x/self.tileSize),
			gridY = Math.floor(y/self.tileSize);

		return {x: gridX, y: gridY};
	};

	/**
	 * Generate a new map
	 */
	self.generateMap = function()
	{
		var tileType = '',
			neighbours,
			probability;
		for(var x=0; x < width; x++) {
			for(var y=0; y < height; y++) {
				neighbours = self.getNeighbours(x,y,2);
				probability = 0;
				for(var idx in neighbours) {
					if( neighbours[idx].type === 's' ) {
						probability += 0.1;
					}
				}

				tileType = (Math.random() > (0.98 - probability)) ? 's' : 'g';
				self.addTile({
					x: x,
					y: y,
					type: tileType
				});
			}
		}
	};

	/**
	 * Get a tile's neighbours
	 *
	 * @param int x X coordinate
	 * @param int y Y coordinate
	 * @param int area Number of tiles in which to search for neighours (1 by default)
	 *
	 * @return array
	 */
	self.getNeighbours = function(x, y, area)
	{
		var neighbours = [],
			tileKey;

		if( typeof area === 'undefined' ) {
			area = 1;
		}

		for(var nx = x-area; nx < x+area; nx++) {
			for(var ny = y-area; ny < y+area; ny++) {
				tileKey = self.getTileKey(nx, ny);
				if( self.tiles.hasOwnProperty( tileKey ) ) {
					neighbours.push(self.tiles[tileKey]);
				}
			}
		}

		return neighbours;
	};

}