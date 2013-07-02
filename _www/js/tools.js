/**
 * Define the available tools and their behavior
 */
function Tools(c, elt)
{
	var self = this,
		DEFAULT_TOOL = 'pump';

	//List of the available tools
	self.tools = {
		'dam' : 'Dam',
		'pump' : 'Pump'
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
	};

	//Add the tools
	for(var toolType in self.tools) {
		var tool = document.createElement('a'),
			toolName = self.tools[toolType],
			selected = (toolType === self.selectedTool) ? 'selected' : '';
		tool.className = 'tool ' + toolType + ' ' + selected;
		tool.rel = toolType;
		tool.appendChild(document.createTextNode(toolName));
		tool.addEventListener('click', self.selectTool);
		elt.appendChild(tool);
	}

}