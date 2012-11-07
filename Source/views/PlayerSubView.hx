package views;

import models.Player;
import models.Resource;
import nme.display.Sprite;
import nme.display.GradientType;
import nme.Lib;

import DrawHelper;
import controllers.PlayController;

class PlayerSubView extends Sprite
{	
	var robotArm:RobotArmSubView;
	private var model:Player;
	
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
	
	public function absorbResource(resource:Resource):Void 
	{
		model.addResource(resource);
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
		
		model = new Player(player);
		
		robotArm = new RobotArmSubView(isRight);
		addChild(robotArm);
	}
}