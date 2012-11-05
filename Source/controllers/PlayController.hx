package controllers;

import events.BoxEvents;
import events.RobotEvent;
import events.SendBox;
import events.RobotMove;
import nme.events.Event;
import nme.Lib;
import nme.events.KeyboardEvent;
import views.PlayView;


class PlayController 
{
	var playView:PlayView;
	public static var boxSender:BoxEvents = new BoxEvents();
	public static var robotEvent:RobotEvent = new RobotEvent();
	
	public function new() 
	{
		playView = new PlayView();
		Lib.current.addChild(playView);
		
		Lib.current.stage.addEventListener(KeyboardEvent.KEY_DOWN, onKeyDown);
		boxSender.addEventListener("SendBox", onSendBox);
		robotEvent.addEventListener("Push", push);
		robotEvent.addEventListener("Pull", pull);
		
		boxSender.testSend();
		
	}
	
	private function push(event:RobotMove):Void
	{
		trace(event.fromRight);
	}
	
	private function pull(event:RobotMove):Void
	{
		trace(event.fromRight);
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
			case 39: // 'right arrow' key
				playView.playerMotion(2, Command.Right);
			case 37: // 'left arrow' key
				playView.playerMotion(2, Command.Left);
			case 38: // 'up arrow' key
				playView.playerMotion(2, Command.Up);
			case 40: // 'down arrow' key
				playView.playerMotion(2, Command.Down);
		}
	}
	
	private function onSendBox(event:SendBox):Void 
	{
		playView.deliverBoxToHatch(event.deliverTo, event.resource);
	}
}
	
enum Command
{
	Left;
	Right;
	Up;
	Down;
}