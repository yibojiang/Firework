#pragma strict

var fw:Firework;
var timer:float;
var dir:int=1;

var initForce:Vector3;
var circleForce:Vector3;
var circleVel:Vector3;
function SetInitForce(_initForce:Vector3){
	initForce=_initForce;

	var rndDir:Vector3=Vector3(Random.value-0.5,Random.value-0.5,Random.value-0.5);
	circleVel=Vector3.Cross(initForce,rndDir).normalized*5;
	//Debug.Log("vel: "+circleVel);
	//circleForce=Vector3.Cross(initForce,circleVel).normalized*4;
	//circleForce=Vector3.Cross(initForce,fw.body.velocity).normalized*fw.body.velocity.magnitude*2;
	
	fw.body.velocity=circleVel;
}

function Start () {
	timer=0.1;
	//fw.body.velocity.x=-6;
	
	//fw.body.velocity.x=-20;
}

function FixedUpdate () {
	if (fw.stage==1)
	{
		
		//fw.body.AddForce(fw.body.velocity.magnitude*50 *dir*timer,0,0);

		/*
		fw.body.AddForce(600*dir*timer,0,0);
		timer+=Time.deltaTime;
		if (timer>0.2)
		{
			dir=-dir;
			timer=0;
		}
		*/
		//circleForce=Vector3.Cross(initForce,fw.body.velocity).normalized*fw.body.velocity.magnitude*4;
		
		//TODO: Caculate the speed factor.
		circleForce=Vector3.Cross(initForce,fw.body.velocity).normalized*circleVel.magnitude*20;
		//Debug.Log("force: "+circleForce);
		fw.body.AddForce(circleForce);
	}
}