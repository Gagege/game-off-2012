package views;

import nme.Lib;
import nme.display.Sprite;

class RobotArmSubView extends Sprite
{
	
	private var rail:Sprite;
	private var arm:Sprite;
	private var grabber:Sprite;

	public function new(isRight:Bool) 
	{
		super();
		
		drawRail(isRight);
	}
	
	private function drawRail(isRight:Bool): Void
	{
		var railX:Float = Lib.current.stage.stageWidth * .20;

		if (isRight)
		{
			railX = opposite(railX);
		}
		
		rail = new Sprite();
		rail.graphics.clear();
		rail.graphics.lineStyle(Lib.current.stage.stageWidth * 0.01, 0x000000);
		rail = DrawHelper.makeLine(rail, railX, 0, railX, Lib.current.stage.stageHeight);
		addChild(rail);
	}
	
	private function opposite(value:Float):Float
	{
		var stageWidth = Lib.current.stage.stageWidth;
		return ((stageWidth / 2) - value) + (stageWidth / 2);
	}
	
}