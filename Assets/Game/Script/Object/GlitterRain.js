#pragma strict

var firework:GameObject;

var timer:float;
var lifeTime:float;

var body:Rigidbody;

var stage:int=0;

var smoke:ParticleEmitter;
var smokeA:ParticleAnimator;

var head:Light;
var color:Color=Color.white;
var randomColor:boolean;
var explosionClips:AudioClip[];

var count:int=10;

function Awake()
{
	body=this.rigidbody;
}

function Start () {
	if (randomColor)
	{
		color=Color(Random.Range(0,1.0),Random.Range(0,1.0),Random.Range(0,1.0));
	}
	else
	{
		color=Color.white;
	}
	head.color=color;
	
	var colors:Color[]=smokeA.colorAnimation;
	colors[0]=color;
	smokeA.colorAnimation=colors;
}

function Shoot(_vel:Vector3)
{
	body.AddForce(_vel);
	stage=1;
	this.audio.Play();
}

function Update () {
	if (stage==0)
	{
		//head.intensity=1.0+1.0*Mathf.Sin(Time.time);
		
	}
	else if (stage==1)
	{
		if (timer<lifeTime)
		{
			
			timer+=Time.deltaTime;
		
		}
		else
		{
			Explosion();
		}
	}
	else if (stage==2)
	{
		head.intensity-=Time.deltaTime;
		head.range-=400*Time.deltaTime;
		
		if (smoke.particleCount==0)
		{
			Destroy(this.gameObject);
		}
	}
}

function Explosion()
{
	var i:int;
	
	for (i=0;i<count;i++)
	{
		var f:Firework= Instantiate(firework,transform.position,Quaternion.identity).GetComponent(Firework) as Firework;
		if (randomColor)
		{
			//f.randomColor=true;
			f.color=color;
		}
		f.ShootGlitter(Vector3(Random.Range(-1000,1000),Random.Range(-1000,1000),Random.Range(-1000,1000)),Random.Range(1.0,2.0));
	}

	this.audio.PlayOneShot(explosionClips[Random.Range(0,explosionClips.Length)]);
	stage=2;
	
	body.Sleep();
	
	head.intensity=2;
	head.range=1200;
	smoke.emit=false;
}