package views;

import nme.display.Sprite;
import nme.filters.BlurFilter;
import nme.Lib;
import models.Resource;

class ResourceSubView extends Sprite
{
	private var color:Int;
	private var resource:Sprite;
	private var progressBar:Sprite;
	
	public function new(type:ResourceType, player:Int) 
	{
		super();
		switch(type)
		{
			case ResourceType.Lithium:
				color = BoxSubView.lithiumColor;
			case ResourceType.Plutonium:
				color = BoxSubView.plutoniumColor;
			case ResourceType.Uranium:
				color = BoxSubView.uraniumColor;
		}
		drawResource();
	}
	
	private function drawResource():Void 
	{
		resource = new Sprite();
		resource.graphics.beginFill(color, 1);
		resource.graphics.drawRect(
			0,
			0,
			Lib.current.stage.stageWidth * .08,
			Lib.current.stage.stageWidth * .08);
		addChild(resource);
	}
	
}