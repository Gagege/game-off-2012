package events;

import models.Option;
import nme.events.EventDispatcher;
import events.ToggleInstructions;

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
	
	public function toggleInstructions():Void 
	{
		var event = new ToggleInstructions("ToggleInstructions");
		dispatchEvent(event);
	}
	
}