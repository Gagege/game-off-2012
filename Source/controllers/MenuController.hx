package controllers;

import events.ToggleInstructions;
import events.StartGame;
import models.Option;
import nme.events.KeyboardEvent;
import nme.Lib;
import views.MenuView;
import events.MenuEvent;
import views.InstructionView;

class MenuController 
{
	var menuView:MenuView;
	var options:Array<Option>;
	var instructionsScreen:InstructionView;
	var newGame:PlayController;
	
	public static var menuEvent:MenuEvent = new MenuEvent();
	
	public function new() 
	{
		initialize();
	}
	
	private function initialize():Void 
	{
		options = new Array<Option>();
		options.push(new Option("Start Game", false)); 
		options.push(new Option("1 Player", true));
		options.push(new Option("2 Player", false));
		options.push(new Option("Merciful AI", true));
		options.push(new Option("Instructions", false));
		
		instructionsScreen = new InstructionView();
		instructionsScreen.hide();
		
		menuView = new MenuView(options);
		
		Lib.current.addChild(menuView);
		Lib.current.addChild(instructionsScreen);
		instructionsScreen.hide();
		Lib.current.stage.addEventListener(KeyboardEvent.KEY_DOWN, onKeyDown);
		menuEvent.addEventListener("ToggleInstructions", toggleInstructions);
		menuEvent.addEventListener("StartGame", onStartGame);
	}
	
	private function toggleInstructions(event:ToggleInstructions):Void 
	{
		if(instructionsScreen.visible)
			instructionsScreen.hide();
		else
			instructionsScreen.show();
	}
	
	private function onStartGame(event:StartGame):Void 
	{
		menuView.hide();
		menuEvent.removeEventListener("StartGame", onStartGame);
		newGame = new PlayController(options);
		newGame.start();
	}
	
	private function onKeyDown(event:KeyboardEvent):Void
	{
		switch(event.keyCode)
		{
			case 13: // 'enter' key
				menuView.selectOption();
			case 38: // 'up arrow' key
				if(menuView.selectedOptionIndex > 0)
					menuView.cursorTo(menuView.selectedOptionIndex - 1);
			case 40: // 'down arrow' key
				if(menuView.selectedOptionIndex < options.length - 1)
					menuView.cursorTo(menuView.selectedOptionIndex + 1);
		}
	}
}