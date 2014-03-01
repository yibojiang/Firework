#pragma strict


class BeepFirework extends Firework{
	var beepToggle:float;
	var beepInterval:float=0.1;

	var beepTimeFactor:float=0.2;

	override function Awake(){
		super.Awake();
	}

	override function Start () {
		super.Start();
	}

	override function Update () {

		super.Update();
		head.intensity-=Time.deltaTime;
		head.range-=500*Time.deltaTime;

		
		if (timer>lifeTime*beepTimeFactor){
			beepToggle+=Time.deltaTime;
			if (beepToggle>=beepInterval){
				beepToggle-=beepInterval;
				BeepExplosion();

			}	
		}
	}
	

	override function ShootGlitter(_vel:Vector3,_lifeTime:float)
	{
		beepTimeFactor=0.2;
		body.AddForce(_vel);
		stage=1;
		lifeTime=_lifeTime;
		this.audio.clip=whistleClips[Random.Range(0,whistleClips.Length)];
		this.audio.Play();
	}
	/*
	override function Shoot(_vel:Vector3)
	{
		body.AddForce(_vel);
		stage=1;

		this.audio.clip=whistleClips[Random.Range(0,whistleClips.Length)];
		this.audio.Play();
	}
	*/	

	function BeepExplosion(){
		var explode:GameObject=Instantiate(explosion,this.transform.position+Vector3(Random.Range(-2.0,2.0),Random.Range(-2.0,2.0),Random.Range(-2.0,2.0) ),Quaternion.identity);
		//this.audio.PlayOneShot(explosionClips[Random.Range(0,explosionClips.Length)]);

		//var hsbColor:HSBColor=new HSBColor(Random.value,0.8,1);
		//color=hsbColor.ToColor();

		var pr:ParticleRenderer=explode.GetComponent(ParticleRenderer) as ParticleRenderer;
		pr.materials[0].SetColor("_TintColor",color);

		head.intensity=1;
		head.range=500;
	}
	
	override function Explosion(){
	
		stage=2;
		
		//body.Sleep();
		
		//head.intensity=2;
		//head.range=1000;
		smoke.emit=false;
	}
	
}

