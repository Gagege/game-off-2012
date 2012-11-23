package views;

import controllers.PlayController;
import nme.Lib;
import events.RobotEvent;
import nme.display.Sprite;
import com.eclecticdesignstudio.motion.Actuate;
import com.eclecticdesignstudio.motion.easing.Linear;

import DrawHelper;

class RobotArmSubView extends Sprite
{
	public static var pushPullSpeed:Float;
	
	private var isRight:Bool;
	private var rail:Sprite;
	private var arm:Sprite;
	private var grabber:Sprite;
	private var homeX:Float;
	private var moving:Bool;
	private var speed:Float;
	private var position:Int;

	public function new(isRightIn:Bool) 
	{
		super();
		
		isRight = isRightIn;
		
		moving = false;
		
		speed = 0.1;
		
		pushPullSpeed = speed * 4;
		
		position = 2;
		
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
				firePushEvent();
				Actuate.tween(arm, pushPullSpeed,
							{ x: newX } )
						.onComplete(pushDone)
						.ease(Linear.easeNone);
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
		if (arm.x != homeX) //if robot is home, don't move back
		{
			if (!moving)
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
					firePullEvent();
					Actuate.tween(arm, pushPullSpeed,
								{ x: newX } )
							.onComplete(setMoving, [false])
							.ease(Linear.easeNone);
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
			position = 2;
			
			if (arm.y <= (DrawHelper.verticalCenter * 1.4))
			{
				position = 1;
				newY = DrawHelper.vertical1Fourth;
			}
			Actuate.tween(arm, speed, { y: newY, x: homeX } )
					.onComplete(setMoving, [false]);
		}
		else
		{
			if ((arm.y > (DrawHelper.verticalCenter * .6) &&
				arm.y < (DrawHelper.verticalCenter * 1.4)) ||
				arm.y < (DrawHelper.vertical1Fourth * 1.4) ||
				arm.y > (DrawHelper.vertical3Fourths * .6))
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
			position = 2;
			
			if (arm.y >= (DrawHelper.verticalCenter * .6))
			{
				position = 3;
				newY = DrawHelper.vertical3Fourths;
			}
			Actuate.tween(arm, speed, { y: newY, x: homeX } )
					.onComplete(setMoving, [false]);
		}
		else
		{
			if ((arm.y > (DrawHelper.verticalCenter * .6) &&
				arm.y < (DrawHelper.verticalCenter * 1.4)) ||
				arm.y < (DrawHelper.vertical1Fourth * 1.4) ||
				arm.y > (DrawHelper.vertical3Fourths * .6))
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
		if (isRight) armSegmentLength = -armSegmentLength;
		armSegment.graphics.lineTo(armSegmentLength, 0);
			
		arm.addChild(armSegment);
		
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
		var moveLeft:Bool = false;
		
		if (isRight)
			moveLeft = true;
			
		PlayController.robotEvent.pushPull(moveLeft, position);
	}
	
	private function firePullEvent():Void 
	{
		var moveLeft:Bool = true;
		
		if (isRight)
			moveLeft = false;
			
		PlayController.robotEvent.pushPull(moveLeft, position);
	}
	
	private function pushDone():Void 
	{
		Actuate.tween(arm, speed, { x: homeX } )
				.onComplete(setMoving, [false]);
	}
}