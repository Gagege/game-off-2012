package events;
import nme.events.Event;

class AIMove extends Event
{

	public function new(label:String, bubbles:Bool = false, cancelable:Bool = false) 
	{
		super(label, bubbles, cancelable);
	}
	
}