package views;

import models.Player;
import models.Order;
import nme.Assets;
import nme.display.Sprite;
import nme.filters.BlurFilter;
import nme.Lib;
import models.Resource;
import nme.text.TextField;
import nme.text.TextFormat;

class ResourceSubView extends Sprite
{
	private var resource:Sprite;
	private var progressBar:Sprite = new jeash.display.Sprite();
	private var progressBarSegments:Array<Sprite> = new Array<Sprite>();
	
	public function new(type:ResourceType, player:Int) 
	{
		super();
		var color:Int;
		var symbolText:String;
		
		switch(type)
		{
			case ResourceType.Lithium:
				color = BoxSubView.lithiumColor;
				symbolText = "Li";
			case ResourceType.Plutonium:
				color = BoxSubView.plutoniumColor;
				symbolText = "Pu";
			case ResourceType.Uranium:
				color = BoxSubView.uraniumColor;
				symbolText = "U";
		}
		drawResource(color);
		drawSymbol(symbolText);
	}
	
	private function drawResource(color:Int):Void 
	{
		resource = new Sprite();
		resource.graphics.beginFill(color, 1);
		resource.graphics.drawRect(
			0,
			0,
			Lib.current.stage.stageWidth * .08,
			Lib.current.stage.stageWidth * .08);
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
	
	public function drawProgressBar(currentAmount:Int, amountRequired:Int):Void 
	{
	}
	
}