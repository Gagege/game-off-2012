package events;
import controllers.PlayController;
import nme.events.EventDispatcher;

class AIEvent extends EventDispatcher
{

	public function new() 
	{
		super();
	}
	
	public function move(direction:Command):Void
	{
		
		var event = new AIMove(direction, "AIMove");
		dispatchEvent(event);
	}
	
}