package views;

import nme.Lib;
import nme.display.Sprite;
import com.eclecticdesignstudio.motion.Actuate;

class BoxHatchSubView extends Sprite
{

	private var hole:Sprite;
	private var topDoor:Sprite;
	private var bottomDoor:Sprite;
	
	private var hatchWidth:Float;
	
	public function new(position:Int) 
	{
		super();
		
		hatchWidth = Lib.current.stage.stageWidth * 0.1;
		
		drawHatch(position);
	}
	
	public function deliverBox(box:BoxSubView):Void 
	{
		addChild(box);
		openDoors(5, box);
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
	
	private function openDoors(delay:Float, box:BoxSubView):Void 
	{
		Actuate.tween(topDoor, 1, { y: topDoor.y - (hatchWidth / 2) } ).delay(delay);
		Actuate.tween(bottomDoor, 1, { y: bottomDoor.y + (hatchWidth / 2) } ).delay(delay);
		Actuate.timer(delay).onComplete(box.changeBoxColor);
	}
	
	private function closeDoors():Void 
	{
		Actuate.tween(topDoor, 1, {y: topDoor.y + (hatchWidth / 2)});
		Actuate.tween(bottomDoor, 1, {y: bottomDoor.y - (hatchWidth / 2)});
	}
	
}