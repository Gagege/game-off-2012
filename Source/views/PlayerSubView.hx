package views;

import models.Player;
import models.Resource;
import nme.display.Sprite;
import nme.display.GradientType;
import nme.Lib;
import nme.text.TextField;
import nme.Assets;
import nme.text.TextFormat;
import nme.text.Font;

import DrawHelper;
import controllers.PlayController;

class PlayerSubView extends Sprite
{	
	var robotArm:RobotArmSubView;
	private var model:Player;
	private var lithiumDisplay:TextField;
	private var plutoniumDisplay:TextField;
	private var uraniumDisplay:TextField;
	private var font:Font;
	private var fontSize:Float;
	private var format:TextFormat;
	
	public function new(player:Int) 
	{
		super();
		
		initialize(player);
	}
	
	public function robotForward():Void
	{
		robotArm.forward();
	}
	
	public function robotBack():Void
	{
		robotArm.back();
	}
	
	public function robotUp():Void
	{
		robotArm.up();
	}
	
	public function robotDown():Void
	{
		robotArm.down();
	}
	
	public function absorbResource(resource:Resource):Void 
	{
		model.addResource(resource);
		updateField();
	}
	
	private function initialize(player:Int):Void
	{
		fontSize = Lib.current.stage.stageHeight * 0.03;
		format = new TextFormat (fontSize, 0xFFFFFF);
		
		drawField(player);
	}
	
	private function drawField(player:Int):Void
	{
		var isRight = true;
		
		if (player == 1)
		{
			isRight = false;
		}
		
		model = new Player(player);
		
		robotArm = new RobotArmSubView(isRight);
		
		addChild(robotArm);
		
		drawResourceMessages(player);
	}
	
	private function drawResourceMessages(player:Int):Void
	{
		var displayX = Lib.current.stage.stageWidth * 0.02;
		var	displayY = Lib.current.stage.stageHeight * 0.02;
		
		lithiumDisplay = new TextField();
		plutoniumDisplay = new TextField();
		uraniumDisplay = new TextField();
		
		if (player == 2)
		{
			displayX = Lib.current.stage.stageWidth * 0.85;
		}
		
		lithiumDisplay.x = displayX;
		lithiumDisplay.y = displayY;
		plutoniumDisplay.x = displayX;
		plutoniumDisplay.y = displayY * 3;
		uraniumDisplay.x = displayX;
		uraniumDisplay.y = displayY * 5;
		
		lithiumDisplay.defaultTextFormat = format;
		lithiumDisplay.selectable = false;
		lithiumDisplay.embedFonts = true;
		plutoniumDisplay.defaultTextFormat = format;
		plutoniumDisplay.selectable = false;
		plutoniumDisplay.embedFonts = true;
		uraniumDisplay.defaultTextFormat = format;
		uraniumDisplay.selectable = false;
		uraniumDisplay.embedFonts = true;
		
		lithiumDisplay.text = "Lithium: 0";
		plutoniumDisplay.text = "Plutonium: 0";
		uraniumDisplay.text = "Uranium: 0";
		
		addChild(lithiumDisplay);
		addChild(plutoniumDisplay);
		addChild(uraniumDisplay);
	}
	
	private function updateField():Void 
	{
		
		lithiumDisplay.text = "Lithium: " + model.lithium;
		plutoniumDisplay.text = "Plutonium: " + model.plutonium;
		uraniumDisplay.text = "Uranium: " + model.uranium;
	}
}