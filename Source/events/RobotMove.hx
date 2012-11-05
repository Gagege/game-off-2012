package events;

import nme.events.Event;

class RobotMove extends Event
{
	public var fromRight:Bool;
	public var position:Int;
	
	public function new(fromRight:Bool, position:Int, label:String, bubbles:Bool = false, cancelable:Bool = false) 
	{
		super(label, bubbles, cancelable);
		this.fromRight = fromRight;
		this.position = position;
	}
	
}