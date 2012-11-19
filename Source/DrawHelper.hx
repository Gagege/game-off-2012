package ;

import nme.Lib;
import nme.display.Sprite;

class DrawHelper 
{
	
	public static var vertical1Fourth:Float = Lib.current.stage.stageHeight * 0.22;
	public static var verticalCenter:Float = Lib.current.stage.stageHeight * 0.5;
	public static var vertical3Fourths:Float = Lib.current.stage.stageHeight * 0.78;
	
	public static function makeLineRect(sprite:Sprite, x:Float, y:Float, width:Float, height:Float):Sprite
	{
		sprite.graphics.moveTo(x, y);
		sprite.graphics.lineTo(x + width, y);
		sprite.graphics.lineTo(x + width, y  + height);
		sprite.graphics.lineTo(x, y + height);
		sprite.graphics.lineTo(x, y);
		return sprite;
	}
	
	public static function makeLine(sprite:Sprite, startX:Float, startY:Float, endX:Float, endY:Float):Sprite
	{
		sprite.graphics.moveTo(startX, startY);
		sprite.graphics.lineTo(endX, endY);
		return sprite;
	}
}