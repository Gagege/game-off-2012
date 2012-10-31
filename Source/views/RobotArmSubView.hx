package views;

import nme.Lib;
import nme.display.Sprite;
import com.eclecticdesignstudio.motion.Actuate;

class RobotArmSubView extends Sprite
{
	private var isRight:Bool;
	private var rail:Sprite;
	private var arm:Sprite;
	private var grabber:Sprite;
	private var homeX:Float;

	public function new(isRightIn:Bool) 
	{
		super();
		
		isRight = isRightIn;
		
		homeX = Lib.current.stage.stageWidth * .20;

		if (isRight)
		{
			homeX = opposite(homeX);
		}
		
		drawArm(isRight);
	}
	
	public function forward():Void
	{
		if (isRight)
		{
			Actuate.tween(arm, 1,
				{ x: arm.x - (Lib.current.stage.stageWidth * 0.1) } );
		}
		else
		{
			Actuate.tween(arm, 1,
				{ x: arm.x + (Lib.current.stage.stageWidth * 0.1) } );
		}
	}
	
	public function back():Void
	{
		if (isRight)
		{
			Actuate.tween(arm, 1,
				{ x: arm.x + (Lib.current.stage.stageWidth * 0.1) } );
		}
		else
		{
			Actuate.tween(arm, 1,
				{ x: arm.x - (Lib.current.stage.stageWidth * 0.1) } );
		}
	}
	
	private function drawArm(isRight:Bool):Void 
	{
		var verticalCenter:Float = Lib.current.stage.stageHeight / 2;
		arm = new Sprite();
		
		var armSegmentLength:Float = Lib.current.stage.stageWidth * .15;
		var armSegment = new Sprite();
		armSegment.graphics.clear();
		armSegment.graphics.lineStyle(Lib.current.stage.stageHeight * 0.01);
		armSegment.graphics.moveTo(homeX, verticalCenter);
		if (isRight)
		{
			armSegment.graphics.lineTo(homeX - armSegmentLength, verticalCenter);
		}
		else
		{
			armSegment.graphics.lineTo(homeX + armSegmentLength, verticalCenter);
		}
		
		var jointWidth:Float = Lib.current.stage.stageWidth * 0.015;
		var joint = new Sprite();
		joint.graphics.clear();
		joint.graphics.beginFill(0xA100E6, 0.75);
		joint.graphics.drawRect(
			homeX - (jointWidth / 2),
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