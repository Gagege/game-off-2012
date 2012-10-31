package ;
import controllers.PlayController;

class Game {
	
	public function new() 
	{
		var play = new PlayController();
	}
	
	// Entry point
	public static function main ()
	{
		var game = new Game();
	}
}