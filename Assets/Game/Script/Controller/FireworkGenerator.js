#pragma strict

var firework:GameObject;
var glitterRain:GameObject;
var dragonFW:GameObject;
var starFW:GameObject;

var heartFW:GameObject;
var beepFW:GameObject;

var glitterRainBeep:GameObject;
function Start () {

}

function Update () {
	if (Input.GetKeyDown(KeyCode.F))
	{
		FireFirework(transform.position,Vector3(Random.Range(-500,500),2000,Random.Range(-500,500)),false);
	}

	if (Input.GetKeyDown(KeyCode.R))
	{
		FireFirework(transform.position,Vector3(Random.Range(-500,500),2000,Random.Range(-500,500)),true);
	}
	
	if (Input.GetKeyDown(KeyCode.G))
	{
		FireGlitterRain(transform.position,Vector3(0,5000,0),true);
	}

	if (Input.GetKeyDown(KeyCode.T))
	{
		FireGlitterRainBeep(transform.position,Vector3(0,5000,0),true);
	}
	
	if (Input.GetKeyDown(KeyCode.H))
	{
		FireDragonFirework(transform.position,Vector3(Random.Range(-500,500),2000,Random.Range(-500,500)),true);
	}
	
	if (Input.GetKeyDown(KeyCode.J))
	{
		FireStarFirework(transform.position,Vector3(Random.Range(-500,500),2000,Random.Range(-500,500)),true);
	}
	
	if (Input.GetKeyDown(KeyCode.K))
	{
		FireHeartFirework(transform.position,Vector3(Random.Range(-500,500),2000,Random.Range(-500,500)),true);
	}

	if (Input.GetKeyDown(KeyCode.L))
	{
		//FireBeepFirework(transform.position,Vector3(Random.Range(-500,500),3000,Random.Range(-500,500)),true);
		FireBeepFirework(transform.position,Vector3(0,3000,Random.Range(-500,500)),true);
	}

	
}

function FireBeepFirework(_pos:Vector3,_vel:Vector3,_rndColor:boolean){
	var f:Firework= Instantiate(beepFW,_pos,Quaternion.identity).GetComponent(Firework) as Firework;
	f.randomColor=_rndColor;
	f.Shoot(_vel);
}

function FireHeartFirework(_pos:Vector3,_vel:Vector3,_rndColor:boolean)
{
	var f:Firework= Instantiate(heartFW,_pos,Quaternion.identity).GetComponent(Firework) as Firework;
	f.randomColor=_rndColor;
	f.Shoot(_vel);	
}

function FireStarFirework(_pos:Vector3,_vel:Vector3,_rndColor:boolean)
{
	var f:Firework= Instantiate(starFW,_pos,Quaternion.identity).GetComponent(Firework) as Firework;
	f.randomColor=_rndColor;
	f.Shoot(_vel);
}

function FireFirework(_pos:Vector3,_vel:Vector3,_rndColor:boolean)
{
	var f:Firework= Instantiate(firework,_pos,Quaternion.identity).GetComponent(Firework) as Firework;
	f.randomColor=_rndColor;
	f.Shoot(_vel);
}

function FireDragonFirework(_pos:Vector3,_vel:Vector3,_rndColor:boolean)
{
	var f:Firework= Instantiate(dragonFW,_pos,Quaternion.identity).GetComponent(Firework) as Firework;
	f.randomColor=_rndColor;
	f.Shoot(_vel);
}

function FireGlitterRainBeep(_pos:Vector3,_vel:Vector3,_rndColor:boolean)
{
	var g:GlitterRain =Instantiate(glitterRainBeep,_pos,Quaternion.identity).GetComponent(GlitterRain) as GlitterRain;
	g.randomColor=_rndColor;
	g.Shoot(_vel);
}

function FireGlitterRain(_pos:Vector3,_vel:Vector3,_rndColor:boolean)
{
	var g:GlitterRain =Instantiate(glitterRain,_pos,Quaternion.identity).GetComponent(GlitterRain) as GlitterRain;
	g.randomColor=_rndColor;
	g.Shoot(_vel);
}