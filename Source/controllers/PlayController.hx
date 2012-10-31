package controllers;

import nme.Lib;
import views.PlayView;


class PlayController 
{
	public function new() 
	{
		Lib.current.addChild(new PlayView());
	}
	
}