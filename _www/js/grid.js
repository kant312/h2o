/**
 * H2O Grid
 */
function Grid(c, width, height) 
{
	var COORDS_DELIMITER = ':';

	var gridColor = "rgb(100,100,100)"
		blockSize = 48,
		blocks = {},
		blockTypes = {
			w : { color: "rgb(0,100,240)" }
		};

	/**
	 * Draw the game grid
	 */
	this.draw = function()
	{
		//Draw the grid structure
		this.drawStructure();
		//Draw blocks
		this.drawBlocks();
	};

	/**
	 * Draw the structure
	 */
	this.drawStructure = function()
	{
		c.strokeStyle = gridColor;
		for(var x=0; x < width; x++) {
			for(var y=0; y < height; y++) {
				c.strokeRect( (x*blockSize), (y*blockSize), blockSize, blockSize );
			}
		}
	};

	/**
	 * Draw blocks
	 */
	this.drawBlocks = function()
	{
		//Loop on blocks
		for(var idx in blocks) {
			var blockType = blocks[idx],
				coords = idx.split(COORDS_DELIMITER),
				x = coords[0],
				y = coords[1];

			c.fillStyle = blockTypes[blockType].color;
			c.fillRect( (x*blockSize), (y*blockSize), blockSize, blockSize );
		}
	};

	/**
	 * Get a block's key
	 */
	this.getBlockKey = function(x,y)
	{
		return x + COORDS_DELIMITER + y;
	}

	/**
	 * Add a block to the grid
	 */
	this.addBlock = function(x,y,type)
	{
		blocks[ this.getBlockKey(x,y) ] = type;
	};

	/**
	 * Remove a block from the grid
	 */
	this.removeBlock = function(x,y)
	{
		delete blocks[ this.getBlockKey(x,y) ];
	};

	/**
	 * Get a block from the grid
	 */
	this.getBlock = function(x,y)
	{
		var blockKey = this.getBlockKey(x,y);
		if( blocks.hasOwnProperty(blockKey) ) {
			return blocks[ blockKey ];
		}

		return null;
	}

	/**
	 * Given a mouse click event, find the corresponding grid coordinates
	 */
	this.getCoordinates = function(x,y)
	{
		var gridX = Math.floor(x/blockSize),
			gridY = Math.floor(y/blockSize);

		return {x: gridX, y: gridY};
	};

}