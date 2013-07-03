/**
 * Define the available tools and their behavior
 */
function Tools(c, elt)
{
	var self = this,
		DEFAULT_TOOL = 'pump';

	//Listeners
	self._events = {};

	//List of the available tools
	self.tools = {
		'channel' : {name: 'Channel', tile:TILE_CHANNEL},
		'dam' : {name: 'Dam', tile:TILE_DAM},
		'pump' : {name: 'Pump', tile:TILE_PUMP}
	};

	//Set the tool selected by default
	self.selectedTool = DEFAULT_TOOL;

	/**
	 * Select a tool
	 */
	self.selectTool = function(e)
	{
		self.selectedTool = e.target.rel;
		//Mark the other tools as unselected
		var links = document.querySelectorAll('a.tool');
		for(var i =0; i < links.length; i++) {
			var link = links[i];
			link.className = 'tool ' + link.rel;
		}
		//Highlight the newly selected tool
		e.target.className = 'selected tool ' + self.selectedTool;
		//Notify listeners
		self.fireEvent('toolSelected', self.selectedTool);
	};

	/**
	 * Get the current tool
	 *
	 * @return object
	 */
	self.getCurrentTool = function()
	{
		return self.tools[self.selectedTool];
	};

	self.addListener = function(eventName, callback) 
	{
      var events = self._events,
          callbacks = events[eventName] = events[eventName] || [];
      callbacks.push(callback);
  	};

	self.fireEvent =  function(eventName, args) 
	{
      var callbacks = self._events[eventName];
      for (var i = 0, l = callbacks.length; i < l; i++) {
          callbacks[i].call(null, args);
      }
  	};

	//Add the tools
	for(var toolType in self.tools) {
		var tool = document.createElement('a'),
			toolName = self.tools[toolType].name,
			selected = (toolType === self.selectedTool) ? 'selected' : '';
		tool.className = 'tool ' + toolType + ' ' + selected;
		tool.rel = toolType;
		tool.appendChild(document.createTextNode(toolName));
		tool.addEventListener('click', self.selectTool);
		elt.appendChild(tool);
	}

}