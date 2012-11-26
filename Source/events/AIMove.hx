package events;
import controllers.PlayController;
import nme.events.Event;

class AIMove extends Event
{
	public var direction:Command;
	
	public function new(command:Command, label:String, bubbles:Bool = false, cancelable:Bool = false) 
	{
		super(label, bubbles, cancelable);
		direction = command;
	}
	
}