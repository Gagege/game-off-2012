package events;

import models.Resource;
import nme.events.Event;

class SendBox extends Event
{

	public var resource(default, null):Resource;
	public var deliverTo(default, null):Int;
	
	public function new(resourceInBox:Resource, destination:Int, label:String, bubbles:Bool = false, cancelable:Bool = false) 
	{
		super(label, bubbles, cancelable);
		this.resource = resourceInBox;
		this.deliverTo = destination;
	}
}