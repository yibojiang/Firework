#pragma strict

enum FireworkType
{
	Firework,
	GlitterRain,
	DragonFW,
	StarFW,
	HeartFW,
	Line,
	LineInterval,
	RandomShoot,
	RandomLine,
	RandomStar,
	RandomHeart
}

class FireworkLevel
{
	var interval:float;
	var randomColor:boolean;
	var type:FireworkType;
	
	var pos:Vector3;
	var vel:Vector3=Vector3(0,2000,0);
	
	var lineCount:int;
	var lineSpace:float;
	var lineInterval:float;
	var lineDir:int;
	
	
	var randomCount:int;
	var randomInterval:float;
}

var levels:FireworkLevel[];
var toggle:float;
var interval:float;
var index:int=0;

var fg:FireworkGenerator;

var stage:int;

var dialogs:TextDisplay[];
var dialogIndex:int=0;

var tip:AlphaChange;

var touchPad:Joystick;
class TextDisplay
{
	var text:AlphaChange;
	var time:float;
}

function Start () {
	interval=levels[index].interval;
	Screen.showCursor=false;
	
}

function FireworkStart()
{
	stage=1;
	tip.FadeOut(1.0);
}

function Update () {
	if (stage==0)
	{
		if (Input.GetKeyDown(KeyCode.Return) || touchPad.tapCount >= 2 )
		{
			FireworkStart();
		}
		
		/*
		if (Input.GetKeyDown(KeyCode.T))
		{
			ShowText();
		}
		*/
	}
	else if (stage==1)
	{
		if (index<levels.Length)
		{
			toggle+=Time.deltaTime;
			if (toggle>=interval){
				toggle-=interval;
				FireFirework(levels[index]);
				index++;
				if (index<levels.Length)
				{
					interval=levels[index].interval;
				}
			}
		}
		else
		{
			ShowText();
			stage=2;
		}
	}
	else if (stage==2)
	{
		/*
		if (Input.GetKeyDown(KeyCode.T))
		{
			HideText();
		}
		*/
		
		if (dialogIndex>=dialogs.Length)
		{
			if (Input.GetKeyDown(KeyCode.Return) || touchPad.tapCount >= 2 )
			{
				HideText();
				stage=0;
				tip.FadeIn(1.0);
				index=0;
				interval=levels[index].interval;
			}
		}
	}
}

function ShowText()
{
	dialogIndex=0;
	while(dialogIndex<dialogs.Length)
	{
		//iTween.FadeTo(dialogs[dialogIndex].text.gameObject,1.0,1.0);
		dialogs[dialogIndex].text.FadeIn(dialogs[dialogIndex].time);
		dialogIndex++;
		yield WaitForSeconds(2.0);
		
	}
}

function HideText()
{
	dialogIndex=0;
	while(dialogIndex<dialogs.Length)
	{
		dialogs[dialogIndex].text.FadeOut(1.0);
		dialogIndex++;
		//yield WaitForSeconds(2.0);
		
	}
}




function FireFirework(_level:FireworkLevel)
{
	var i:int=0;
	var start:float;
	if (_level.type==FireworkType.Firework)
	{
		fg.FireFirework(fg.transform.position+_level.pos,_level.vel,_level.randomColor);
	}
	else if (_level.type==FireworkType.GlitterRain)
	{
		fg.FireGlitterRain(fg.transform.position+_level.pos,_level.vel,_level.randomColor);
	}
	else if (_level.type==FireworkType.DragonFW)
	{
		fg.FireDragonFirework(fg.transform.position+_level.pos,_level.vel,_level.randomColor);
	}
	else if (_level.type==FireworkType.StarFW)
	{
		fg.FireStarFirework(fg.transform.position+_level.pos,_level.vel,_level.randomColor);
	}
	else if (_level.type==FireworkType.HeartFW)
	{
		fg.FireHeartFirework(fg.transform.position+_level.pos,_level.vel,_level.randomColor);
	}
	else if (_level.type==FireworkType.Line)
	{
		start=-_level.lineCount/2*_level.lineSpace;
		for (i=0;i<_level.lineCount;i++)
		{
			fg.FireFirework(fg.transform.position+_level.pos+Vector3(start,0,0),_level.vel,_level.randomColor);
			start+=_level.lineSpace;
		}
	}
	else if (_level.type==FireworkType.LineInterval) 
	{
		start=-_level.lineCount/2*_level.lineSpace*_level.lineDir;
		for (i=0;i<_level.lineCount;i++)
		{
			yield WaitForSeconds(_level.lineInterval);
			fg.FireFirework(fg.transform.position+_level.pos+Vector3(start,0,0),_level.vel,_level.randomColor);
			start+=_level.lineSpace*_level.lineDir;
		}
	}
	else if (_level.type==FireworkType.RandomShoot)
	{
		for (i=0;i<_level.randomCount;i++)
		{
			yield WaitForSeconds(_level.randomInterval);
			fg.FireFirework(fg.transform.position+_level.pos,_level.vel+Vector3(Random.Range(-500,500),0,Random.Range(-500,500)),_level.randomColor);
		}
	}
	else if (_level.type==FireworkType.RandomLine)
	{
		start=-_level.lineCount/2*_level.lineSpace;
		for (i=0;i<_level.lineCount;i++)
		{
			fg.FireFirework(fg.transform.position+_level.pos+Vector3(start,0,0),_level.vel+Vector3(Random.Range(-500,500),0,Random.Range(-500,500)),_level.randomColor);
			start+=_level.lineSpace;
		}
	}
	else if (_level.type==FireworkType.RandomStar)
	{
		for (i=0;i<_level.randomCount;i++)
		{
			yield WaitForSeconds(_level.randomInterval);
			fg.FireStarFirework(fg.transform.position+_level.pos,_level.vel+Vector3(Random.Range(-500,500),0,Random.Range(-500,500)),_level.randomColor);
		}
	}
	else if (_level.type==FireworkType.RandomHeart)
	{
		for (i=0;i<_level.randomCount;i++)
		{
			yield WaitForSeconds(_level.randomInterval);
			fg.FireHeartFirework(fg.transform.position+_level.pos,_level.vel+Vector3(Random.Range(-500,500),0,Random.Range(-500,500)),_level.randomColor);
		}
	}
}