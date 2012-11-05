package events;

import models.Resource;
import nme.events.EventDispatcher;

class RobotEvent extends EventDispatcher
{

	public function new() 
	{
		super();
	}
	
	public function push(fromRight:Bool, position:Int):Void
	{
		var event = new RobotMove(fromRight, position, "Push");
		dispatchEvent(event);
	}
	
	public function pull(fromRight:Bool, position:Int):Void
	{
		var event = new RobotMove(fromRight, position, "Pull");
		dispatchEvent(event);
	}
	
}