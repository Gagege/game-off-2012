package events;

import models.Resource;
import nme.events.EventDispatcher;

class RobotEvent extends EventDispatcher
{

	public function new() 
	{
		super();
	}
	
	public function pushPull(moveLeft:Bool, position:Int):Void
	{
		var event = new RobotMove(moveLeft, position, "PushPull");
		dispatchEvent(event);
	}
	
}