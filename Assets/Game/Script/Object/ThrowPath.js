#pragma strict

class ThrowPath extends CustomPath{
	private var gravity:float;
	private var initVel:Vector3;

	function InitPath(_startPos:Vector3,_endPos:Vector3,_speed:float){
		startPos=_startPos;
		endPos=_endPos;
		targetDir=_endPos-_startPos;
		speed=_speed;
		dist=0;
		
		totalDist=Vector3.Distance(_startPos,_endPos);
		
		timer=0;
		
		stage=0;

		initVel=GetInitVel(_speed,9.8,_startPos,_endPos);

		var tmpDist:Vector3=targetDir;
		var tmpVel:Vector3=initVel;
		tmpDist.y=0;
		tmpVel.y=0;

		totalTime=tmpDist.magnitude/tmpVel.magnitude;
	}

	function GetInitVel(speed:float,g:float,bp:Vector3,tp:Vector3):Vector3{
		gravity=g;
		var dir:Vector3=tp-bp;
		dir.y=0;
	    var dx:float=dir.magnitude;
	    var dy:float=tp.y-bp.y;
	    //var dz:float=tp.z-bp.z;
	    
	    //tempV: 便于简化计算的一个临时变量
	    var tempV:float=g*dx/(2*speed*speed);
	    
	    //根据一元二次方程会有两个解，对应一个角度较高和一个较低的两条抛物线，均可到达指定点
	    //这里为了便于应用两个角度的解都给出，一般只计算减法解即可
	    var ta1:float=(1+Mathf.Sqrt(1-4*tempV*(tempV+dy/dx)))/(2*tempV);
	    var ta2:float=(1-Mathf.Sqrt(1-4*tempV*(tempV+dy/dx)))/(2*tempV);
	    
	    //超出射程范围时无解，故需要判断（这里只取了减法解）
	    //if(!ta2){
		//	return null;
	    //}else{
	    //由于是用原始的反正切函数，所以需要判断一下象限，注意所得到的为弧度
			
	    //}

	    
	    var vel:Vector2;
	    if (float.IsNaN(ta2) ){
	    	vel.x=1;
	    	vel.y=0;
	    }
	    else{

	        vel.x=1;
	        vel.y=ta2*vel.x;
	    }
	    

	    /*
	    var vel:Vector2;
	    if (float.IsNaN(ta1) ){
	    	vel.x=1;
	    	vel.y=0;
	    }
	    else{

	        vel.x=1;
	        vel.y=ta1*vel.x;
	    }
		*/
	    vel=vel.normalized*speed;
	    dir=dir.normalized*vel.x;
	    dir.y=vel.y;
	    return dir;
	}

	//_speed:float,_timer:float
	override function GetPathPos(_timer:float,_totalTime:float):Vector3{
		var tmpPos:Vector3;


		//var rotation :Quaternion=Quaternion.FromToRotation (Vector3.up, targetDir);
		var rotation:Quaternion=Quaternion.identity;
		var translation:Vector3=startPos;
		
		//var scale:Vector3=Vector3(dir.magnitude,1,1);
		var scale:Vector3=Vector3(1,1,1);
		
		var m:Matrix4x4 = Matrix4x4.TRS(translation, rotation, scale);

		
		//tmpPos.x=2*Mathf.Cos(angle);
		//tmpPos.z=2*-Mathf.Sin(angle);
		//tmpPos=targetDir.normalized()*initVel;

		tmpPos.x=_timer*initVel.x;
		tmpPos.z=_timer*initVel.z;
		tmpPos.y=_timer*initVel.y-_timer*_timer*gravity/2;;
		
		return m.MultiplyPoint(tmpPos);
	}

	override function Update(){
		if (stage==0){
			if (timer<totalTime){
				timer+=Time.deltaTime;
				transform.position=GetPathPos(timer,totalTime);
			}
			else{
				this.gameObject.SendMessage("Explosion");
				stage=1;
			}	
		}
	}
}