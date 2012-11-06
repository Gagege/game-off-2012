package models;

import haxe.Timer;
import controllers.PlayController;

class BoxTimer 
{
	
	public function new() 
	{
		var firstBox = new Resource();
		deliverToRandomPosition(firstBox);
		
	}
	
	private function deliverToRandomPosition(box:Resource):Void
	{
		var randomPosition = Math.round(Math.random() * 2) + 1; //Add one, so we never get 0
		PlayController.boxSender.send(box, randomPosition);
	}
	
}