package views;

import haxe.Timer;
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

// This class ain't pretty.
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
	private var orderSprites:Array<OrderSubView>;
	private var orderX:Float;
	private var yPositions:Array<Float>;
	private var selectingOrder:Bool;
	private var currentOrder:OrderSubView;
	private var isRight:Bool;
	
	public function new(player:Int) 
	{
		super();
		
		initialize(player);
	}
	
	public function robotForward():Void
	{
		//if selecting order, select cursored order and clear previous selection
		if (selectingOrder)
		{
			selectingOrder = false;
			for (order in orderSprites)
			{
				order.select(false);
				
				if (order.cursored)
				{
					order.select(true);
					currentOrder = order;
				}
					
				order.cursorTo(false);
			}
			isOrderFulfilled(currentOrder);
		}
		else //otherwise move arm
		{
			robotArm.forward();
		}
	}
	
	public function robotBack():Void
	{
		//only move back if not currently selecting order, otherwise do nothing
		if (!selectingOrder)
		{
			//if arm doesn't move, that means the user wants to select an order.
			var moved = robotArm.back();
			if (!moved)
			{
				selectingOrder = true;
				for (order in orderSprites)
				{
					if (order.selected)
					{
						order.cursorTo(true);
					}
				}
			}
		}
	}
	
	public function robotUp():Void
	{
		//if selecting order, move cursor up unless already at order[0]
		if (selectingOrder)
		{
			for (i in 0 ... orderSprites.length)
			{
				if (orderSprites[i].cursored && i > 0)
				{
					orderSprites[i].cursorTo(false);
					orderSprites[i - 1].cursorTo(true);
					currentOrder = orderSprites[i - 1];
					updateField();
					break;
				}
			}
		}
		else //otherwise move arm
		{
			robotArm.up();
		}
	}
	
	public function robotDown():Void
	{
		//if selecting order, move cursor down unless already at order[2]
		if (selectingOrder)
		{
			for (i in 0 ... orderSprites.length)
			{
				if (orderSprites[i].cursored && i < 2)
				{
					orderSprites[i].cursorTo(false);
					orderSprites[i + 1].cursorTo(true);
					currentOrder = orderSprites[i + 1];
					updateField();
					break;
				}
			}
		}
		else //otherwise move arm
		{
			robotArm.down();
		}
	}
	
	public function absorbResource(resource:Resource):Void 
	{
		model.addResource(resource);
		isOrderFulfilled(currentOrder);
	}
	
	private function initialize(player:Int):Void
	{
		fontSize = Lib.current.stage.stageHeight * 0.03;
		format = new TextFormat (fontSize, 0xFFFFFF);
		
		drawField(player);
	}
	
	private function drawField(player:Int):Void
	{
		isRight = true;
		orderX = Lib.current.stage.stageWidth * 0.94;
		
		if (player == 1)
		{
			isRight = false;
			orderX = Lib.current.stage.stageWidth * 0.02;
		}
		
		model = new Player(player);
		
		robotArm = new RobotArmSubView(isRight);
		
		addChild(robotArm);
		
		drawOrders();
		drawResourceMessages(player);
		drawMoneyMessage(player);
		
		updateField();
	}
	private function drawOrders():Void 
	{
		orderSprites = new Array<OrderSubView>();
		
		var orders = new Array<Order>();
		orders.push(Order.getRandomOrder());
		orders.push(Order.getRandomOrder());
		orders.push(Order.getRandomOrder());
		
		yPositions = new Array<Float>();
		
		var orderPositioner:Int = 1;
		for (order in orders)
		{
			drawOrder(order, orderPositioner);
			orderPositioner++;
		}
		orderSprites[0].select(true);
		currentOrder = orderSprites[0];
	}
	
	private function drawOrder(order:Order, position:Int):Void 
	{
		var orderSprite:OrderSubView = new OrderSubView(order, isRight);
		
		if (yPositions == null || yPositions.length < 3)
		{
			yPositions.push((Lib.current.stage.stageHeight * 0.6) + 
				(orderSprite.height + Lib.current.stage.stageHeight * 0.02) * position);
		}
		
		orderSprite.x = orderX;
		orderSprite.y = yPositions[position - 1]; // position - 1 is to match position to it's index in yPositions
		addChild(orderSprite);
		orderSprites.push(orderSprite);
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
			displayX = Lib.current.stage.stageWidth * 0.78;
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
		
		addChild(lithiumDisplay);
		addChild(plutoniumDisplay);
		addChild(uraniumDisplay);
	}
	
	private function drawMoneyMessage(player:Int):Void 
	{
		var displayX = Lib.current.stage.stageWidth * 0.3;
		var	displayY = Lib.current.stage.stageHeight * 0.02;
		
		moneyDisplay = new TextField();
		
		if (player == 2)
		{
			displayX = Lib.current.stage.stageWidth * 0.65;
		}
		
		moneyDisplay.x = displayX;
		moneyDisplay.y = displayY;
		
		moneyDisplay.defaultTextFormat = format;
		moneyDisplay.selectable = false;
		moneyDisplay.embedFonts = true;
		
		moneyDisplay.text = model.getFormattedMoney();
		
		addChild(moneyDisplay);
	}
	
	private function orderFulfilled(orderSprite:OrderSubView):Void 
	{
		model.money += orderSprite.model.money;
		model.lithium = 0;
		model.plutonium = 0;
		model.uranium = 0;
		
		orderSprites.remove(orderSprite);
		removeChild(orderSprite);
		for (i in 0 ... orderSprites.length) 
		{
			orderSprites[i].y = yPositions[i];
		}
		currentOrder = orderSprites[0];
		currentOrder.select(true);
		
		drawOrder(Order.getRandomOrder(), 3);
	}
	
	private function isOrderFulfilled(orderSprite:OrderSubView):Void 
	{
		if (orderSprite.isOrderFulfilled(model.lithium, model.plutonium, model.uranium) &&
			!selectingOrder)
		{
			orderFulfilled(orderSprite);
		}
		
		updateField();
	}
	
	private function updateField():Void 
	{
		moneyDisplay.text = model.getFormattedMoney();
		lithiumDisplay.text = Std.format("Lithium: ${model.lithium} OF ${currentOrder.model.lithium}");
		plutoniumDisplay.text = Std.format("Plutonium: ${model.plutonium} OF ${currentOrder.model.plutonium}");
		uraniumDisplay.text = Std.format("Uranium: ${model.uranium} OF ${currentOrder.model.uranium}");
	}
}