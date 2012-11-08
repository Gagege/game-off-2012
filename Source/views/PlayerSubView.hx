package views;

import jeash.text.Font;
import models.Player;
import models.Resource;
import nme.display.Sprite;
import nme.display.GradientType;
import nme.Lib;
import nme.text.TextField;
import nme.Assets;
import nme.text.TextFormat;

import DrawHelper;
import controllers.PlayController;

class PlayerSubView extends Sprite
{	
	var robotArm:RobotArmSubView;
	private var model:Player;
	private var lithiumDisplay:TextField;
	private var plutoniumDisplay:TextField;
	private var uraniumDisplay:TextField;
	private var font:Font;
	private var format:TextFormat;
	
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
		font = Asset.getFont("_sans");
		format = new TextFormat (font.fontName, 24, 0xFF0000);
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
	
	private var drawResourceMessage(type:ResourceType):Void
	{
		switch(type)
		{
			
		}
	}
	
	private function updateField():Void 
	{
		
	}
}