package models;

import models.Resource;
import controllers.PlayController;
import events.AIEvent;
import haxe.Timer;
import views.PlayView;

class AIBrain 
{
	
	var timer:Timer;
	var potentialMoves:Array<{smartness:Int, move:Command}>;
	var thinking:Bool;
	
	public var hatch1HasBox(null, default):Bool;
	public var hatch2HasBox(null, default):Bool;
	public var hatch3HasBox(null, default):Bool;
	
	public var hatch1Box(null, default):Resource;
	public var hatch2Box(null, default):Resource;
	public var hatch3Box(null, default):Resource;
	
	public var player1Position(null, default):Int;
	public var player2Position(null, default):Int;
	
	public var player1LithiumRequired(null, default):Int;
	public var player1LithiumCurrent(null, default):Int;
	public var player1PlutoniumRequired(null, default):Int;
	public var player1PlutoniumCurrent(null, default):Int;
	public var player1UraniumRequired(null, default):Int;
	public var player1UraniumCurrent(null, default):Int;
	
	public var player2LithiumRequired(null, default):Int;
	public var player2LithiumCurrent(null, default):Int;
	public var player2PlutoniumRequired(null, default):Int;
	public var player2PlutoniumCurrent(null, default):Int;
	public var player2UraniumRequired(null, default):Int;
	public var player2UraniumCurrent(null, default):Int;
	
	public function new() 
	{
		timer = new Timer(500);
		timer.run = function() { think();}
	}
	
	private function think():Void 
	{
		var selectedMove:Command = null;
		if (!thinking)
		{
			thinking = true;
			potentialMoves = new Array<{smartness:Int, move:Command}>();
			
			potentialMoves.push(getUpMove());
			potentialMoves.push(getDownMove());
			potentialMoves.push(getLeftMove());
			potentialMoves.push(getRightMove());
			potentialMoves.push(getDoNothingMove());
			
			potentialMoves.sort(function(x, y) return x.smartness);
			
			
			selectedMove = potentialMoves[potentialMoves.length - 1].move;
			
			thinking = false;
		}
		var event = new AIEvent();
		PlayController.aiEvent.move(selectedMove);
	}
	
	private function calculateSmartnessBasedOnBox(box:Resource):Int
	{
		var smartness = 0;
		if (box != null)
		{
			Lambda.map(Type.getEnumConstructs(ResourceType), function (type):Void 
			{
				if (box.type == Type.createEnum(ResourceType, type))
				{
					if (Reflect.field(this, "player1" + type + "Current") <
						Reflect.field(this, "player1" + type + "Required"))
					{
						smartness += 2;
					}
					if (box.quantity + Reflect.field(this, "player1" + type + "Current") >
						Reflect.field(this, "player1" + type + "Required"))
					{
						smartness -= 1;
					}
				}
			});
		}
		return smartness;
	}
	
	private function getUpMove():{smartness:Int, move:Command}
	{
		var smartnessFactor = 0;
		
		if (player1Position == 2 && hatch1HasBox)
		{
			smartnessFactor += 2;
			smartnessFactor += calculateSmartnessBasedOnBox(hatch1Box);
		}
		if (player1Position == 3)
		{
			if (hatch3HasBox)
			{
				smartnessFactor += -1;
				smartnessFactor += calculateSmartnessBasedOnBox(hatch3Box);
			}
			if (hatch1HasBox)
			{
				smartnessFactor += 1;
				smartnessFactor += calculateSmartnessBasedOnBox(hatch1Box);
			}
			if(hatch2HasBox)
			{
				smartnessFactor += 2;
				smartnessFactor += calculateSmartnessBasedOnBox(hatch2Box);
			}
		}
		
		return {smartness: smartnessFactor, move: Command.Up};
	}
	
	private function getDownMove():{smartness:Int, move:Command}
	{
		var smartnessFactor = 0;
		
		if (player1Position == 2 && hatch3HasBox)
		{
			smartnessFactor += 2;
			smartnessFactor += calculateSmartnessBasedOnBox(hatch3Box);
		}
		if (player1Position == 1)
		{
			if (hatch1HasBox)
			{
				smartnessFactor += -1;
				smartnessFactor += calculateSmartnessBasedOnBox(hatch1Box);
			}
			if (hatch3HasBox)
			{
				smartnessFactor += 1;
				smartnessFactor += calculateSmartnessBasedOnBox(hatch3Box);
			}
			if(hatch2HasBox)
			{
				smartnessFactor += 2;
				smartnessFactor += calculateSmartnessBasedOnBox(hatch2Box);
			}
		}
		
		return {smartness: smartnessFactor, move: Command.Down};
	}
	
	private function getLeftMove():{smartness:Int, move:Command}
	{
		return {smartness: 0, move: Command.Left};
	}
	
	private function getRightMove():{smartness:Int, move:Command}
	{
		return {smartness: 0, move: Command.Right};
	}
	
	private function getDoNothingMove():{smartness:Int, move:Command}
	{
		var smartnessFactor = 0;
		
		smartnessFactor += 5;
		
		return {smartness: smartnessFactor, move: Command.DoNothing};
	}
	
}