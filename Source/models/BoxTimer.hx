package models;

import haxe.Timer;
import controllers.PlayController;

class BoxTimer 
{
	
	public function new() 
	{
		setBoxTimer(1);
		setBoxTimer(2);
		setBoxTimer(3);
	}
	
	private function deliverToPosition(box:Resource, position:Int):Void
	{
		PlayController.boxSender.send(box, position);
	}
	
	private function removeFromPosition(position:Int):Void
	{
		PlayController.boxSender.remove(position);
	}
	
	private function setBoxTimer(position:Int):Void 
	{
		var box = new Resource();
		
		Timer.delay(
			callback(deliverAndSetRemoveTimer, box, position), 
			getRandomMillisecondsBelow(10000)
		);
	}
	
	private function deliverAndSetRemoveTimer(box:Resource, position:Int):Void 
	{
		deliverToPosition(box, position);
		Timer.delay(
			callback(removeAndSetCreateTimer, position),
			10000
		);
	}
	
	private function removeAndSetCreateTimer(position:Int):Void 
	{
		removeFromPosition(position);
		setBoxTimer(position);
	}
	
	private function getRandomMillisecondsBelow(ceiling:Int):Int
	{
		return Math.round(Math.random() * ceiling);
	}
	
}