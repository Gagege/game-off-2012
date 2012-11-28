package controllers;

import com.eclecticdesignstudio.motion.Actuate;
import events.AIEvent;
import events.AIMove;
import events.BoxEvents;
import events.BoxPushed;
import events.MenuEvent;
import events.RemoveBox;
import events.RobotEvent;
import events.RobotMove;
import events.SendBox;
import events.StartGame;
import haxe.Timer;
import models.AIBrain;
import models.BoxTimer;
import models.Option;
import models.Order;
import models.Player;
import nme.events.KeyboardEvent;
import nme.Lib;
import views.BoxSubView;
import views.InstructionView;
import views.PlayView;


class PlayController 
{
	var player1AI:Bool;
	var brain:AIBrain;
	var playView:PlayView;
	var boxTimer:BoxTimer;
	var gameDuration:Int;
	var millisecondsLeft:Int;
	var gameTimer:Timer;
	var instructionsScreen:InstructionView;
	
	public static var boxSender:BoxEvents = new BoxEvents();
	public static var robotEvent:RobotEvent = new RobotEvent();
	public static var aiEvent:AIEvent = new AIEvent();
	public static var menuEvent:MenuEvent = new MenuEvent();
	
	public function new(options:Array<Option>)
	{
		for (option in options)
		{
			if (option.name == "1 Player")
				player1AI = option.selected;
		}
		
		instructionsScreen = new InstructionView();
		Lib.current.addChild(instructionsScreen);
		
		
		playView = new PlayView();
		if (player1AI)
		{
			brain = new AIBrain();
			brain.player1Position = 2;
			brain.player2Position = 2;
			for (option in options)
			{
				if (option.name == "Mercy")
					brain.mercy = option.selected;
			}
			aiEvent.addEventListener("AIMove", moveAIPlayer);
			updateResourcesForAI(
				playView.player1.model,
				playView.player2.model,
				playView.player1.currentOrder.model,
				playView.player2.currentOrder.model);
		}
		
		Lib.current.stage.addEventListener(KeyboardEvent.KEY_DOWN, onKeyDown);
		boxSender.addEventListener("SendBox", onSendBox);
		boxSender.addEventListener("RemoveBox", onRemoveBox);
		boxSender.addEventListener("BoxPushed", onBoxPushed);
		robotEvent.addEventListener("PushPull", onPushPull);
		menuEvent.addEventListener("StartGame", onStartGame);
	}
	
	private function onStartGame(event:StartGame):Void 
	{
		playView.readySetGo();
		
		Timer.delay(function () {
			boxTimer = new BoxTimer();
			gameDuration = 240;
			gameTimer = new Timer(1000);
			onUpdateTime();
			gameTimer.run = function() { onUpdateTime(); }
		}, 5000);
		
		Lib.current.addChild(playView);
	}
	
	private function onUpdateTime():Void 
	{
		if (gameDuration > 0)
		{
			gameDuration--;
			playView.updateTime(gameDuration);
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
		if (!player1AI)
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
			}
		}
		
		switch(event.keyCode)
		{
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
			case 13: // 'enter' key
				instructionsScreen.playerIsReady();
		}
	}
	
	private function moveAIPlayer(event:AIMove):Void 
	{
		playView.playerMotion(1, event.direction);
		if (brain != null)
		{
			brain.player1AtBox = playView.player1.robotArm.atPushPoint;
			brain.player1Position = playView.player1.robotArm.position;
		}
	}
	
	private function onSendBox(event:SendBox):Void 
	{
		playView.deliverBoxToHatch(event.deliverTo, event.resource);
		if (brain != null)
		{	Timer.delay(function(){
				Reflect.setField(brain, "hatch" + event.deliverTo + "HasBox", true);
			},
			Math.round(BoxSubView.fadeInSpeed * 250));
			Timer.delay(function() {
				var boxHatch = "hatch" + event.deliverTo + "Box";
				Reflect.setField(brain, boxHatch, event.resource);
			},
			Math.round(BoxSubView.fadeInSpeed * 400));
		}
	}
	
	private function onRemoveBox(event:RemoveBox):Void 
	{
		if (brain != null)
		{
			Reflect.setField(brain, "hatch" + event.removeFrom + "HasBox", false);
			Reflect.setField(brain, "hatch" + event.removeFrom + "Box", null);
			updateResourcesForAI(playView.player1.model, playView.player2.model,
				playView.player1.currentOrder.model, playView.player2.currentOrder.model);
		}
		playView.removeBoxFromHatch(event.removeFrom);
	}
	
	private function onPushPull(event:RobotMove):Void
	{
		playView.moveBox(event.moveLeft, event.position);
		if (brain != null)
		{
			Reflect.setField(brain, "hatch" + event.position + "HasBox", false);
			Reflect.setField(brain, "hatch" + event.position + "Box", null);
			updateResourcesForAI(playView.player1.model, playView.player2.model,
				playView.player1.currentOrder.model, playView.player2.currentOrder.model);
		}
	}
	
	private function onBoxPushed(event:BoxPushed):Void 
	{
		playView.absorbResource(event.resource, event.toLeft);
		if (brain != null)
		{
			Reflect.setField(brain, "hatch" + event.hatch + "HasBox", false);
			Reflect.setField(brain, "hatch" + event.hatch + "Box", null);
			updateResourcesForAI(playView.player1.model, playView.player2.model,
				playView.player1.currentOrder.model, playView.player2.currentOrder.model);
		}
	}
	
	private function updateResourcesForAI(player1:Player, player2:Player, player1Order:Order, player2Order:Order):Void
	{
		brain.player1LithiumCurrent = player1.lithium;
		brain.player1PlutoniumCurrent = player1.plutonium;
		brain.player1UraniumCurrent = player1.uranium;
		brain.player2LithiumCurrent = player2.lithium;
		brain.player2PlutoniumCurrent = player2.plutonium;
		brain.player2UraniumCurrent = player2.uranium;
		
		brain.player1LithiumRequired = player1Order.lithium;
		brain.player1PlutoniumRequired = player1Order.plutonium;
		brain.player1UraniumRequired = player1Order.uranium;
		brain.player2LithiumRequired = player2Order.lithium;
		brain.player2PlutoniumRequired = player2Order.plutonium;
		brain.player2UraniumRequired = player2Order.uranium;
	}
}
	
enum Command
{
	Left;
	Right;
	Up;
	Down;
	DoNothing;
}