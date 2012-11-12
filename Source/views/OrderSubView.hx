package views;

import models.Order;
import nme.display.Sprite;
import nme.Lib;
import nme.text.TextField;
import nme.text.TextFormat;

class OrderSubView extends Sprite
{
	public var order(default, null):Order;
	public var selected(default, null):Bool;
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
		drawBackground(selected);
		drawBorder(selected);
	}
	
	private function drawBackground(selected:Bool):Void 
	{
		background.graphics.clear();
		if (selected)
		{
			background.graphics.beginFill(0x99ff99, 0.8);
		}
		else
		{
			background.graphics.beginFill(0xffffff, 0.5);
		}
		background.graphics.drawRect(
			0,
			0,
			Lib.current.stage.stageHeight * 0.05,
			Lib.current.stage.stageWidth * 0.05);
	}
	
	private function drawBorder(selected:Bool):Void 
	{
		border.graphics.clear();
		if (selected)
		{
			border.graphics.lineStyle(.8, 0xFFFFFF, 0.5);
		}
		else
		{
			border.graphics.lineStyle(.5, 0xFFFFFF, 0.2);
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
		var fontSize:Float = Lib.current.stage.stageHeight * 0.02;
		var format:TextFormat = new TextFormat (fontSize, 0xFFFFFF);
		
		
		var displayX = this.width + (Lib.current.stage.stageWidth * 0.01);
		var	displayY = 0;
		
		if (isRight)
		{
			displayX = -(order.name.length * (Lib.current.stage.stageWidth * 0.006));
		}
		
		var title = new TextField();
		
		title.x = displayX;
		title.y = displayY;
		
		title.defaultTextFormat = format;
		title.selectable = false;
		title.embedFonts = true;
		
		title.text = order.name;
		
		addChild(title);
	}
	
	private function initialize(assignedOrder:Order, isRight:Bool):Void 
	{
		order = assignedOrder;
		selected = false;
		
		background = new Sprite();
		drawBackground(false);
		addChild(background);
		
		border = new Sprite();
		drawBorder(false);
		addChild(border);
		
		drawTitle(isRight);
	}
	
}