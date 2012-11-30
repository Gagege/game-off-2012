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
		drawBackground();
		drawInstructionsMessage();
		drawControlsMessage();
		drawCloseMessage();
	}
	
	private function drawBackground():Void 
	{
		var background = new Sprite();
		background.graphics.beginFill(0xFFFFFF, 1);
		background.graphics.drawRect(
		0,
		0,
		Lib.current.stage.stageWidth,
		Lib.current.stage.stageHeight);
		addChild(background);
	}
	
	private function drawInstructionsMessage():Void 
	{
		var instructions = new TextField();
		var fontSize = Lib.current.stage.stageHeight * 0.03;
		var font = Assets.getFont("assets/Hyperspace.ttf");
		var format = new TextFormat (font.fontName, fontSize, 0x000000);
		
		instructions.defaultTextFormat = format;
		instructions.embedFonts = true;
		instructions.selectable = false;
		
		instructions.text = 
		"Instructions:\n\n" +
		"Boxes will appear in the three hatches. " + 
		"Pull a box toward your area to collect it. " + 
		"Push a box toward your enemy to give it to him.\n\n" +
		"There is a list of three resources (lithium, " +
		"plutonium and uranium) in the upper corner or " +
		"your area. That is your current order. As soon " +
		"as you fulfill the order you will be paid and " +
		"the next order in your order queue (the three " + 
		"things in the lower corner of your area) will " +
		"be selected. Then, a new order will be added to " +
		"the bottom of your queue. If you fulfill the " + 
		"order with too many of any one resource, your " + 
		"pay will be docked!\n\n" +
		"The robot with the most cash at the end wins!";
		
		instructions.wordWrap = true;
		instructions.width = (Lib.current.stage.stageWidth / 2) * 0.95;
		
		var displayX = Lib.current.stage.stageWidth * 0.01;
		var	displayY = Lib.current.stage.stageHeight * 0.01;
		
		instructions.x = displayX;
		instructions.y = displayY;
		
		addChild(instructions);
	}
	
	private function drawControlsMessage():Void 
	{
		var instructions = new TextField();
		var fontSize = Lib.current.stage.stageHeight * 0.03;
		var font = Assets.getFont("assets/Hyperspace.ttf");
		var format = new TextFormat (font.fontName, fontSize, 0x000000);
		
		instructions.defaultTextFormat = format;
		instructions.embedFonts = true;
		instructions.selectable = false;
		
		instructions.text =
			"Controls:\n\n" +
			"Left player controls with the \nW, A, S and D keys, \n" + 
			"and \nQ and Z \nto highlight an order, \nE \nto select that order.\n\n" +
			"Right player controls with the \narrow keys, \n" + 
			"and \nO and L \nto highlight an order, \nP \nto select that order.";
		
		instructions.wordWrap = true;
		instructions.width = Lib.current.stage.stageWidth / 2;
		
		var displayX = Lib.current.stage.stageWidth / 2;
		var	displayY = Lib.current.stage.stageHeight * 0.01;
		
		instructions.x = displayX;
		instructions.y = displayY;
		
		addChild(instructions);
	}
	
	private function drawCloseMessage():Void 
	{
		var closeMessage = new TextField();
		var fontSize = Lib.current.stage.stageHeight * 0.03;
		var font = Assets.getFont("assets/Hyperspace.ttf");
		var format = new TextFormat (font.fontName, fontSize, 0x000000);
		
		closeMessage.defaultTextFormat = format;
		closeMessage.embedFonts = true;
		closeMessage.selectable = false;
		
		closeMessage.text = "Press enter to close.";
		
		var displayX = (Lib.current.stage.stageWidth / 2) - ((closeMessage.textWidth) / 2);
		var	displayY = Lib.current.stage.stageHeight * 0.9;
		
		closeMessage.x = displayX;
		closeMessage.y = displayY;
		
		addChild(closeMessage);
	}
	
}