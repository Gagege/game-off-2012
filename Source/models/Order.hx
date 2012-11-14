package models;

class Order 
{

	public var name(default, null):String;
	public var lithium(default, null):Int;
	public var plutonium(default, null):Int;
	public var uranium(default, null):Int;
	public var money:Int;
	
	public function new(orderName:String, amountLithium:Int, amountPlutonium:Int, amountUranium:Int, worth:Int) 
	{
		name = orderName;
		lithium = amountLithium;
		plutonium = amountPlutonium;
		uranium = amountUranium;
		money = worth;
	}
	
	public static function getRandomOrder():Order 
	{
		var amountLithium:Int = Math.round(Math.random() * 13);
		var amountPlutonium:Int = Math.round(Math.random() * 6);
		var amountUranium:Int = Math.round(Math.random() * 2);
		
		var worth:Int = (amountLithium * 10) + (amountPlutonium * 50) + (amountUranium * 100);
		
		return new Order("Test Inc.", amountLithium, amountPlutonium, amountUranium, worth);
	}
	
}