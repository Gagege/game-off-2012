package views;

import haxe.Timer;
import nme.Assets;
import nme.filters.BlurFilter;
import nme.filters.DropShadowFilter;
import nme.geom.ColorTransform;
import nme.Lib;
import models.Resource;
import controllers.PlayController;
import nme.display.Sprite;
import com.eclecticdesignstudio.motion.Actuate;
import com.eclecticdesignstudio.motion.easing.Linear;
import nme.text.TextField;
import nme.text.TextFormat;

class BoxSubView extends Sprite
{
	public static var fadeInSpeed:Float;
	public var resource(default, null):Resource;
	public var pushed(default, null):Bool;
	private var defaultColor:Int = 0xCCCCCC;
	public static var lithiumColor:Int = 0xC9F8FF;
	public static var plutoniumColor:Int = 0xF8FFC9;
	public static var uraniumColor:Int = 0xFFC9F8;
	private var boxWidth:Float;
	private var moving:Bool;
	var destroyed:Bool;
	
	public function new(itemInBox:Resource) 
	{
		super();
		
		resource = itemInBox;
		fadeInSpeed = 7;
		
		boxWidth = Lib.current.stage.stageWidth * .08;
		
		moving = false;
		
		drawBox(defaultColor);
		fadeBoxIn(fadeInSpeed);
	}
	
	public function move(goLeft:Bool, hatch:Int):Bool
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
				.onComplete(firePushedEvent, [goLeft, hatch]);
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
		var symbolText:String = "";
		switch(resource.type)
		{
			case ResourceType.Lithium:
				boxColor = lithiumColor;
				symbolText = "Li";
			case ResourceType.Plutonium:
				boxColor = plutoniumColor;
				symbolText = "Pu";
			case ResourceType.Uranium:
				boxColor = uraniumColor;
				symbolText = "U";
		}
		
		drawBox(boxColor);
		fadeBoxIn(0.5, 0);
		if(resource.quantity > 1)
			drawAmount();
			
		drawSymbol(symbolText);
	}
	
	private function firePushedEvent(goLeft:Bool, hatch:Int):Void 
	{
		if (!destroyed)
		{
			PlayController.boxSender.pushed(resource, goLeft, hatch);
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
	
	private function drawSymbol(text:String):Void
	{
		var fontSize = Lib.current.stage.stageHeight * 0.05;
		var font = Assets.getFont("assets/Hyperspace.ttf");
		var format = new TextFormat (font.fontName, fontSize, 0x000000);
		
		var symbolText = new TextField();
		
		symbolText.defaultTextFormat = format;
		symbolText.selectable = false;
		symbolText.embedFonts = true;
		
		symbolText.text = text;
		
		symbolText.x = this.x - (symbolText.textWidth / 2);
		symbolText.y = this.y - (symbolText.textHeight / 2);
		
		addChild(symbolText);
	}
	
	private function drawAmount():Void 
	{
		var fontSize = Lib.current.stage.stageHeight * 0.02;
		var font = Assets.getFont("assets/Hyperspace.ttf");
		var format = new TextFormat (font.fontName, fontSize, 0x000000);
		
		var amountDisplay = new TextField();
		
		amountDisplay.defaultTextFormat = format;
		amountDisplay.selectable = false;
		amountDisplay.embedFonts = true;
		
		amountDisplay.text = "x" + resource.quantity;
		
		amountDisplay.x = this.x + boxWidth * 0.20;
		amountDisplay.y = this.y + boxWidth * 0.20;
		
		addChild(amountDisplay);
	}
	
	private function fadeBoxIn(speed:Float, delay:Float = 0):Void
	{
		Actuate.tween(this, speed, { alpha: 1 } ).delay(delay).ease(Linear.easeNone);
	}
	
	private function setMoving(isMoving:Bool)
	{
		moving = isMoving;
	}
	
}