package events;
import nme.events.EventDispatcher;

class AIEvent extends EventDispatcher
{

	public function new() 
	{
		super();
	}
	
	public function move(direction:Command):Void
	{
		
		var event = new SendBox(resource, position, "SendBox");
		dispatchEvent(event);
	}
	
}