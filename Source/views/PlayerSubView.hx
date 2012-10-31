package views;

import nme.display.Sprite;
import nme.display.GradientType;
import nme.Lib;

import DrawHelper;
import controllers.PlayController;

class PlayerSubView extends Sprite
{	
	var robotArm:RobotArmSubView;
	
	public function new(player:Int) 
	{
		super();
		
		initialize(player);
	}
	
	public function robotForward():Void
	{
		robotArm.forward();
	}
	
	public function robotBack():Void
	{
		robotArm.back();
	}
	
	public function robotUp():Void
	{
		robotArm.up();
	}
	
	public function robotDown():Void
	{
		robotArm.down();
	}
	
	private function initialize(player:Int):Void
	{
		drawField(player);
	}
	
	private function drawField(player:Int):Void
	{
		var isRight = true;
		
		if (player == 1)
		{
			isRight = false;
		}
		
		robotArm = new RobotArmSubView(isRight);
		addChild(robotArm);
	}
}