function World(grid)
{
	var self = this;

	self.processed = {};

	self.processTiles = function()
	{
		//Clear the list of processed tiles
		self.processed = {};

		grid.iterate(function(tile){
			var tileKey = grid.getTileKey(tile.x, tile.y),
				neighbours;

			//Skip the tile if we already processed it
			if( self.processed.hasOwnProperty(tileKey) ) {
				return;
			}

			//Did we encounter a pump?
			// if( tile.type === TILE_PUMP ) {
			// 	//Check neighbours to see if it is connected to a channel
			// 	neighbours = grid.getNeighbours(tile.x, tile.y, 1);
			// 	for(var tileIdx in neighbours) {
			// 		var neighbour = neighbours[tileIdx];
			// 		//If it's a channel, fill it with water
			// 		if( neighbour.type === TILE_CHANNEL ) {
			// 			grid.updateTile(tile.x, tile.y, {
			// 				water: 3
			// 			});
			// 		}
			// 	}
			// }
			//Did we encounter a channel?
			if( tile.type === TILE_CHANNEL ) {
				//Check neighbours
				neighbours = grid.getNeighbours(tile.x, tile.y, 1);
				for(var tileIdx in neighbours) {
					var neighbour = neighbours[tileIdx];
					//If it's a channel, fill it with water
					if( neighbour.type === TILE_CHANNEL ) {
						grid.updateTile(tile.x, tile.y, {
							water: neighbour.water
						});
					}
					else if( neighbour.type === TILE_PUMP ) {
						grid.updateTile(tile.x, tile.y, {
							water: 3
						});						
					}
				}
			}

			//Add tile to the list of processed tiles
			self.processed[tileKey] = 1;
		});
	};
}