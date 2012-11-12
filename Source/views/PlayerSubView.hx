package views;

import models.Player;
import models.Order;
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
	private var moneyDisplay:TextField;
	private var font:Font;
	private var fontSize:Float;
	private var format:TextFormat;
	private var orders:List<Order>;
	private var orderX:Float;
	private var firstOrderY:Float;
	
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
		orders = new List<Order>();
		orders.add(Order.getRandomOrder());
		orders.add(Order.getRandomOrder());
		orders.add(Order.getRandomOrder());
		
		fontSize = Lib.current.stage.stageHeight * 0.03;
		format = new TextFormat (fontSize, 0xFFFFFF);
		
		drawField(player);
	}
	
	private function drawField(player:Int):Void
	{
		var isRight = true;
		orderX = Lib.current.stage.stageWidth * 0.83;
		firstOrderY = Lib.current.stage.stageHeight * 0.2;
		
		if (player == 1)
		{
			isRight = false;
			orderX = Lib.current.stage.stageWidth * 0.02;
		}
		
		model = new Player(player);
		
		robotArm = new RobotArmSubView(isRight);
		
		addChild(robotArm);
		
		drawResourceMessages(player);
		drawMoneyMessage(player);
		
		var orderPositioner:Int = 1;
		for (order in orders)
		{
			var orderSprite:OrderSubView = new OrderSubView(order);
			orderSprite.x = orderX;
			orderSprite.y = firstOrderY + ((orderSprite.height + 10) * orderPositioner);
			addChild(orderSprite);
			orderPositioner++;
		}
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
	
	private function drawMoneyMessage(player:Int):Void 
	{
		var displayX = Lib.current.stage.stageWidth * 0.2;
		var	displayY = Lib.current.stage.stageHeight * 0.02;
		
		moneyDisplay = new TextField();
		
		if (player == 2)
		{
			displayX = Lib.current.stage.stageWidth * 0.7;
		}
		
		moneyDisplay.x = displayX;
		moneyDisplay.y = displayY;
		
		moneyDisplay.defaultTextFormat = format;
		moneyDisplay.selectable = false;
		moneyDisplay.embedFonts = true;
		
		moneyDisplay.text = model.getFormattedMoney();
		
		addChild(moneyDisplay);
	}
	
	private function updateField():Void 
	{
		moneyDisplay.text = model.getFormattedMoney();
		lithiumDisplay.text = Std.format("Lithium: ${model.lithium}");
		plutoniumDisplay.text = Std.format("Plutonium: ${model.plutonium}");
		uraniumDisplay.text = Std.format("Uranium: ${model.uranium}");
	}
}