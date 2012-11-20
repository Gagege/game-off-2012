package views;

import models.Order;
import nme.display.Sprite;
import nme.Lib;
import nme.Assets;
import nme.text.TextField;
import nme.text.TextFormat;
import nme.text.TextFormatAlign;

class OrderSubView extends Sprite
{
	public var model(default, null):Order;
	public var selected(default, null):Bool;
	public var cursored(default, null):Bool;
	private var border:Sprite;
	private var background:Sprite;
	
	public function new(assignedOrder:Order, isRight:Bool) 
	{
		super();
		initialize(assignedOrder, isRight);
	}
	
	public function select(selected:Bool):Void
	{
		this.selected = selected;
		drawBorder();
	}
	
	public function cursorTo(cursorTo:Bool):Void 
	{
		this.cursored = cursorTo;
		drawBorder();
	}
	
	public function isOrderFulfilled(amountLithium:Int, amountPlutonium:Int, amountUranium:Int):Bool
	{
		var fulfilled:Bool = false;
		
		if (amountLithium >= model.lithium &&
			amountPlutonium >= model.plutonium &&
			amountUranium >= model.uranium)
		{
			fulfilled = true;
		}
		
		if (fulfilled)
		{
			model.money -= (amountLithium - model.lithium) * 10;
			model.money -= (amountPlutonium - model.plutonium) * 50;
			model.money -= (amountUranium - model.uranium) * 100;
		}
		
		return fulfilled;
	}
	
	private function drawBorder():Void 
	{
		border.graphics.clear();
		
		if (this.cursored)
		{
			border.graphics.lineStyle(3, 0x000000, 1);
		}
		else if (this.selected)
		{
			border.graphics.lineStyle(2, 0x000000, 1);
		}
		else
		{
			border.graphics.lineStyle(1, 0x000000, 0.5);
		}
		
		DrawHelper.makeLineRect(
			border,
			0,
			0,
			Lib.current.stage.stageHeight * 0.05,
			Lib.current.stage.stageWidth * 0.05);
	}
	
	private function drawTitle(isRight:Bool):Void 
	{
		var fontSize:Float = Lib.current.stage.stageHeight * 0.03;
		var font = Assets.getFont("assets/Hyperspace.ttf");
		var format = new TextFormat (font.fontName, fontSize, 0x000000);
		
		var title = new TextField();
		title.defaultTextFormat = format;
		title.selectable = false;
		title.embedFonts = true;
		title.text = model.name;
		
		var displayX = this.width + (Lib.current.stage.stageWidth * 0.01);
		var	displayY = (this.height / 2) - (title.textHeight / 2);
		
		if (isRight)
		{
			displayX = -(title.textWidth + Lib.current.stage.stageWidth * 0.01);
		}
		
		title.x = displayX;
		title.y = displayY;
		
		addChild(title);
	}
	
	private function initialize(assignedOrder:Order, isRight:Bool):Void 
	{
		model = assignedOrder;
		selected = false;
		
		background = new Sprite();
		addChild(background);
		
		border = new Sprite();
		drawBorder();
		addChild(border);
		
		drawTitle(isRight);
	}
	
}