package events;

import nme.events.Event;

class RobotMove extends Event
{
	public var fromRight:Bool;
	
	public function new(fromRight:Bool, label:String, bubbles:Bool = false, cancelable:Bool = false) 
	{
		super(label, bubbles, cancelable);
		this.fromRight = fromRight;
	}
	
}