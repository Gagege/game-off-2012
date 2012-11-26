package models;
import controllers.PlayController;
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
			
			selectedMove = potentialMoves[potentialMoves.length - 1].move;
			
			thinking = false;
		}
		
		
	}
	
	private function getUpMove():{smartness:Int, move:Command}
	{
		var smartnessFactor = 0;
		
		if (player1Position == 2 && hatch1HasBox)
		{
			smartnessFactor += 2;
		}
		if (player1Position == 3)
		{
			if (hatch3HasBox)
				smartnessFactor += -1;
			if (hatch1HasBox)
				smartnessFactor += 1;
			if(hatch2HasBox)
				smartnessFactor += 2;
		}
		
		return {smartness: smartnessFactor, move: Command.Up};
	}
	
	private function getDownMove():{smartness:Int, move:Command}
	{
		var smartnessFactor = 0;
		
		if (player1Position == 2 && hatch3HasBox)
		{
			smartnessFactor += 2;
		}
		if (player1Position == 1)
		{
			if (hatch1HasBox)
				smartnessFactor += -1;
			if (hatch3HasBox)
				smartnessFactor += 1;
			if(hatch2HasBox)
				smartnessFactor += 2;
		}
		
		return {smartness: smartnessFactor, move: Command.Down};
	}
	
	private function getLeftMove():{smartness:Int, move:Command}
	{
		return null;
	}
	
	private function getRightMove():{smartness:Int, move:Command}
	{
		return null;
	}
	
	private function getDoNothingMove():{smartness:Int, move:Command}
	{
		return null;
	}
	
}