package models;

class Resource 
{
	public var name(default, null):String;
	public var quantity(default, null):Int;
	public var type(default, null):ResourceType;

	// Running this default constructor gets a random box
	public function new()
	{
		switch(Std.random(10))
		{
			case 0: type = ResourceType.Lithium;
			case 1: type = ResourceType.Lithium;
			case 2: type = ResourceType.Lithium;
			case 3: type = ResourceType.Lithium;
			
			case 4: type = ResourceType.Plutonium;
			case 5: type = ResourceType.Plutonium;
			case 6: type = ResourceType.Plutonium;
			case 7: type = ResourceType.Plutonium;
			
			case 8: type = ResourceType.Uranium;
			case 9: type = ResourceType.Uranium;
			case 10: type = ResourceType.Uranium;
		}
		
		quantity = Std.random(2) + 1; //Add one, so we never get 0
		
		name = quantity + " " + type;
	}
}

enum ResourceType
{
	Lithium;
	Plutonium;
	Uranium;
}