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
	body=this.GetComponent.<Rigidbody>();
	color=Color.white;
}

function Start () {
	//Debug.Log(transform.rotation);
	

	if (randomColor)
	{
		var hsbColor:HSBColor=new HSBColor(Random.value,0.8,1);
		color=hsbColor.ToColor();
		//color=Color(Random.Range(0,1.0),Random.Range(0,1.0),Random.Range(0,1.0));
	}
	else
	{
		
	}
	head.color=color;
	
	var colors:Color[]=smokeA.colorAnimation;
	colors[0]=color;
	smokeA.colorAnimation=colors;
}

function Shoot(_force:Vector3)
{
	body.AddForce(_force);
	stage=1;

	//this.audio.PlayOneShot(whistleClips[Random.Range(0,whistleClips.Length)]);
	this.GetComponent.<AudioSource>().clip=whistleClips[Random.Range(0,whistleClips.Length)];
	this.GetComponent.<AudioSource>().Play();

	var snake:SnakePath=this.GetComponent(SnakePath) as SnakePath;
	if (snake!=null){
		snake.SetInitForce(_force);
	}
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
	else if (stage==2)//fw dying
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
	
	
	this.GetComponent.<AudioSource>().PlayOneShot(explosionClips[Random.Range(0,explosionClips.Length)]);
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
	
	head.intensity=1;
	head.range=100;
	smoke.emit=false;
}