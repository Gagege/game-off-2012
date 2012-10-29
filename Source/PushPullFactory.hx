package ;

import nme.display.Sprite;
import nme.display.StageAlign;
import nme.display.StageScaleMode;
import nme.Lib;

import Player;

class PushPullFactory extends Sprite {
	
	public function new () {
		
		super ();
		
		initialize ();
	}
	
	private function initialize ():Void {
		
		Lib.current.stage.align = StageAlign.TOP_LEFT;
		Lib.current.stage.scaleMode = StageScaleMode.NO_SCALE;
		
		makeBackground();
		
		var player1 = new Player(1);
		var player2 = new Player(2);
	}
	
	private function makeLineRect(sprite:Sprite, x:Int, y:Int, width:Int, height:Int):Sprite
	{
		sprite.graphics.moveTo(x, y);
		sprite.graphics.lineTo(width, y);
		sprite.graphics.lineTo(width, height);
		sprite.graphics.lineTo(x, height);
		sprite.graphics.lineTo(x, y);
		return sprite;
	}
	
	private function makeBackground():Void 
	{
		var background = new Sprite();
		background.graphics.clear();
		background.graphics.beginFill(0xE60045,0.60);
		background.graphics.drawRect(0, 0,
			Lib.current.stage.stageWidth,
			Lib.current.stage.stageHeight);
		addChild(background);
		
		var outerBorder = new Sprite();
		outerBorder.graphics.clear();
		outerBorder.graphics.lineStyle(3.0, 0xE60045);
		outerBorder = makeLineRect(outerBorder, 2, 2,
			Lib.current.stage.stageWidth - 3,
			Lib.current.stage.stageHeight - 3);
		addChild(outerBorder);
	}
	
	// Entry point
	
	public static function main () {
		
		Lib.current.addChild (new PushPullFactory ());
		
	}
}