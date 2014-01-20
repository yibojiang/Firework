#pragma strict

var speed:float;
var exsprite:exSprite;
var text:boolean;
var exfont:exSpriteFont;
var tm:TextMesh;

var max:float=1.0;

function Awake(){
	tm=this.GetComponent(TextMesh) as TextMesh;
}

function FadeIn(_time:float)
{
	speed=1.0/_time;
}

function FadeOut(_time:float)
{
	speed=-1.0/_time;
}

function Update () {
	if (!text)
	{
		if (exsprite!=null){
			exsprite.color.a+=speed*Time.deltaTime;
			exsprite.color.a=Mathf.Clamp01(exsprite.color.a);
		}
	}
	else
	{
		if (exfont!=null){
			exfont.botColor.a+=speed*Time.deltaTime;
			exfont.botColor.a=Mathf.Clamp01(exfont.botColor.a);
			exfont.topColor=exfont.botColor;	
		}

		if (tm!=null){
			tm.color.a+=speed*Time.deltaTime;
			tm.color.a=Mathf.Clamp01(tm.color.a);
		}
		
	}
}