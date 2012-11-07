package views;

import nme.Lib;
import nme.display.Sprite;
import nme.display.DisplayObject;
import com.eclecticdesignstudio.motion.Actuate;

class BoxHatchSubView extends Sprite
{

	private var hole:Sprite;
	private var topDoor:Sprite;
	private var bottomDoor:Sprite;
	private var currentBox:BoxSubView;
	private var hatchWidth:Float;
	private var doorsOpen:Bool;
	
	public function new(position:Int) 
	{
		super();
		
		doorsOpen = false;
		
		hatchWidth = Lib.current.stage.stageWidth * 0.1;
		
		drawHatch(position);
	}
	
	public function getBox():BoxSubView
	{
		var box:BoxSubView = null;
		if (doorsOpen)
		{
			if (currentBox != null)
			{
				box = currentBox;
				currentBox.alpha = 0;
			}
		}
		return box;
	}
	
	public function deliverBox(box:BoxSubView):Void 
	{
		var delay:Float = 5;
		currentBox = box;
		addChild(currentBox);
		toggleDoors(delay);
		Actuate.timer(delay).onComplete(box.changeBoxColor);
	}
	
	public function removeBox():Void 
	{
		if (currentBox != null)
		{
			removeOldBox();
		}
		toggleDoors();
	}
	
	private function drawHatch(position:Int):Void 
	{
		hole = new Sprite();
		topDoor = new Sprite();
		bottomDoor = new Sprite();
		
		hole.graphics.clear();
		hole.graphics.beginFill(0x000000, 1);
		hole.graphics.drawRect(
			(hatchWidth / 2) * -1,
			(hatchWidth / 2) * -1, 
			hatchWidth, 
			hatchWidth);
			
		topDoor.graphics.clear();
		topDoor.graphics.beginFill(0xAAAAAA, .75);
		topDoor.graphics.drawRect(
			((hatchWidth * 1.1) / 2) * -1,
			((hatchWidth * 1.1) / 2) * -1,
			hatchWidth * 1.1,
			(hatchWidth * 1.1) / 2
			);
				
		bottomDoor.graphics.clear();
		bottomDoor.graphics.beginFill(0xAAAAAA, .75);
		bottomDoor.graphics.drawRect(
			((hatchWidth * 1.1) / 2) * -1,
			0,
			hatchWidth * 1.1,
			(hatchWidth * 1.1) / 2
			);
		
		this.x = Lib.current.stage.stageWidth / 2;
		
		if (position == 1)
		{
			this.y = DrawHelper.vertical1Fourth;
		}
		else if (position == 2)
		{
			this.y = DrawHelper.verticalCenter;
		}
		else if (position == 3)
		{
			this.y = DrawHelper.vertical3Fourths;
		}
		
		addChild(hole);
		addChild(topDoor);
		addChild(bottomDoor);
	}
	
	private function toggleDoors(delay:Float = 0):Void 
	{
		if (doorsOpen)
		{
			Actuate.tween(topDoor, 1, { y: 0 } );
			Actuate.tween(bottomDoor, 1, { y: 0 } );
			doorsOpen = false;
		}
		else
		{
			Actuate.tween(topDoor, 1, { y: topDoor.y - (hatchWidth / 2) } ).delay(delay);
			Actuate.tween(bottomDoor, 1, { y: bottomDoor.y + (hatchWidth / 2) } ).delay(delay);
			Actuate.timer(delay).onComplete(function() {
				doorsOpen = true;
			});
		}
	}
	
	private function removeOldBox():Void 
	{
		if (currentBox != null)
		{
			removeChild(currentBox);
		}
		currentBox = null;
	}
	
}