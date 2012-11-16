package views;

import haxe.Timer;
import nme.filters.GlowFilter;
import nme.geom.ColorTransform;
import nme.Lib;
import models.Resource;
import controllers.PlayController;
import nme.display.Sprite;
import com.eclecticdesignstudio.motion.Actuate;
import com.eclecticdesignstudio.motion.easing.Linear;

class BoxSubView extends Sprite
{
	public var resource(default, null):Resource;
	public var pushed(default, null):Bool;
	private var defaultColor:Int = 0xAAAAAA;
	public static var lithiumColor:Int = 0x5287E3;
	public static var plutoniumColor:Int = 0x00E6A1;
	public static var uraniumColor:Int = 0xB8E600;
	private var boxWidth:Float;
	private var moving:Bool;
	var destroyed:Bool;
	
	public function new(itemInBox:Resource) 
	{
		super();
		
		resource = itemInBox;
		
		boxWidth = Lib.current.stage.stageWidth * .08;
		
		moving = false;
		
		drawBox(defaultColor);
		fadeBoxIn(7);
	}
	
	public function move(goLeft:Bool):Bool
	{
		pushed = true;
		if (!moving)
		{
			destroyed = false;
			moving = true;
			var newX:Float = x + (Lib.current.stage.stageWidth * 0.1);
			if (goLeft)
			{
				newX = x - (Lib.current.stage.stageWidth * 0.1);
			}
			Actuate.tween(this, RobotArmSubView.pushPullSpeed, { x: newX } )
				.ease(Linear.easeNone)
				.onComplete(setMoving, [false]);
			Actuate.timer(RobotArmSubView.pushPullSpeed)
				.onComplete(firePushedEvent, [goLeft]);
		}
		else
		{
			destroyed = true;
			moving = false;
			var scale:Float = 0;
			if ((x < Lib.current.stage.stageWidth / 2 && !goLeft) ||
				(x > Lib.current.stage.stageWidth / 2 && goLeft))
			{
				scale = 3;
			}
			Actuate.stop(this, null, false, false);
			
			Actuate.tween(this, RobotArmSubView.pushPullSpeed, { scaleX: scale } )
				.ease(Linear.easeNone);
		}
		return destroyed;
	}
	
	public function changeBoxColor():Void 
	{
		var boxColor:Int = 0;
		switch(resource.type)
		{
			case ResourceType.Lithium:
				boxColor = lithiumColor;
			case ResourceType.Plutonium:
				boxColor = plutoniumColor;
			case ResourceType.Uranium:
				boxColor = uraniumColor;
		}
		
		drawBox(boxColor);
		fadeBoxIn(.5, 0);
	}
	
	private function firePushedEvent(goLeft:Bool):Void 
	{
		if (!destroyed)
		{
			PlayController.boxSender.pushed(resource, goLeft);
		}
	}
	
	private function drawBox(fillColor:Int):Void 
	{
		this.graphics.beginFill(fillColor, 1);
		this.graphics.drawRect(
			(boxWidth / 2) * -1,
			(boxWidth / 2) * -1,
			boxWidth,
			boxWidth);
		this.alpha = 0;
	}
	
	private function fadeBoxIn(speed:Float, delay:Float = 0):Void
	{
		Actuate.tween(this, speed, { alpha: 1 } ).delay(delay);
	}
	
	private function setMoving(isMoving:Bool)
	{
		moving = isMoving;
	}
	
}