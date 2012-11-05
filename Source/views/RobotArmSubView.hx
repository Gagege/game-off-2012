package views;

import nme.Lib;
import events.RobotEvent;
import nme.display.Sprite;
import com.eclecticdesignstudio.motion.Actuate;

import DrawHelper;

class RobotArmSubView extends Sprite
{
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
			var pushPoint = homeX + (Lib.current.stage.stageWidth * 0.1);
			
			if (isRight)
			{
				newX = arm.x - (Lib.current.stage.stageWidth * 0.1);
				pushPoint = homeX - (Lib.current.stage.stageWidth * 0.1);
			}
			
			if (arm.x == pushPoint)
			{
				Actuate.tween(arm, speed * 3,
						{ x: newX } )
						.onComplete(firePushEvent);
			}
			else
			{
				Actuate.tween(arm, speed,
						{ x: newX } )
						.onComplete(setMoving, [false]);
			}
		}
	}
	
	public function back():Void
	{
		if (!moving)
		{
			if (arm.x != homeX) //if robot is home, don't move back
			{
				moving = true;
				var newX = arm.x - (Lib.current.stage.stageWidth * 0.1);
				var pushPoint = homeX + (Lib.current.stage.stageWidth * 0.1);
				
				if (isRight)
				{
					newX = arm.x + (Lib.current.stage.stageWidth * 0.1);
					pushPoint = homeX - (Lib.current.stage.stageWidth * 0.1);
				}
				
				
				if (arm.x == pushPoint)
				{
					Actuate.tween(arm, speed * 3,
							{ x: newX } )
							.onComplete(firePullEvent);
				}
				else
				{
					Actuate.tween(arm, speed,
							{ x: newX } )
							.onComplete(setMoving, [false]);
				}
			}
		}
	}
	
	public function up():Void
	{
		if (!moving)
		{
			moving = true;
			var newY:Float = DrawHelper.verticalCenter;
			
			if (arm.y <= (DrawHelper.verticalCenter * 1.3))
			{
				newY = DrawHelper.vertical1Fourth;
			}
			Actuate.tween(arm, speed, { y: newY, x: homeX } )
					.onComplete(setMoving, [false]);
		}
		else
		{
			if ((arm.y > (DrawHelper.verticalCenter * .7) &&
				arm.y < (DrawHelper.verticalCenter * 1.3)) ||
				arm.y < (DrawHelper.vertical1Fourth * 1.3) ||
				arm.y > (DrawHelper.vertical3Fourths * .7))
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
			var newY:Float = DrawHelper.verticalCenter;
			
			if (arm.y >= (DrawHelper.verticalCenter * .7))
			{
				newY = DrawHelper.vertical3Fourths;
			}
			Actuate.tween(arm, speed, { y: newY, x: homeX } )
					.onComplete(setMoving, [false]);
		}
		else
		{
			if ((arm.y > (DrawHelper.verticalCenter * .7) &&
				arm.y < (DrawHelper.verticalCenter * 1.3)) ||
				arm.y < (DrawHelper.vertical1Fourth * 1.3) ||
				arm.y > (DrawHelper.vertical3Fourths * .7))
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
		arm.y = DrawHelper.verticalCenter;
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
	
	private function firePushEvent():Void 
	{
		Actuate.tween(arm, speed, { x: homeX } )
				.onComplete(setMoving, [false]);
				
		var event = new RobotEvent();
		event.push(isRight);
	}
	
	private function firePullEvent():Void 
	{
		Actuate.tween(arm, speed, { x: homeX } )
				.onComplete(setMoving, [false]);
				
		var event = new RobotEvent();
		event.pull(isRight);
	}
}