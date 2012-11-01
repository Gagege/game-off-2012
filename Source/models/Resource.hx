package models;

class Resource 
{
	public var name(default, null):String;
	public var quantity(default, null):Int;
	public var type(default, null):ResourceType;

	public function new(resourceName:String, resourceQuantity:Int, resourceType:ResourceType)
	{
		name = resourceName;
		quantity = resourceQuantity;
		type = resourceType;
	}
}

enum ResourceType
{
	Lithium;
	Plutonium;
	Uranium;
}