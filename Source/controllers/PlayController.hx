package controllers;

import com.eclecticdesignstudio.motion.Actuate;
import events.BoxEvents;
import events.BoxPushed;
import events.RemoveBox;
import events.RobotEvent;
import events.RobotMove;
import events.SendBox;
import haxe.Timer;
import models.BoxTimer;
import models.Option;
import nme.events.KeyboardEvent;
import nme.Lib;
import views.PlayView;


class PlayController 
{
	var playView:PlayView;
	var boxTimer:BoxTimer;
	var gameDuration:Int;
	var millisecondsLeft:Int;
	
	var gameTimer:Timer;
	
	public static var boxSender:BoxEvents = new BoxEvents();
	public static var robotEvent:RobotEvent = new RobotEvent();
	
	public function new(options:Array<Option>) 
	{
		playView = new PlayView();
		
		Lib.current.addChild(playView);
		
		Lib.current.stage.addEventListener(KeyboardEvent.KEY_DOWN, onKeyDown);
		boxSender.addEventListener("SendBox", onSendBox);
		boxSender.addEventListener("RemoveBox", onRemoveBox);
		boxSender.addEventListener("BoxPushed", onBoxPushed);
		robotEvent.addEventListener("PushPull", onPushPull);
		
		playView.readySetGo();
		
		Timer.delay(function () {
			boxTimer = new BoxTimer();
			gameDuration = 120;
			gameTimer = new Timer(1000);
			onUpdateTime();
			gameTimer.run = function() { onUpdateTime(); }
		}, 5000);
	}
	
	private function onUpdateTime():Void 
	{
		if (gameDuration > 0)
		{
			playView.updateTime(gameDuration);
			gameDuration--;
		}
		else
		{
			gameTimer.stop();
			gameOver();
		}
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
			case 81: // 'Q' key
				playView.orderMenuUp(1);
			case 90: // 'Z' key
				playView.orderMenuDown(1);
			case 69: // 'E' key
				playView.selectOrder(1);
			case 39: // 'right arrow' key
				playView.playerMotion(2, Command.Right);
			case 37: // 'left arrow' key
				playView.playerMotion(2, Command.Left);
			case 38: // 'up arrow' key
				playView.playerMotion(2, Command.Up);
			case 40: // 'down arrow' key
				playView.playerMotion(2, Command.Down);
			case 79: // 'O' key
				playView.orderMenuUp(2);
			case 76: // 'L' key
				playView.orderMenuDown(2);
			case 80: // 'P' key
				playView.selectOrder(2);
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