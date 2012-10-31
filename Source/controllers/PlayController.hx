package controllers;

import nme.Lib;
import views.PlayView;


class PlayController 
{
	var playView:PlayView;
	public function new() 
	{
		playView = new PlayView();
		Lib.current.addChild(playView);
	}
}