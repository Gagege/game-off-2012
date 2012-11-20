package views;

import controllers.MenuController;
import controllers.PlayController;
import events.MenuEvent;
import models.Option;
import nme.Assets;
import nme.display.Sprite;
import nme.Lib;
import nme.text.TextField;
import nme.text.TextFormat;
import com.eclecticdesignstudio.motion.Actuate;
import com.eclecticdesignstudio.motion.easing.Linear;

class MenuView extends Sprite
{
	private var options:Array<Option>;
	public var selectedOptionIndex:Int;

	public function new(optionList:Array<Option>) 
	{
		super();
		options = optionList;
		initialize();
	}
	
	public function selectOption():Void 
	{
		
		options[selectedOptionIndex].selected = true;
		
		switch(options[selectedOptionIndex].name)
		{
			case "Start Game":
				MenuController.menuEvent.startGame(options);
			case "1 Player":
				playerSelectorTo(1);
				options[selectedOptionIndex + 1].selected = false; // set 2 player to false
			case "2 Player":
				playerSelectorTo(2);
				options[selectedOptionIndex - 1].selected = false; // set 1 player to false
			case "Instructions":
		}
	}
	
	public function cursorTo(optionIndex:Int):Void
	{
		var cursor = getChildByName("cursor");
		
		var optionDisplay = getChildByName(options[optionIndex].name);
		
		var displayX = optionDisplay.x + optionDisplay.width +
			(cursor.width * 0.35);
		var	displayY = optionDisplay.y;
		
		cursor.x = displayX;
		cursor.y = displayY;
		
		selectedOptionIndex = optionIndex;
	}
	
	public function hide():Void 
	{
		this.visible = false;
	}
	
	private function playerSelectorTo(numPlayers:Int):Void 
	{
		var selector = getChildByName("playerSelector");
		var playerOption = getChildByName(numPlayers + " Player");
		var	displayY = playerOption.y;
		
		selector.y = displayY;
	}
	
	private function initialize():Void 
	{
		
		drawTitle();
		
		for(i in 0 ... options.length)
			drawOption(options[i], i);
		
		drawCursor();
		selectedOptionIndex = 0;
	}
	
	private function drawTitle():Void 
	{
		var titleDisplay = new TextField();
		var fontSize = Lib.current.stage.stageHeight * 0.1;
		var font = Assets.getFont("assets/Hyperspace.ttf");
		var format = new TextFormat (font.fontName, fontSize, 0x000000);
		
		titleDisplay.defaultTextFormat = format;
		titleDisplay.embedFonts = true;
		titleDisplay.selectable = false;
		
		titleDisplay.text = "Push/Pull Factory";
		
		var displayX = (Lib.current.stage.stageWidth / 2) - ((titleDisplay.textWidth) / 2);
		var	displayY = Lib.current.stage.stageHeight * 0.05;
		
		titleDisplay.x = displayX;
		titleDisplay.y = displayY;
		
		titleDisplay.name = "title";
		
		addChild(titleDisplay);
	}
	
	private function drawOption(option:Option, position:Int):Void 
	{
		var optionDisplay = new TextField();
		var fontSize = Lib.current.stage.stageHeight * 0.07;
		var font = Assets.getFont("assets/Hyperspace.ttf");
		var format = new TextFormat (font.fontName, fontSize, 0x000000);
		
		optionDisplay.defaultTextFormat = format;
		optionDisplay.embedFonts = true;
		optionDisplay.selectable = false;
		
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
		var font = Assets.getFont("assets/Hyperspace.ttf");
		var format = new TextFormat (font.fontName, fontSize, 0x000000);
		
		selector.defaultTextFormat = format;
		selector.selectable = false;
		selector.embedFonts = true;
		
		selector.text = ">";
		
		var displayX = optionDisplay.x -
			selector.textWidth * 1.5;
		var	displayY = optionDisplay.y;
		
		selector.x = displayX;
		selector.y = displayY;
		
		selector.name = "playerSelector";
		
		addChild(selector);
	}
	
	private function drawCursor():Void 
	{
		var cursor = new TextField();
		var fontSize = Lib.current.stage.stageHeight * 0.07;
		var font = Assets.getFont("assets/Hyperspace.ttf");
		var format = new TextFormat (font.fontName, fontSize, 0x000000);
		
		cursor.defaultTextFormat = format;
		cursor.selectable = false;
		cursor.embedFonts = true;
		
		cursor.text = "_";
		
		var startGameOption = getChildByName("Start Game");
		
		var displayX = startGameOption.x + startGameOption.width +
			(cursor.textWidth * 0.35);
		var	displayY = startGameOption.y;
		
		cursor.x = displayX;
		cursor.y = displayY;
		
		cursor.name = "cursor";
		
		addChild(cursor);
		
		Actuate.tween(cursor, 0.1, { alpha: 0.25 } ).repeat().reflect().ease(Linear.easeNone);
	}
	
}