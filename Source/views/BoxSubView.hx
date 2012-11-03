package views;

import haxe.Timer;
import nme.geom.ColorTransform;
import nme.Lib;
import models.Resource;
import nme.display.Sprite;
import com.eclecticdesignstudio.motion.Actuate;

class BoxSubView extends Sprite
{
	public var resource(default, null):Resource;
	private var defaultColor:Int = 0xAAAAAA;
	private var lithiumColor:Int = 0x0045E6;
	private var plutoniumColor:Int = 0x00E6A1;
	private var uraniumColor:Int = 0xB8E600;
	private var boxWidth:Float;
	
	public function new(itemInBox:Resource) 
	{
		super();
		
		resource = itemInBox;
		
		boxWidth = Lib.current.stage.stageWidth * .08;
		
		drawBox(defaultColor);
		fadeBoxIn(7);
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
	
}