package models;

class Order 
{

	public var name(default, null):String;
	public var lithium(default, null):Int;
	public var plutonium(default, null):Int;
	public var uranium(default, null):Int;
	public var money(default, null):Int;
	
	public function new(orderName:String, amountLithium:Int, amountPlutonium:Int, amountUranium:Int, worth:Int ) 
	{
		name = orderName;
		lithium = amountLithium;
		plutonium = amountPlutonium;
		uranium = amountUranium;
		money = worth;
	}
	
}