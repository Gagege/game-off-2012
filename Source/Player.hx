package ;

import nme.display.Sprite;
import nme.Lib;

import DrawHelper;

class Player extends Sprite
{	
	public function new(player:Int) 
	{
		super();
		
		initialize(player);
	}
	
	private function initialize(player:Int):Void
	{
		drawField(player);
	}
	
	private function drawField(player:Int):Void
	{
		var railX:Float = 0.0;
		side:String = "";
		if (player == 1)
		{
			railX = Lib.current.stage.stageWidth * .20;
			side = "left";
		}
		else
		{
			railX = Lib.current.stage.stageWidth * .80;
			side = "right";
		}
		
		drawRail(railX);
		
		drawArm(railX, side);
	}
	
	private function drawRail(railX:Float):Void
	{
		var rail = new Sprite();
		rail.graphics.clear();
		rail.graphics.lineStyle(3.0, 0x000000);
		rail = DrawHelper.makeLine(rail, railX, 0, railX, Lib.current.stage.stageHeight);
		addChild(rail);
	}
	
	private function drawArm(railX:Float, side:String):Void 
	{
			if (side == "left")
			{
				
			}
			else if (side == "right")
			{
				
			}
	}
}