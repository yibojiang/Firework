#pragma strict

var fw:Firework;
var timer:float;
var dir:int=1;

var initForce:Vector3;
var circleForce:Vector3;
var circleVel:Vector3;

var radius:float=50;
var maxSpeed:float=50;

//var startPos:Vector3;


function SetInitForce(_initForce:Vector3){
	
	radius=1;
	initForce=_initForce;

	var rndDir:Vector3=Vector3(Random.value-0.5,Random.value-0.5,Random.value-0.5);
	circleVel=Vector3.Cross(initForce,rndDir).normalized*10;
	//Debug.Log("vel: "+circleVel);
	//circleForce=Vector3.Cross(initForce,circleVel).normalized*4;
	//circleForce=Vector3.Cross(initForce,fw.body.velocity).normalized*fw.body.velocity.magnitude*2;	
	fw.body.velocity=circleVel;
	//fw.body.AddForce(circleVel,ForceMode.VelocityChange);
	
	
}

function Start () {
	//timer=0.1;
}



function FixedUpdate () {
	if (fw.stage==1){
		//rigidbody.MoveRotation 
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
		//a=v*v/r
		//r=v*v/a
		//v=w*r
		var tmpVal:float=Mathf.Pow(circleVel.magnitude,2)/radius;
		
		//transform.LookAt(fw.body.velocity*100 ,Vector3.up);
		//fw.body.AddRelativeForce(Vector3.right*tmpVal);
		
		circleForce=Vector3.Cross(initForce,fw.body.velocity).normalized*tmpVal;
		fw.body.AddForce(circleForce);
		
		
		//fw.body.velocity=Vector3.ClampMagnitude(fw.body.velocity,maxSpeed);
		//Debug.Log(circleForce.magnitude);
		
		
		//Debug.Log("radius: "+dist.magnitude);
		//Debug.Log("vel "+fw.body.velocity.magnitude);
		//Debug.Log("vel2: "+tmpVal);
	}
}