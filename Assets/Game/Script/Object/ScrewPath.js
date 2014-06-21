#pragma strict

class ScrewPath extends CustomPath{
	override function GetPathPos(_dist:float,_total:float):Vector3{
		var tmpPos:Vector3;
		var rotation :Quaternion=Quaternion.FromToRotation (Vector3.up, targetDir);
		var translation:Vector3=startPos;
		
		//var scale:Vector3=Vector3(dir.magnitude,1,1);
		var scale:Vector3=Vector3(1,1,1);
		
		var m:Matrix4x4 = Matrix4x4.TRS(translation, rotation, scale);

		//var targetDir:Vector3=targetPos-myTransform.position;

		var circleDist:float=50;
		var curCircleDist:float=_dist%circleDist;
		var circleLerp:float=curCircleDist/circleDist;
		var angle:float=circleLerp*2*Mathf.PI;
		tmpPos.x=2*Mathf.Cos(angle);
		tmpPos.z=2*-Mathf.Sin(angle);
		tmpPos.y=_dist;
		return m.MultiplyPoint(tmpPos);
	}





}