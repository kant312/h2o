/**
 * TileRenderer
 */
function TileRenderer(c, parentGrid)
{

	var grid = parentGrid,
		tileColors = {
			g : { color: "rgb(0,240,100)" },
			s : { color: "rgb(240, 240,100)" },
			w : { color: "rgb(0,100,240)" }
		};

	/**
	 * Render a tyle
	 */
	this.render = function(tile)
	{
		var type = tile.type;

		switch(type) {
			//Water, sand and grass
			case 'g':
			case 's':
			case 'w':
				this.renderSimpleTile(tile);
		}

	};

	/**
	 * Render a simple tile
	 * 
	 * @param  object tile The tile's properties
	 * 
	 * @return void
	 */
	this.renderSimpleTile = function(tile)
	{
		c.fillStyle = tileColors[tile.type].color;
		c.fillRect( (tile.x * grid.tileSize), (tile.y * grid.tileSize), grid.tileSize, grid.tileSize );
	};

}