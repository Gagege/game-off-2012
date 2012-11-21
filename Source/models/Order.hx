package models;

class Order 
{
	static var companies:Array<String> = ["Ruin", "Explosions", "Tragedy", "Trouble", "Danger", 
		"Intrusion", "Death", "Terrible", "Veridian", "Massive", "Skynet", "Sabotage", "Murder", 
		"Decimation", "Poison", "Agitation", "Strife", "Pain", "Tribulation", "Suffer", "Bother",
		"Predicament", "Misfortune", "Disquiet", "Dischord", "Nuisance", "Vexation", "Irritation",
		"Hindrance", "Dissatisfaction"];
	static var types:Array<String> = ["Inc", "Ltd", "Corp", "Ind", "Dyn", ""];
	
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
		var amountLithium:Int = Math.round(Math.random() * 6);
		var amountPlutonium:Int = Math.round(Math.random() * 4);
		var amountUranium:Int = Math.round(Math.random() * 2);
		
		var worth:Int = (amountLithium * 10) + (amountPlutonium * 50) + (amountUranium * 100);
		
		return new Order(getRandomName(), amountLithium, amountPlutonium, amountUranium, worth);
	}
	
	private static function getRandomName():String 
	{
		return companies[Math.round((Math.random() * (companies.length - 1)))] +
				" " +
				types[Math.round((Math.random() * (types.length - 1)))];
	}
	
}