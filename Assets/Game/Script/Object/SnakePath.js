#pragma strict

var fw:Firework;
var timer:float;
var dir:int=1;
function Start () {
	timer=0.1;
	fw.body.velocity.x=-6;
}

function FixedUpdate () {
	if (fw.stage==1)
	{
		fw.body.AddForce(600*dir*timer,0,0);
		timer+=Time.deltaTime;
		if (timer>0.2)
		{
			dir=-dir;
			timer=0;
		}
	}
}