package views;

import haxe.Public;
import haxe.Timer;
import models.Resource;
import nme.Lib;
import nme.display.StageAlign;
import nme.display.StageScaleMode;
import nme.display.Sprite;
import com.eclecticdesignstudio.motion.Actuate;
import nme.text.TextField;
import nme.text.TextFormat;
import nme.text.TextFormatAlign;

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
	var topBox:BoxSubView;
	var middleBox:BoxSubView;
	var bottomBox:BoxSubView;
	
	private var timeDisplay:TextField;
	private var format:TextFormat;
	
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
		
		drawTimeDisplay();
		
		drawBorder();
	}
	
	public function updateTime(secondsLeft:Float):Void 
	{
		var minutes:Int = Std.int(secondsLeft / 60);
		var seconds:Int = Std.int(secondsLeft - (minutes * 60));
		timeDisplay.text = minutes + ":" + (seconds < 10 ? "0" + seconds : seconds + "");
	}
	
	public function endGame():Void 
	{		
		if (player1.model.money > player2.model.money)
		{
			timeDisplay.text = "Player 1 Wins!";
		}
		else if (player2.model.money > player1.model.money)
		{
			timeDisplay.text = "Player 2 Wins!";
		}
		else
		{
			timeDisplay.text = "Wow... a tie.";
		}
	}
	
	public function moveBox(goLeft:Bool, inHatch:Int):Void
	{
		var box:BoxSubView = null;
		var hatchX:Float = 0;
		var hatchY:Float = 0;
		switch(inHatch)
		{
			case 1:
				box = hatch1.getBox();
				// the following if else is for when both robots want to push or pull a
				// single box. If the hatch doesn't have the box then we get the box
				// from the temporary storage, (topBox, middleBox, or bottomBox).
				if (box == null)
					box = topBox;
				else
				{
					box.name = "topBox";
					topBox = box;
				}
				hatchX = hatch1.x;
				hatchY = hatch1.y;
			case 2:
				box = hatch2.getBox();
				if (box == null)
					box = middleBox;
				else
				{
					box.name = "middleBox";
					middleBox = box;
				}
				hatchX = hatch2.x;
				hatchY = hatch2.y;
			case 3:
				box = hatch3.getBox();
				if (box == null)
					box = bottomBox;
				else
				{
					box.name = "bottomBox";
					bottomBox = box;
				}
				hatchX = hatch3.x;
				hatchY = hatch3.y;
		}
		
		if (box != null)
		{
			if (!box.pushed)
			{
				box.visible = false;
				//realign copy of box with hatch
				box.x = box.x + hatchX;
				box.y = box.y + hatchY;
				addChild(box);
				//set visible because we hid it before we recreated it
				box.visible = true;
			}
			slideBox(box, goLeft);
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
	
	public function removeBoxFromHatch(hatch:Int):Void 
	{
		switch(hatch)
		{
			case 1:
				hatch1.removeBox();
			case 2:
				hatch2.removeBox();
			case 3:
				hatch3.removeBox();
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
	
	public function absorbResource(resource:Resource, toLeft:Bool):Void 
	{
		if (toLeft)
		{
			player1.absorbResource(resource);
		}
		else
		{
			player2.absorbResource(resource);
		}
	}
	
	private function slideBox(box:BoxSubView, goLeft:Bool):Void 
	{
		var destroyed:Bool = false;
		destroyed = box.move(goLeft);
		if (!destroyed)
		{
			Timer.delay(callback(deleteBox, box), 1000);
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
	
	private function drawTimeDisplay():Void 
	{
		var fontSize = Lib.current.stage.stageHeight * 0.03;
		format = new TextFormat (fontSize, 0xFFFFFF);
		
		var displayX = Lib.current.stage.stageWidth * 0.473;
		var	displayY = Lib.current.stage.stageHeight * 0.95;
		
		timeDisplay = new TextField();
		
		timeDisplay.x = displayX;
		timeDisplay.y = displayY;
		
		timeDisplay.defaultTextFormat = format;
		timeDisplay.selectable = false;
		timeDisplay.embedFonts = true;
		
		timeDisplay.text = "2:00";
		
		addChild(timeDisplay);
	}
	
	private function deleteBox(box:BoxSubView):Void
	{
		if (box.name == "topBox")
			topBox = null;
		else if (box.name == "middleBox") 
			middleBox = null;
		else
			bottomBox = null;
			
		removeChild(getChildByName(box.name));
	}
	
}