package views;

import models.Order;
import nme.display.Sprite;
import nme.Lib;
import nme.text.TextFormat;

class OrderSubView extends Sprite
{
	private var order:Order;
	
	public function new(assignedOrder:Order) 
	{
		super();
		initialize(assignedOrder);
	}
	
	private function drawBackground():Void 
	{
		var background:Sprite = new Sprite();
		background.graphics.clear();
		background.graphics.beginFill(0xffffff, 0.1);
		background.graphics.drawRect(
			0,
			0,
			Lib.current.stage.stageHeight * 0.05,
			Lib.current.stage.stageWidth * 0.05);
		addChild(background);
	}
	
	private function drawBorder():Void 
	{
		var border:Sprite = new Sprite();
		border.graphics.clear();
		border.graphics.lineStyle(.5, 0xFFFFFF, 0.2);
		DrawHelper.makeLineRect(
			border,
			0,
			0,
			Lib.current.stage.stageHeight * 0.05,
			Lib.current.stage.stageWidth * 0.05);
		addChild(border);
	}
	
	private function drawTitle():Void 
	{
		var fontSize:Float = Lib.current.stage.stageHeight * 0.01;
		var format:TextFormat = new TextFormat (fontSize, 0xFFFFFF);
		
		
		var displayX = this.width * 0.2;
		var	displayY = this.height * 0.02;
		
		var title = new TextField();
		
		title.x = displayX;
		title.y = displayY;
		
		title.defaultTextFormat = format;
		title.selectable = false;
		title.embedFonts = true;
		
		title.text = model.getFormattedMoney();
		
		addChild(title);
	}
	
	private function initialize(assignedOrder):Void 
	{
		order = assignedOrder;
		
		drawBackground();
		drawBorder();
		drawTitle();
	}
	
}