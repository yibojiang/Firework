#pragma strict
var vel:Vector3;
var acc:Vector3;
var initVel:Vector3;

var initPos:Vector3;
function Start () {
	initVel=Vector3(10,0,0);
	vel=initVel;
	rigidbody.velocity=Vector3(100,0,0);
}
/*
function Update () {
	
	var tmpVal:float=Mathf.Pow(vel.magnitude,2)/5;
	acc=Vector3.Cross(Vector3(0,1,0),vel).normalized*tmpVal;

	vel+=acc*Time.deltaTime;
	transform.position+=vel;
}
*/

function FixedUpdate(){
	//rigidbody.AddTorque 
	//rigidbody.AddRelativeForce (Vector3.forward * 10,ForceMode.VelocityChange);
	var direction : Vector3 =rigidbody.position;
	rigidbody.AddForceAtPosition(-direction.normalized*100, Vector3(0,0,0) );
}