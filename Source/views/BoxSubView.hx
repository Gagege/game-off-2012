package views;

import haxe.Timer;
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
	private var lithiumColor:Int = 0x0045E6;
	private var plutoniumColor:Int = 0x00E6A1;
	private var uraniumColor:Int = 0xB8E600;
	private var boxWidth:Float;
	private var moving:Bool;
	
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
		var destroyed:Bool = false;
		if (!moving)
		{
			moving = true;
			var newX:Float = x + (Lib.current.stage.stageWidth * 0.1);
			if (goLeft)
			{
				newX = x - (Lib.current.stage.stageWidth * 0.1);
			}
			Actuate.tween(this, RobotArmSubView.pushPullSpeed, { x: newX } )
				.ease(Linear.easeNone)
				.onComplete(setMoving, [false])
				.onComplete(PlayController.boxSender.pushed(resource, goLeft));
			
			destroyed = false;
		}
		else
		{
			Actuate.stop(this);
			moving = false;
			Actuate.tween(this, RobotArmSubView.pushPullSpeed, { scaleX: 0 } );
			
			destroyed = true;
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