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
	private var speed:Float;

	public function new(isRightIn:Bool) 
	{
		super();
		
		isRight = isRightIn;
		
		vertical1Fourth = Lib.current.stage.stageHeight * 0.25;
		verticalCenter = Lib.current.stage.stageHeight * 0.5;
		vertical3Fourths = Lib.current.stage.stageHeight * 0.75;
		
		moving = false;
		
		speed = 0.2;
		
		homeX = Lib.current.stage.stageWidth * .20;

		if (isRight)
		{
			homeX = opposite(homeX);
		}
		
		drawArm(isRight);
	}
	
	public function forward():Void
	{
		if (!moving)
		{
			moving = true;
			var newX = arm.x + (Lib.current.stage.stageWidth * 0.1);
			
			if (isRight)
			{
				newX = arm.x - (Lib.current.stage.stageWidth * 0.1);
			}
			
			Actuate.tween(arm, speed,
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
				newX = arm.x + (Lib.current.stage.stageWidth * 0.1);
			}
			
			Actuate.tween(arm, speed,
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
			
			if (arm.y <= (verticalCenter * 1.3))
			{
				newY = vertical1Fourth;
			}
			Actuate.tween(arm, speed, { y: newY, x: homeX } )
					.onComplete(setMoving, [false]);
		}
		else
		{
			if ((arm.y > (verticalCenter * .7) &&
				arm.y < (verticalCenter * 1.3)) ||
				arm.y < (vertical1Fourth * 1.3) ||
				arm.y > (vertical3Fourths * .7))
			{
				Actuate.stop(arm);
				moving = false;
				up();
			}
		}
	}
	
	public function down():Void
	{
		if (!moving)
		{
			moving = true;
			var newY:Float = verticalCenter;
			
			if (arm.y >= (verticalCenter * .7))
			{
				newY = vertical3Fourths;
			}
			Actuate.tween(arm, speed, { y: newY, x: homeX } )
					.onComplete(setMoving, [false]);
		}
		else
		{
			if ((arm.y > (verticalCenter * .7) &&
				arm.y < (verticalCenter * 1.3)) ||
				arm.y < (vertical1Fourth * 1.3) ||
				arm.y > (vertical3Fourths * .7))
			{
				Actuate.stop(arm);
				moving = false;
				down();
			}
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
		armSegment.graphics.lineTo(armSegmentLength, 0);
		
		var joint = new Sprite();
		joint.graphics.clear();
		joint.graphics.beginFill(0xA100E6, 0.75);
		joint.graphics.drawRect(
			(jointWidth / 2) * -1,
			(jointWidth / 2) * -1,
			jointWidth, jointWidth);
			
		arm.addChild(armSegment);
		arm.addChild(joint);
		
		if (isRight)
			arm.scaleX = arm.scaleX * -1;
		
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