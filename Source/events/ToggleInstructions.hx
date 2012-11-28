package events;
import models.Option;
import nme.events.Event;

class ToggleInstructions extends Event
{
	public function new(label:String, bubbles:Bool = false, cancelable:Bool = false) 
	{
		super(label, bubbles, cancelable);
	}
}