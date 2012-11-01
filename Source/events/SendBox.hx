package events;

import models.Resource;
import nme.events.Event;

class SendBox extends Event
{

	public var resource(default, null):Resource;
	
	public function new(resourceInBox:Resource, label:String, bubbles:Bool = false, cancelable:Bool = false) 
	{
		super(label, bubbles, cancelable);
		this.resource = resourceInBox;
	}
}