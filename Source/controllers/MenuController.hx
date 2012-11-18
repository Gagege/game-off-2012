package controllers;

import models.Option;
import nme.events.KeyboardEvent;
import nme.Lib;
import views.MenuView;

class MenuController 
{
	var menuView:MenuView;
	var options:Array<Option>;
	
	public function new() 
	{
		initialize();
	}
	
	private function initialize():Void 
	{
		options = new Array<Option>();
		options.push(new Option("Start Game", false)); 
		options.push(new Option("1 Player", false));
		options.push(new Option("2 Player", false));
		options.push(new Option("Instructions", false));
		
		menuView = new MenuView(options);
		
		Lib.current.addChild(menuView);
		
		Lib.current.stage.addEventListener(KeyboardEvent.KEY_DOWN, onKeyDown);
	}
	
	private function startGame():Void 
	{
		var newGame = new PlayController(options);
	}
	
	private function onKeyDown(event:KeyboardEvent):Void
	{
		switch(event.keyCode)
		{
			case 38: // 'up arrow' key
				if(menuView.selectedOptionIndex > 0)
					menuView.cursorTo(menuView.selectedOptionIndex - 1);
			case 40: // 'down arrow' key
				if(menuView.selectedOptionIndex < options.length - 1)
					menuView.cursorTo(menuView.selectedOptionIndex + 1);
		}
	}
}