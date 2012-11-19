package events;

import models.Option;
import nme.events.EventDispatcher;

class MenuEvent extends EventDispatcher
{

	public function new() 
	{
		super();
	}
	
	public function startGame(options:Array<Option>):Void 
	{
		var event = new StartGame(options, "StartGame");
		dispatchEvent(event);
	}
	
}