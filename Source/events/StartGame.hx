package events;
import models.Option;
import nme.events.Event;

class StartGame extends Event
{
	public var options:Array<Option>;
	
	public function new(gameOptions:Array<Option>, label:String, bubbles:Bool = false, cancelable:Bool = false) 
	{
		super(label, bubbles, cancelable);
		options = gameOptions;
	}
	
}