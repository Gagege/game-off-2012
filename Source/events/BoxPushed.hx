package events;

import models.Resource;
import nme.events.Event;

class BoxPushed extends Event
{
	public var resource(default, null):Resource;
	public var toLeft(default, null):Bool;
	public var hatch(default, null):Int;
	
	public function new(resourceInBox:Resource, direction:Bool, inHatch:Int, label:String, bubbles:Bool = false, cancelable:Bool = false) 
	{
		super(label, bubbles, cancelable);
		this.resource = resourceInBox;
		this.toLeft = direction;
		this.hatch = inHatch;
	}
	
}