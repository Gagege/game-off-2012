package views;

import haxe.Public;
import haxe.Timer;
import models.Resource;
import nme.Lib;
import nme.display.StageAlign;
import nme.display.StageScaleMode;
import nme.display.Sprite;
import com.eclecticdesignstudio.motion.Actuate;
import nme.media.Sound;
import nme.text.TextField;
import nme.text.TextFormat;
import nme.text.TextFormatAlign;
import nme.Assets;

import DrawHelper;
import views.BoxHatchSubView;
import views.PlayerSubView;
import controllers.PlayController;

class PlayView extends Sprite
{
	public var player1:PlayerSubView;
    public var player2:PlayerSubView;
	private var hatch1:BoxHatchSubView;
	private var hatch2:BoxHatchSubView;
	private var hatch3:BoxHatchSubView;
	private var topBox:BoxSubView;
	private var middleBox:BoxSubView;
	private var bottomBox:BoxSubView;
	
	private var timeDisplay:TextField;
	private var format:TextFormat;
	private var boxDestroySound:Sound;
	private var boxCollectSound:Sound;
	
	public function new() 
	{
		super();
		
		Lib.current.stage.align = StageAlign.TOP_LEFT;
		Lib.current.stage.scaleMode = StageScaleMode.NO_SCALE;
		
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
		
		boxCollectSound = Assets.getSound("assets/box_collect.wav");
	}
	
	public function readySetGo():Void 
	{
		setTimeTextAndAdjust("Ready?");
		Timer.delay(callback(setTimeTextAndAdjust, "3"), 1000);
		Timer.delay(callback(setTimeTextAndAdjust, "2"), 2000);
		Timer.delay(callback(setTimeTextAndAdjust, "1"), 3000);
		Timer.delay(callback(setTimeTextAndAdjust, "Go!"), 4000);
	}
	
	public function updateTime(secondsLeft:Float):Void 
	{
		var minutes:Int = Std.int(secondsLeft / 60);
		var seconds:Int = Std.int(secondsLeft - (minutes * 60));
		setTimeTextAndAdjust(minutes + ":" + (seconds < 10 ? "0" + seconds : seconds + ""));
	}
	
	private function setTimeTextAndAdjust(text:String):Void 
	{
		timeDisplay.text = text;
		timeDisplay.x = (Lib.current.stage.stageWidth / 2) - (timeDisplay.width / 2);
	}
	
	public function endGame():Void 
	{		
		darkenScreen();
		
		if (player1.model.money > player2.model.money)
		{
			drawGameOverMessage("Player 1\nmade more money.");
		}
		else if (player2.model.money > player1.model.money)
		{
			drawGameOverMessage("Player 2\nmade more money.");
		}
		else
		{
			drawGameOverMessage("It is a tie.");
		}
		
		drawResetMessage();
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
			slideBox(box, goLeft, inHatch);
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
			case DoNothing:
				return;
		}
	}
	
	public function orderMenuUp(player:Int):Void
	{
		if (player == 1)
		{
			player1.orderMenuUp();
		}
		else
		{
			player2.orderMenuUp();
		}
	}
	
	public function orderMenuDown(player:Int):Void
	{
		if (player == 1)
		{
			player1.orderMenuDown();
		}
		else
		{
			player2.orderMenuDown();
		}
	}
	
	public function selectOrder(player:Int):Void
	{
		if (player == 1)
		{
			player1.selectOrder();
		}
		else
		{
			player2.selectOrder();
		}
	}
	
	public function absorbResource(resource:Resource, toLeft:Bool):Void 
	{
		boxCollectSound.play();
		if (toLeft)
		{
			player1.absorbResource(resource);
		}
		else
		{
			player2.absorbResource(resource);
		}
	}
	
	private function slideBox(box:BoxSubView, goLeft:Bool, hatch:Int):Void 
	{
		var destroyed:Bool = false;
		destroyed = box.move(goLeft, hatch);
		if (!destroyed)
		{
			Timer.delay(callback(deleteBox, box), 500);
		}
	}
	
	private function drawTimeDisplay():Void 
	{
		var fontSize = Lib.current.stage.stageHeight * 0.08;
		var font = Assets.getFont("assets/Hyperspace.ttf");
		var format = new TextFormat (font.fontName, fontSize, 0x000000);
		
		timeDisplay = new TextField();
		
		timeDisplay.defaultTextFormat = format;
		timeDisplay.selectable = false;
		timeDisplay.embedFonts = true;
		
		timeDisplay.text = "2:00";
		
		var displayX = (Lib.current.stage.stageWidth / 2) - (timeDisplay.textWidth / 2);
		var	displayY = -4;
		
		timeDisplay.x = displayX;
		timeDisplay.y = displayY;
		
		addChild(timeDisplay);
	}
	
	private function darkenScreen():Void 
	{
		var darkener:Sprite = new Sprite();
		darkener.graphics.clear();
		darkener.graphics.beginFill(0x000000, 1);
		darkener.graphics.drawRect(0, 0,
			Lib.current.stage.stageWidth * 0.75,
			Lib.current.stage.stageHeight * 0.75);
			
		darkener.x = (Lib.current.stage.stageWidth / 2) - (darkener.width / 2);
		darkener.y = (Lib.current.stage.stageHeight / 2) - (darkener.height / 2);
		addChild(darkener);
	}
	
	private function drawGameOverMessage(message:String):Void 
	{
		var fontSize = Lib.current.stage.stageHeight * 0.08;
		var font = Assets.getFont("assets/Hyperspace.ttf");
		var format = new TextFormat (font.fontName, fontSize, 0xFFFFFF);
		
		var gameOverDisplay = new TextField();
		
		gameOverDisplay.defaultTextFormat = format;
		gameOverDisplay.selectable = false;
		gameOverDisplay.embedFonts = true;
		
		gameOverDisplay.text = message;
		
		var displayX = (Lib.current.stage.stageWidth / 2) - (gameOverDisplay.textWidth / 2);
		var	displayY = Lib.current.stage.stageHeight * 0.3;
		
		gameOverDisplay.x = displayX;
		gameOverDisplay.y = displayY;
		
		addChild(gameOverDisplay);
	}
	
	private function drawResetMessage():Void 
	{
		var fontSize = Lib.current.stage.stageHeight * 0.05;
		var font = Assets.getFont("assets/Hyperspace.ttf");
		var format = new TextFormat (font.fontName, fontSize, 0xFFFFFF);
		
		var resetMessage = new TextField();
		
		resetMessage.defaultTextFormat = format;
		resetMessage.selectable = false;
		resetMessage.embedFonts = true;
		
		resetMessage.text = "Refresh this page to play again.";
		
		var displayX = (Lib.current.stage.stageWidth / 2) - (resetMessage.textWidth / 2);
		var	displayY = Lib.current.stage.stageHeight * 0.6;
		
		resetMessage.x = displayX;
		resetMessage.y = displayY;
		
		addChild(resetMessage);
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