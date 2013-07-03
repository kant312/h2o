/**
 * TileRenderer
 */
var TILE_CHANNEL = 'c',
	TILE_DAM = 'd',
	TILE_GRASS = 'g',
	TILE_PUMP = 'p',
	TILE_SAND = 's',
	TILE_WATER = 'w';

function TileRenderer(c, parentGrid)
{

	var grid = parentGrid,
		tileStyleInfo = {
			c : { color: "rgb(100,100,120)", waterColor: "rgb(40,40,220)" },
			d : { color: "rgb(120,40,30)", text:'D', textColor: "rgb(255,255,255)" },
			p : { color: "rgb(90,50,30)", text:'P', textColor: "rgb(255,255,255)" },
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
			//Special: channel
			case TILE_CHANNEL:
				this.renderChannelTile(tile);
			break;
			//Text tiles
			case TILE_DAM:
			case TILE_PUMP:
				this.renderTextTile(tile);
			break;
			//Simple tiles
			case TILE_GRASS:
			case TILE_SAND:
			case TILE_WATER:
				this.renderSimpleTile(tile);
			break;
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
		c.fillStyle = tileStyleInfo[tile.type].color;
		c.fillRect( (tile.x * grid.tileSize), (tile.y * grid.tileSize), grid.tileSize, grid.tileSize );
	};

	/**
	 * Render a tile containing text
	 * 
	 * @param object tile The tile's properties
	 * 
	 * @return void
	 */
	this.renderTextTile = function(tile)
	{
		c.fillStyle = tileStyleInfo[tile.type].color;
		c.fillRect( (tile.x * grid.tileSize), (tile.y * grid.tileSize), grid.tileSize, grid.tileSize );

		c.fillStyle = tileStyleInfo[tile.type].textColor;
		c.fillText( tileStyleInfo[tile.type].text, (tile.x * grid.tileSize) + grid.tileSize/3, (tile.y * grid.tileSize) + grid.tileSize/1.5 );
	};

	/**
	 * Render a channel tile
	 *
	 * @param object tile The tile's properties
	 *
	 * @return void
	 */
	this.renderChannelTile = function(tile)
	{
		var styleInfo = tileStyleInfo[tile.type];

		this.renderSimpleTile(tile);

		if( tile.water > 0 ) {
			c.fillStyle = tileStyleInfo[tile.type].waterColor;
			c.fillRect( (tile.x * grid.tileSize) + grid.tileSize/4, (tile.y * grid.tileSize), (grid.tileSize/2), grid.tileSize );
		}
	};

}