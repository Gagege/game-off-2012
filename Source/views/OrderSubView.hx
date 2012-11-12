package views;

import models.Order;
import nme.display.Sprite;
import nme.Lib;

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
			Lib.current.stage.stageWidth * 0.15,
			Lib.current.stage.stageHeight * 0.15);
		addChild(background);
	}
	
	private function drawBorder():Void 
	{
		var border:Sprite = new Sprite();
		border.graphics.clear();
		border.graphics.lineStyle(1, 0xFFFFFF, 0.2);
		DrawHelper.makeLineRect(
			border,
			0,
			0,
			Lib.current.stage.stageWidth * 0.15,
			Lib.current.stage.stageHeight * 0.15);
		addChild(border);
	}
	
	private function initialize(assignedOrder):Void 
	{
		order = assignedOrder;
		
		drawBackground();
		drawBorder();
	}
	
}