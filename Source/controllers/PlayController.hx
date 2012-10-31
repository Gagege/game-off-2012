package controllers;

import nme.Lib;
import nme.events.KeyboardEvent;
import views.PlayView;


class PlayController 
{
	var playView:PlayView;
	
	public function new() 
	{
		playView = new PlayView();
		Lib.current.addChild(playView);
		
		Lib.current.stage.addEventListener(KeyboardEvent.KEY_DOWN, onKeyDown);
	}
	
	private function onKeyDown(event:KeyboardEvent):Void
	{
		switch(event.keyCode)
		{
			case 68: // 'D' key
				playView.playerMotion(1, Command.Right);
			case 65: // 'A' key
				playView.playerMotion(1, Command.Left);
			case 87: // 'W' key
				playView.playerMotion(1, Command.Up);
			case 83: // 'S' key
				playView.playerMotion(1, Command.Down);
		}
	}
}
	
enum Command
{
	Left;
	Right;
	Up;
	Down;
}