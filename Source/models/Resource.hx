package models;

class Resource 
{
	public var(default, null) name:String;
	public var(default, null) quantity:Int;
	public var(default, null) type:ResourceType;

	public function new(resourceName:String, resourceQuantity:Int, resourceType:ResourceType):Void
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