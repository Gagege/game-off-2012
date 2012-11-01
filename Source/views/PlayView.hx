package views;

import haxe.Public;
import nme.Lib;
import nme.display.StageAlign;
import nme.display.StageScaleMode;
import nme.display.Sprite;

import DrawHelper;
import views.PlayerSubView;
import controllers.PlayController;

class PlayView extends Sprite
{
	var player1View:PlayerSubView;
    var player2View:PlayerSubView;
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
		
		player1View = new PlayerSubView(1);
		player2View = new PlayerSubView(2);
		
		addChild(player1View);
		addChild(player2View);
		
		drawBorder();
	}
	
	public function playerMotion(player:Int, command:Command):Void
	{
			switch(command)
			{
				case Right:
					(player == 1) ? player1View.robotForward() : player2View.robotBack();
				case Left:
					(player == 1) ? player1View.robotBack() : player2View.robotForward();
				case Up:
					(player == 1) ? player1View.robotUp() : player2View.robotUp();
				case Down:
					(player == 1) ? player1View.robotDown() : player2View.robotDown();
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