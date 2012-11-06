package events;

import nme.events.Event;

class RemoveBox extends Event
{

	public var removeFrom(default, null):Int;
	
	public function new(position:Int, label:String, bubbles:Bool = false, cancelable:Bool = false) 
	{
		super(label, bubbles, cancelable);
		this.removeFrom = position;
	}
	
}