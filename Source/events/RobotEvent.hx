package events;

import models.Resource;
import nme.events.EventDispatcher;

class RobotEvent extends EventDispatcher
{

	public function new() 
	{
		super();
	}
	
	public function push(fromRight:Bool):Void
	{
		var event = new RobotMove(fromRight, "push");
		dispatchEvent(event);
	}
	
	public function pull(fromRight:Bool):Void
	{
		var event = new RobotMove(fromRight, "pull");
		dispatchEvent(event);
	}
	
}