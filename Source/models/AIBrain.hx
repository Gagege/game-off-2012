package models;
import controllers.PlayController;
import haxe.Timer;

class AIBrain 
{
	public var player1(null, default):Player;
	public var player2(null, default):Player;
	
	var timer:Timer;
	var potentialMoves:Array<{stupidity:Int, move:Command}>;
	
	public function new() 
	{
		timer = new Timer(500);
		timer.run = function() { think();}
	}
	
	private function think():Void 
	{
	}
	
}