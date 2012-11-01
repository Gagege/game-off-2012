package models;

class Resource 
{
	public var(default, default) name:String;
	public var(default, default) quantity:Int;

	public function new() 
	{
		
	}
}

enum ResourceType
{
	Lithium,
	Plutonium,
	Uranium,
	DefectiveLithium,
	DefectivePlutonium,
	DefectiveUranium
}