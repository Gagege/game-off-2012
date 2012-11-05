package events;

import models.Resource;
import nme.events.EventDispatcher;

class BoxEvents extends EventDispatcher
{

	public function new() 
	{
		super();
	}
	
	public function testSend():Void
	{
		var resource = new Resource("1 Plutonium", 1, ResourceType.Plutonium);
		var event1 = new SendBox(resource, 1, "SendBox");
		dispatchEvent(event1);
		
		var resource = new Resource("1 Uranium", 1, ResourceType.Uranium);
		var event1 = new SendBox(resource, 2, "SendBox");
		dispatchEvent(event1);
		
		var resource = new Resource("1 Lithium", 1, ResourceType.Lithium);
		var event1 = new SendBox(resource, 3, "SendBox");
		dispatchEvent(event1);
	}
	
}