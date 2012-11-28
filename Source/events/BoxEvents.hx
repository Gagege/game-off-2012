package events;

import models.Resource;
import nme.events.EventDispatcher;

class BoxEvents extends EventDispatcher
{

	public function new() 
	{
		super();
	}
	
	public function send(resource:Resource, position:Int):Void
	{
		var event = new SendBox(resource, position, "SendBox");
		dispatchEvent(event);
	}
	
	public function remove(position:Int):Void
	{
		var event = new RemoveBox(position, "RemoveBox");
		dispatchEvent(event);
	}
	
	public function pushed(resource:Resource, toLeft:Bool, hatch:Int):Void 
	{
		var event = new BoxPushed(resource, toLeft, hatch, "BoxPushed");
		dispatchEvent(event);
	}
}