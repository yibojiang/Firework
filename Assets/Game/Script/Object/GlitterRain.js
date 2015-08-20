#pragma strict
class GlitterRain extends Firework{
	var firework:GameObject;
	var count:int=10;

	
	var randomSpeed:boolean;
	var glitterSpeed:Vector2;
	var glitterLife:Vector2;

	override function Awake()
	{
		body=this.GetComponent.<Rigidbody>();
	}

	override function Start () {
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

	override function Shoot(_vel:Vector3)
	{
		body.AddForce(_vel);
		stage=1;
		this.GetComponent.<AudioSource>().Play();
	}

	override function Explosion()
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

			var lf:float=Random.Range(glitterLife.x,glitterLife.y);

			if (randomSpeed){
				var spdx:float=Random.Range(glitterSpeed.x,glitterSpeed.y);
				var spdy:float=Random.Range(glitterSpeed.x,glitterSpeed.y);
				var spdz:float=Random.Range(glitterSpeed.x,glitterSpeed.y);	
				f.ShootGlitter(Vector3(spdx,spdy,spdz),lf);
			}
			else{
				var dir:Vector3=Vector3(Random.value-0.5,Random.value-0.5,Random.value-0.5);
				f.ShootGlitter(glitterSpeed.x*dir.normalized,lf);
				
			}
			//dir.normalized;
			//Debug.Log(life);
			
		}

		this.GetComponent.<AudioSource>().PlayOneShot(explosionClips[Random.Range(0,explosionClips.Length)]);
		stage=2;
		
		body.Sleep();
		
		head.intensity=1;
		head.range=100;
		smoke.emit=false;
	}

}