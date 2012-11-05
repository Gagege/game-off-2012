package views;

import haxe.Public;
import models.Resource;
import nme.Lib;
import nme.display.StageAlign;
import nme.display.StageScaleMode;
import nme.display.Sprite;

import DrawHelper;
import views.BoxHatchSubView;
import views.PlayerSubView;
import controllers.PlayController;

class PlayView extends Sprite
{
	var player1:PlayerSubView;
    var player2:PlayerSubView;
	var hatch1:BoxHatchSubView;
	var hatch2:BoxHatchSubView;
	var hatch3:BoxHatchSubView;
	
	public function new() 
	{
		super();
		
		Lib.current.stage.align = StageAlign.TOP_LEFT;
		Lib.current.stage.scaleMode = StageScaleMode.NO_SCALE;
		
		drawBackground();
		
		hatch1 = new BoxHatchSubView(1);
		hatch2 = new BoxHatchSubView(2);
		hatch3 = new BoxHatchSubView(3);
		
		player1 = new PlayerSubView(1);
		player2 = new PlayerSubView(2);
		
		addChild(hatch1);
		addChild(hatch2);
		addChild(hatch3);
		
		addChild(player1);
		addChild(player2);
		
		drawBorder();
	}
	
	public function moveBox(goLeft:Bool, inHatch:Int):Void 
	{
		switch(inHatch)
		{
			case 1:
				hatch1.moveBox(goLeft);
			case 2:
				hatch2.moveBox(goLeft);
			case 3:
				hatch3.moveBox(goLeft);
		}
	}
	
	public function deliverBoxToHatch(hatch:Int, itemInBox:Resource):Void 
	{
		switch(hatch)
		{
			case 1:
				hatch1.deliverBox(new BoxSubView(itemInBox));
			case 2:
				hatch2.deliverBox(new BoxSubView(itemInBox));
			case 3:
				hatch3.deliverBox(new BoxSubView(itemInBox));
		}
	}
	
	public function playerMotion(player:Int, command:Command):Void
	{
		var hatchPushed:Int = 0;
		var hatchPulled:Int = 0;
		switch(command)
		{
			case Right:
				(player == 1) ? player1.robotForward() : player2.robotBack();
			case Left:
				(player == 1) ? player1.robotBack() : player2.robotForward();
			case Up:
				(player == 1) ? player1.robotUp() : player2.robotUp();
			case Down:
				(player == 1) ? player1.robotDown() : player2.robotDown();
		}
	}
	
	private function drawBackground():Void 
	{
		var background = new Sprite();
		background.graphics.clear();
		background.graphics.beginFill(0xE60045,0.60);
		background.graphics.drawRect(0, 0,
			Lib.current.stage.stageWidth,
			Lib.current.stage.stageHeight);
		addChild(background);
	}
	
	private function drawBorder():Void 
	{
		var outerBorder = new Sprite();
		outerBorder.graphics.clear();
		outerBorder.graphics.lineStyle(3.0, 0xE60045);
		outerBorder = DrawHelper.makeLineRect(outerBorder, 2, 2,
			Lib.current.stage.stageWidth - 3,
			Lib.current.stage.stageHeight - 3);
		addChild(outerBorder);
	}
	
}