package events;

import nme.events.Event;

class RobotMove extends Event
{
	public var moveLeft:Bool;
	public var position:Int;
	
	public function new(moveLeft:Bool, position:Int, label:String, bubbles:Bool = false, cancelable:Bool = false) 
	{
		super(label, bubbles, cancelable);
		this.moveLeft = moveLeft;
		this.position = position;
	}
	
}