package ;

import nme.display.Sprite;

class DrawHelper 
{
	public static function makeLineRect(sprite:Sprite, x:Int, y:Int, width:Int, height:Int):Sprite
	{
		sprite.graphics.moveTo(x, y);
		sprite.graphics.lineTo(width, y);
		sprite.graphics.lineTo(width, height);
		sprite.graphics.lineTo(x, height);
		sprite.graphics.lineTo(x, y);
		return sprite;
	}
	
	public static function makeLine(sprite:Sprite, startX:Int, startY:Int, endX:Int, endY:Int):Sprite
	{
		sprite.graphics.moveTo(startX, startY);
		sprite.graphics.lineTo(endX, endY);
		return sprite;
	}
}