package ;

import nme.Lib;

class Player 
{	
	public function new(player:Int) 
	{
		initialize(player);
	}
	
	private function initialize(player:Int):Void
	{
		drawField(player);
	}
	
	private function drawField(player:Int):Void
	{
		var railX = 0;
		if (player == 1)
		{
			railX = Lib.current.stage.stageWidth * .20;
		}
		else
		{
			railX = Lib.current.stage.stageWidth * .80;
		}
	}
}