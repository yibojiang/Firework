#pragma strict

class StraightPath extends CustomPath{
	override function GetPathPos(_dist:float,_total:float):Vector3{
		var lerp:float=_dist/_total;
		var tmpPos:Vector3;

		var rotation :Quaternion=Quaternion.FromToRotation (Vector3.up, targetDir);
		var translation:Vector3=startPos;
		var scale:Vector3=Vector3(1,1,1);
		
		var m:Matrix4x4 = Matrix4x4.TRS(translation, rotation, scale);

		
		tmpPos.y=_dist;
		return m.MultiplyPoint(tmpPos);	
	}





}