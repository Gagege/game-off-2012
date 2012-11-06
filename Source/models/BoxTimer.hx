package models;

import haxe.Timer;
import controllers.PlayController;

class BoxTimer 
{
	private var position1Timer:Timer;
	
	public function new() 
	{
		var firstBox = new Resource();
		deliverToPosition(firstBox, 1);
	}
	
	private function deliverToPosition(box:Resource, position:Int):Void
	{
		PlayController.boxSender.send(box, position);
		PlayController.boxSender.remove(position);
	}
	
}