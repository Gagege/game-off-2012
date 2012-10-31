package views;

import nme.Lib;
import nme.display.Sprite;

class RobotArmSubView extends Sprite
{
	
	private var rail:Sprite;
	private var arm:Sprite;
	private var grabber:Sprite;
	private var railX:Float;

	public function new(isRight:Bool) 
	{
		super();
		
		railX = Lib.current.stage.stageWidth * .20;

		if (isRight)
		{
			railX = opposite(railX);
		}
		
		drawRail(isRight);
		drawArm(isRight);
	}
	
	private function drawRail(isRight:Bool): Void
	{
		
		rail = new Sprite();
		rail.graphics.clear();
		rail.graphics.lineStyle(Lib.current.stage.stageWidth * 0.01, 0x000000);
		rail = DrawHelper.makeLine(rail, railX, 0, railX, Lib.current.stage.stageHeight);
		addChild(rail);
	}
	
	private function drawArm(isRight:Bool):Void 
	{
		var verticalCenter:Float = Lib.current.stage.stageHeight / 2;
		arm = new Sprite();
		
		var armSegmentLength:Float = Lib.current.stage.stageWidth * .15;
		var armSegment = new Sprite();
		armSegment.graphics.clear();
		armSegment.graphics.lineStyle(Lib.current.stage.stageHeight * 0.01);
		armSegment.graphics.moveTo(railX, verticalCenter);
		if (isRight)
		{
			armSegment.graphics.lineTo(railX - armSegmentLength, verticalCenter);
		}
		else
		{
			armSegment.graphics.lineTo(railX + armSegmentLength, verticalCenter);
		}
		
		var jointWidth:Float = Lib.current.stage.stageWidth * 0.015;
		var joint = new Sprite();
		joint.graphics.clear();
		joint.graphics.beginFill(0xA100E6, 0.75);
		joint.graphics.drawRect(
			railX - (jointWidth / 2),
			verticalCenter - (jointWidth / 2),
			jointWidth, jointWidth);
			
		arm.addChild(armSegment);
		arm.addChild(joint);
		
		addChild(arm);
	}
	
	private function opposite(value:Float):Float
	{
		var stageWidth = Lib.current.stage.stageWidth;
		return ((stageWidth / 2) - value) + (stageWidth / 2);
	}
	
}