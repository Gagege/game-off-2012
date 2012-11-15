package controllers;

import haxe.Timer;
import nme.Lib;
import nme.events.Event;
import nme.events.KeyboardEvent;
import com.eclecticdesignstudio.motion.Actuate;

import views.PlayView;
import models.BoxTimer;
import events.BoxEvents;
import events.RobotEvent;
import events.SendBox;
import events.RemoveBox;
import events.RobotMove;
import events.BoxPushed;

class PlayController 
{
	var playView:PlayView;
	var boxTimer:BoxTimer;
	var gameDuration:Int;
	var millisecondsLeft:Int;
	
	public static var boxSender:BoxEvents = new BoxEvents();
	public static var robotEvent:RobotEvent = new RobotEvent();
	
	public function new() 
	{
		playView = new PlayView();
		Lib.current.addChild(playView);
		
		Lib.current.stage.addEventListener(KeyboardEvent.KEY_DOWN, onKeyDown);
		boxSender.addEventListener("SendBox", onSendBox);
		boxSender.addEventListener("RemoveBox", onRemoveBox);
		boxSender.addEventListener("BoxPushed", onBoxPushed);
		robotEvent.addEventListener("PushPull", onPushPull);
		
		boxTimer = new BoxTimer();
		
		gameDuration = 3;
		var timer = new Timer(1000);
		timer.run = function() { onUpdateTime(); }
	}
	
	private function onUpdateTime():Void 
	{
		if (gameDuration > 0)
		{
			gameDuration--;
			playView.updateTime(gameDuration);
		}
		else
			gameOver();
	}
	
	private function gameOver():Void 
	{
		Actuate.pauseAll();
		
		Lib.current.stage.removeEventListener(KeyboardEvent.KEY_DOWN, onKeyDown);
		boxSender.removeEventListener("SendBox", onSendBox);
		boxSender.removeEventListener("RemoveBox", onRemoveBox);
		boxSender.removeEventListener("BoxPushed", onBoxPushed);
		robotEvent.removeEventListener("PushPull", onPushPull);
		
		playView.endGame();
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
	
	private function onRemoveBox(event:RemoveBox):Void 
	{
		playView.removeBoxFromHatch(event.removeFrom);
	}
	
	private function onPushPull(event:RobotMove):Void
	{
		playView.moveBox(event.moveLeft, event.position);
	}
	
	private function onBoxPushed(event:BoxPushed):Void 
	{
		playView.absorbResource(event.resource, event.toLeft);
	}
}
	
enum Command
{
	Left;
	Right;
	Up;
	Down;
}