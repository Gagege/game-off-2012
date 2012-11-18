package ;
import controllers.MenuController;

class Game {
	
	public function new() 
	{
		var play = new MenuController();
	}
	
	// Entry point
	public static function main ()
	{
		var game = new Game();
	}
}