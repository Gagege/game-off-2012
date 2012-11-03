package events;

import models.Resource;
import nme.events.EventDispatcher;

class BoxSender extends EventDispatcher
{

	public function new() 
	{
		super();
	}
	
	public function testSend():Void
	{
		var resource = new Resource("1 Lithium", 1, ResourceType.Lithium);
		
		var event = new SendBox(resource, "SendBox");
		dispatchEvent(event);
	}
	
}