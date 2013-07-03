/**
 * Display information to the user
 */
function Info(c, elt)
{
	var self = this;

	self.msgList = document.querySelector('#'+elt.id + ' ul');

	self.message = function(msg, type)
	{
		if( typeof type === 'undefined' ) {
			type = 'info';
		}
		var lastMsg = self.msgList.firstChild,
			msgNode = document.createElement('li');

		msgNode.className = type;
		msgNode.textContent = msg;
		self.msgList.insertBefore(msgNode,lastMsg);
	}
}