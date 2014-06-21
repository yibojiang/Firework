#pragma strict

protected var startPos:Vector3;
protected var endPos:Vector3;
protected var speed:float;
protected var dist:float;
protected var totalDist:float;
protected var targetDir:Vector3;


protected var timer:float;
protected var totalTime:float;

protected var stage:int;

function GetPathPos(_timer:float,_totalTime:float):Vector3{
	

	return Vector3(0,0,0);
}

function InitPath(_startPos:Vector3,_endPos:Vector3,_speed:float){
	startPos=_startPos;
	endPos=_endPos;
	targetDir=_endPos-_startPos;
	speed=_speed;
	dist=0;
	
	totalDist=Vector3.Distance(_startPos,_endPos);

	timer=0;
	totalTime=totalDist/speed;
	stage=0;


}

function Update(){
	if (stage==0){
		if (dist<totalDist){
			dist+=speed*Time.deltaTime;
			transform.position=GetPathPos(dist,totalDist);
		}
		else{
			this.gameObject.SendMessage("Explosion");
			stage=1;
		}	
	}
}