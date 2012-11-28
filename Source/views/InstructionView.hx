package views;
import controllers.MenuController;
import events.MenuEvent;
import nme.Assets;
import nme.display.Sprite;
import nme.events.KeyboardEvent;
import nme.Lib;
import nme.text.TextField;
import nme.text.TextFormat;
import nme.ui.Keyboard;

class InstructionView extends Sprite
{

	public function new() 
	{
		super();
		initialize();
	}
	
	public function show():Void
	{
		this.visible = true;
	}
	
	public function hide():Void
	{
		this.visible = false;
	}
	
	private function initialize():Void 
	{
		drawStartGameMessage();
	}
	
	private function drawStartGameMessage():Void 
	{
		var titleDisplay = new TextField();
		var fontSize = Lib.current.stage.stageHeight * 0.05;
		var font = Assets.getFont("assets/Hyperspace.ttf");
		var format = new TextFormat (font.fontName, fontSize, 0x000000);
		
		titleDisplay.defaultTextFormat = format;
		titleDisplay.embedFonts = true;
		titleDisplay.selectable = false;
		
		titleDisplay.text = "Press any key to begin.";
		
		var displayX = (Lib.current.stage.stageWidth / 2) - ((titleDisplay.textWidth) / 2);
		var	displayY = Lib.current.stage.stageHeight * 0.9;
		
		titleDisplay.x = displayX;
		titleDisplay.y = displayY;
		
		addChild(titleDisplay);
	}
	
}