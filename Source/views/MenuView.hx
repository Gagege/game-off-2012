package views;

import models.Option;
import nme.display.Sprite;
import nme.Lib;
import nme.text.TextField;
import nme.text.TextFormat;
import com.eclecticdesignstudio.motion.Actuate;
import com.eclecticdesignstudio.motion.easing.Linear;

class MenuView extends Sprite
{
	private var options:Array<Option>;

	public function new(optionList:Array<Option>) 
	{
		super();
		options = optionList;
		initialize();
	}
	
	private function initialize():Void 
	{
		
		drawTitle();
		
		for(i in 0 ... options.length)
			drawOption(options[i], i);
		
		drawCursor();
	}
	
	private function drawTitle():Void 
	{
		var titleDisplay = new TextField();
		var fontSize = Lib.current.stage.stageHeight * 0.1;
		var format = new TextFormat (fontSize, 0x22FF22);
		
		titleDisplay.defaultTextFormat = format;
		titleDisplay.selectable = false;
		titleDisplay.embedFonts = true;
		
		titleDisplay.text = "Push/Pull Factory";
		
		var displayX = (Lib.current.stage.stageWidth / 2) - ((titleDisplay.textWidth) / 2);
		var	displayY = Lib.current.stage.stageHeight * 0.05;
		
		titleDisplay.x = displayX;
		titleDisplay.y = displayY;
		
		addChild(titleDisplay);
	}
	
	private function drawOption(option:Option, position:Int):Void 
	{
		var optionDisplay = new TextField();
		var fontSize = Lib.current.stage.stageHeight * 0.07;
		var format = new TextFormat (fontSize, 0x000000);
		
		optionDisplay.defaultTextFormat = format;
		optionDisplay.selectable = false;
		optionDisplay.embedFonts = true;
		
		optionDisplay.text = option.name;
		
		var displayX = (Lib.current.stage.stageWidth / 2) - (optionDisplay.textWidth / 2);
		var	displayY = Lib.current.stage.stageHeight * 0.1 * position + 
			(Lib.current.stage.stageHeight * 0.2);
		
		optionDisplay.x = displayX;
		optionDisplay.y = displayY;
		
		optionDisplay.name = option.name;
		
		addChild(optionDisplay);
		
		if (option.name == "1 Player")
			drawPlayerSelector(optionDisplay);
	}
	
	private function drawPlayerSelector(optionDisplay:TextField):Void 
	{
		var selector = new TextField();
		var fontSize = Lib.current.stage.stageHeight * 0.07;
		var format = new TextFormat (fontSize, 0x000000);
		
		selector.defaultTextFormat = format;
		selector.selectable = false;
		selector.embedFonts = true;
		
		selector.text = ">";
		
		var displayX = optionDisplay.x -
			selector.textWidth * 1.5;
		var	displayY = optionDisplay.y;
		
		selector.x = displayX;
		selector.y = displayY;
		
		addChild(selector);
	}
	
	private function drawCursor():Void 
	{
		var cursor = new TextField();
		var fontSize = Lib.current.stage.stageHeight * 0.07;
		var format = new TextFormat (fontSize, 0x000000);
		
		cursor.defaultTextFormat = format;
		cursor.selectable = false;
		cursor.embedFonts = true;
		
		cursor.text = "_";
		
		var startGameOption = getChildByName("Start Game");
		
		var displayX = startGameOption.x + startGameOption.width +
			(cursor.textWidth * 0.5);
		var	displayY = startGameOption.y;
		
		cursor.x = displayX;
		cursor.y = displayY;
		
		addChild(cursor);
		
		Actuate.tween(cursor, 0.75, { alpha: 0 } ).repeat().reflect().ease(Linear.easeNone);
	}
	
}