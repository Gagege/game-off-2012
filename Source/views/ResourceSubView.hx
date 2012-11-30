package views;

import controllers.MenuController;
import models.Player;
import models.Order;
import nme.Assets;
import nme.display.JointStyle;
import nme.display.Sprite;
import nme.filters.BlurFilter;
import nme.Lib;
import models.Resource;
import nme.media.Sound;
import nme.text.TextField;
import nme.text.TextFormat;

class ResourceSubView extends Sprite
{
	public var resourceType:String;
	public var resourceWidth:Float;
	
	private var resource:Sprite;
	private var progressBar:Sprite;
	private var progressBarSegments:Array<Sprite>;
	
	private var resourceGoodSound:Sound;
	private var resourceBadSound:Sound;
	
	public function new(type:ResourceType, player:Int) 
	{
		super();
		var color:Int;
		var symbolText:String;
		resourceWidth = Lib.current.stage.stageWidth * .08;
		
		switch(type)
		{
			case ResourceType.Lithium:
				color = BoxSubView.lithiumColor;
				symbolText = "Li";
				resourceType = "lithium";
			case ResourceType.Plutonium:
				color = BoxSubView.plutoniumColor;
				symbolText = "Pu";
				resourceType = "plutonium";
			case ResourceType.Uranium:
				color = BoxSubView.uraniumColor;
				symbolText = "U";
				resourceType = "uranium";
		}
		drawResource(color);
		drawSymbol(symbolText);
		drawProgressBar(player, color);
		resourceGoodSound = Assets.getSound("assets/resource_good.wav");
		resourceBadSound = Assets.getSound("assets/resource_bad.wav");
	}
	
	public function updateProgressBar(currentAmount:Int, amountRequired:Int):Void 
	{
		for (i in 0 ... progressBarSegments.length)
		{
			var segment = progressBarSegments[i];
			if(i + 1 > amountRequired)
			{
				hideSegment(segment);
				if(currentAmount > amountRequired && i + 1 <= currentAmount)
				{
					extraSegment(segment);
					if(!MenuController.mute)
						resourceBadSound.play();
				}
			}
			else if(i + 1 <= amountRequired)
			{
				emptySegment(segment);
				
				if(i + 1 <= currentAmount)
				{
					fillSegment(segment);
					if(!MenuController.mute)
						resourceGoodSound.play();
				}
			}
		}
	}
	
	private function drawResource(color:Int):Void 
	{
		resource = new Sprite();
		resource.graphics.beginFill(color, 1);
		resource.graphics.drawRect(
			0,
			0,
			resourceWidth,
			resourceWidth);
		addChild(resource);
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
		
		symbolText.x = (resource.width / 2) - (symbolText.textWidth / 2);
		symbolText.y = (resource.height / 2) - (symbolText.textHeight / 2);
		
		addChild(symbolText);
	}
	
	private function drawProgressBar(player:Int, color:Int):Void 
	{
		progressBar = new Sprite();
		progressBarSegments = new Array<Sprite>();
		
		var barY = resource.height * 1.02;
		
		progressBar.x = 0;
		progressBar.y = barY;
		
		for (i in 1 ... 20)
		{
			progressBar.addChild(drawProgressBarSegment(i, player, color));
		}
		addChild(progressBar);
	}
	
	private function drawProgressBarSegment(position:Int, player:Int, color:Int):Sprite 
	{
		var segment = new Sprite();
		var segmentBackground = new Sprite();
		segmentBackground.graphics.beginFill(0x000000);
		segmentBackground.graphics.drawRect(
			0,
			0,
			this.width * 0.13,
			this.width * 0.16);
		segmentBackground.alpha = 0;
		segmentBackground.name = "segmentBackground";
		
		var extraSegmentBackground = new Sprite();
		extraSegmentBackground.graphics.beginFill(0xFF0000);
		extraSegmentBackground.graphics.drawRect(
			0,
			0,
			this.width * 0.13,
			this.width * 0.16);
		extraSegmentBackground.alpha = 0;
		extraSegmentBackground.name = "extraSegmentBackground";
		
		var segmentBorder = new Sprite();
		segmentBorder.graphics.lineStyle(this.width * 0.01, 0x000000, 1);
		DrawHelper.makeLineRect(
			segmentBorder,
			0,
			0,
			this.width * 0.13,
			this.width * 0.16);
		segmentBorder.name = "segmentBorder";
		
		segment.addChild(segmentBackground);
		segment.addChild(extraSegmentBackground);
		segment.addChild(segmentBorder);
			
		segment.x = (segment.width * 1.2 * position) - (segment.width * 1.2);
		segment.y = 0;
		if (player == 2)
		{
			segment.x *= -1;
			segment.x = segment.x + resource.width - segment.width;
		}
		
		segment.alpha = 0;
		
		progressBarSegments.push(segment);
		
		return segment;
	}
	
	private function fillSegment(segment:Sprite):Void 
	{
		segment.alpha = 1;
		segment.getChildByName("segmentBackground").alpha = 1;
		segment.getChildByName("extraSegmentBackground").alpha = 0;
	}
	
	private function emptySegment(segment:Sprite):Void 
	{
		segment.alpha = 1;
		segment.getChildByName("segmentBackground").alpha = 0;
		segment.getChildByName("extraSegmentBackground").alpha = 0;
	}
	
	private function extraSegment(segment:Sprite):Void 
	{
		segment.alpha = 1;
		segment.getChildByName("segmentBackground").alpha = 0;
		segment.getChildByName("extraSegmentBackground").alpha = 1;
	}
	
	private function hideSegment(segment:Sprite):Void 
	{
		segment.alpha = 0;
	}
	
}