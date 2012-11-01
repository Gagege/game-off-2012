package views;

import nme.Lib;
import nme.display.Sprite;
import com.eclecticdesignstudio.motion.Actuate;

class RobotArmSubView extends Sprite
{
	private var vertical1Fourth:Float;
	private var verticalCenter:Float;
	private var vertical3Fourths:Float;
	private var isRight:Bool;
	private var rail:Sprite;
	private var arm:Sprite;
	private var grabber:Sprite;
	private var homeX:Float;
	private var moving:Bool;

	public function new(isRightIn:Bool) 
	{
		super();
		
		vertical1Fourth = Lib.current.stage.stageHeight * 0.25;
		verticalCenter = Lib.current.stage.stageHeight * 0.5;
		vertical3Fourths = Lib.current.stage.stageHeight * 0.75;
		
		moving = false;
		
		trace("verticalCenter: " + verticalCenter);
		
		isRight = isRightIn;
		
		homeX = Lib.current.stage.stageWidth * .20;

		if (isRight)
		{
			homeX = opposite(homeX);
		}
		
		drawArm(isRight);
		
		trace("armY: " + arm.y);
	}
	
	public function forward():Void
	{
		if (!moving)
		{
			moving = true;
			var newX = arm.x + (Lib.current.stage.stageWidth * 0.1);
			
			if (isRight)
			{
				trace("isRight" + isRight);
				var newX = arm.x - (Lib.current.stage.stageWidth * 0.1);
			}
			
			Actuate.tween(arm, 1,
					{ x: newX } )
					.onComplete(setMoving, [false]);
		}
	}
	
	public function back():Void
	{
		if (!moving)
		{
			moving = true;
			var newX = arm.x - (Lib.current.stage.stageWidth * 0.1);
			if (isRight)
			{
				trace("isRight" + isRight);
				var newX = arm.x + (Lib.current.stage.stageWidth * 0.1);
			}
			
			Actuate.tween(arm, 1,
					{ x: newX } )
					.onComplete(setMoving, [false]);
		}
	}
	
	public function up():Void
	{
		if (!moving)
		{
			moving = true;
			var newY:Float = verticalCenter;
			
			if (arm.y <= verticalCenter)
			{
				newY = vertical1Fourth;
			}
			Actuate.tween(arm, 1, { y: newY } )
					.onComplete(setMoving, [false]);
		}
	}
	
	public function down():Void
	{
		if (!moving)
		{
			moving = true;
			var newY:Float = verticalCenter;
			
			if (arm.y >= verticalCenter)
			{
				newY = vertical3Fourths;
			}
			Actuate.tween(arm, 1, { y: newY } )
					.onComplete(setMoving, [false]);
		}
	}
	
	private function drawArm(isRight:Bool):Void 
	{
		arm = new Sprite();
		
		var jointWidth:Float = Lib.current.stage.stageWidth * 0.015;
		var armSegmentLength:Float = Lib.current.stage.stageWidth * .15;
		
		var armSegment = new Sprite();
		armSegment.graphics.clear();
		armSegment.graphics.lineStyle(Lib.current.stage.stageHeight * 0.01);
		armSegment.graphics.moveTo(jointWidth / 2, jointWidth / 2);
		if (isRight)
		{
			armSegmentLength *= -1;
		}
		armSegment.graphics.lineTo(armSegmentLength, jointWidth / 2);
		
		var joint = new Sprite();
		joint.graphics.clear();
		joint.graphics.beginFill(0xA100E6, 0.75);
		joint.graphics.drawRect(
			0,
			0,
			jointWidth, jointWidth);
			
		arm.addChild(armSegment);
		arm.addChild(joint);
		
		arm.x = homeX;
		arm.y = verticalCenter;
		addChild(arm);
	}
	
	private function opposite(value:Float):Float
	{
		var stageWidth = Lib.current.stage.stageWidth;
		return ((stageWidth / 2) - value) + (stageWidth / 2);
	}
	
	private function setMoving(isMoving:Bool)
	{
		moving = isMoving;
	}
	
}