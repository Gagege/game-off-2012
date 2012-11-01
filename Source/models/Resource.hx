package models;

class Resource 
{
	public var(default, default) name:String;
	public var(default, default) quantity:Int;
	public var(default, default) type:ResourceType;

	public function new(resourceName:String, resourceQuantity:Int,
		resourceType:ResourceType) 
	{
		name = resourceName;
		quantity = resourceQuantity;
		type = resourceType;
	}
}

enum ResourceType
{
	Lithium,
	Plutonium,
	Uranium,
	AntiLithium,
	AntiPlutonium,
	AntiUranium
}