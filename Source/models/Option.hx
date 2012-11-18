package models;

class Option 
{
	public var name:String;
	public var selected:Bool;

	public function new(optionName:String = "", isSelected:Bool = false) 
	{
		name = optionName;
		selected = isSelected;
	}
	
}