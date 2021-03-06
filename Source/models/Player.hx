package models;

class Player 
{

	public var number(default, null):Int;
	public var lithium(default, default):Int;
	public var plutonium(default, default):Int;
	public var uranium(default, default):Int;
	public var money(default, default):Int;
	
	public function new(playerNumber:Int) 
	{
		number = playerNumber;
		lithium = 0;
		plutonium = 0;
		uranium = 0;
		money = 0;
	}
	
	public function addResource(resource:Resource):Void 
	{
		switch(resource.type)
		{
			case ResourceType.Lithium:
				this.lithium += resource.quantity;
			case ResourceType.Plutonium:
				this.plutonium += resource.quantity;
			case ResourceType.Uranium:
				this.uranium += resource.quantity;
		}
	}
	
	public function getFormattedMoney():String
	{
		return Std.format("$$${money}");
	}
	
}