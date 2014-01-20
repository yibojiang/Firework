#pragma strict

var timer:float;
var lifeTime:float;
var explosion:GameObject;
var body:Rigidbody;

var stage:int=0;

var smoke:ParticleEmitter;
var smokeA:ParticleAnimator;

var head:Light;
var color:Color=Color.white;
var randomColor:boolean;

var explosionClips:AudioClip[];
var whistleClips:AudioClip[];




function Awake()
{
	body=this.rigidbody;
	color=Color.white;
}

function Start () {
	//Debug.Log(transform.rotation);
	if (randomColor)
	{
		color=Color(Random.Range(0,1.0),Random.Range(0,1.0),Random.Range(0,1.0));
	}
	else
	{
		
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
	this.audio.clip=whistleClips[Random.Range(0,whistleClips.Length)];
	this.audio.Play();
}

function ShootGlitter(_vel:Vector3,_lifeTime:float)
{
	body.AddForce(_vel);
	stage=1;
	lifeTime=_lifeTime;
}

function Update () {
	if (stage==0)
	{
		//head.intensity=1.0+1.0*Mathf.Sin(Time.time);
		
	}
	else if (stage==1)
	{
		//var left:Vector3=body.velocity;
		
		//body.AddRelativeForce (left);
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
		head.range-=500*Time.deltaTime;
		/*
		if (head.intensity<=0)
		{
			Destroy(this.gameObject);
		}
		*/
		if (smoke.particleCount==0)
		{
			Destroy(this.gameObject);
		}
	}
}

function Explosion()
{
	var explode:GameObject=Instantiate(explosion,this.transform.position,Quaternion.identity);
	
	
	this.audio.PlayOneShot(explosionClips[Random.Range(0,explosionClips.Length)]);
	//explode.audio.Play();
	
	var pr:ParticleRenderer=explode.GetComponent(ParticleRenderer) as ParticleRenderer;
	pr.materials[0].SetColor("_TintColor",color);
	//pr.materials[1].SetColor("_TintColor",color);
	//Debug.Log(pr.materials[1].GetColor("Tint"));
	//explode.particleEmitter.renderer.materials[0].color=color;
	//var pa:ParticleAnimator=explode.GetComponent(ParticleAnimator) as ParticleAnimator;
	//this.gameObject.SetActiveRecursively(false);
	
	stage=2;
	
	body.Sleep();
	
	head.intensity=2;
	head.range=1000;
	smoke.emit=false;
}