package views;

import haxe.Timer;
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
	private var boxIndex:Int;
	
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
				currentBox.visible = false;
				box = currentBox;
				removeBox();
			}
		}
		return box;
	}
	
	public function deliverBox(box:BoxSubView):Void 
	{
		if (currentBox == null)
		{
			var delay:Float = 5;
			currentBox = box;
			addChild(currentBox);
			// place box under door
			swapChildren(currentBox, topDoor);
			swapChildren(currentBox, bottomDoor);
			openDoors(delay);
			Actuate.timer(delay).onComplete(currentBox.changeBoxColor);
		}
	}
	
	public function removeBox():Void 
	{
		if (currentBox != null)
		{
			removeOldBox();
			closeDoors();
		}
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
		
		topDoor.graphics.lineStyle(hatchWidth * 0.02, 0x000000, 1);
		DrawHelper.makeLineRect(topDoor,
			((hatchWidth * 1.1) / 2) * -1,
			((hatchWidth * 1.1) / 2) * -1,
			hatchWidth * 1.1,
			(hatchWidth / 2) * 1.1);
		
		bottomDoor.graphics.lineStyle(hatchWidth * 0.02, 0x000000, 1);
		DrawHelper.makeLineRect(bottomDoor,
			((hatchWidth * 1.1) / 2) * -1,
			0,
			hatchWidth * 1.1,
			(hatchWidth / 2) * 1.1);
		
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
	
	private function closeDoors():Void
	{
		Actuate.tween(topDoor, 1, { y: 0 } );
		Actuate.tween(bottomDoor, 1, { y: 0 } );
		doorsOpen = false;
	}
	
	private function openDoors(delay:Float = 0):Void 
	{
		Actuate.tween(topDoor, 1, { y: topDoor.y - (hatchWidth / 2) } ).delay(delay);
		Actuate.tween(bottomDoor, 1, { y: bottomDoor.y + (hatchWidth / 2) } ).delay(delay);
		Actuate.timer(delay).onComplete(function() {
			doorsOpen = true;
		});
	}
	
	private function removeOldBox():Void 
	{
		removeChild(currentBox);
		currentBox = null;
	}
	
}