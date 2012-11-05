package events;

import models.Resource;
import nme.events.EventDispatcher;

class BoxEvents extends EventDispatcher
{

	public function new() 
	{
		super();
	}
	
	public function send(resource:Resource, position:Int):Void
	{
		var event = new SendBox(resource, position, "SendBox");
		dispatchEvent(event);
	}
	
}