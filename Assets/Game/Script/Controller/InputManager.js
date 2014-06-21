#pragma strict

var fg:FireworkGenerator;

function Start () {

}

function Update () {
	
	var hit : RaycastHit;
	var ray:Ray = Camera.main.ScreenPointToRay(Input.mousePosition);
	if (Physics.Raycast (ray,hit, 2000)) {
		if (hit.collider.CompareTag("Screen")){
			Debug.DrawLine (transform.position, hit.point);
			//Debug.Log("hit: "+hit.point);
			if (Input.GetMouseButtonDown(0)){
				fg.FireFirework(fg.transform.position,hit.point,50,ExplosionType.Normal,PathType.Throw);
				//fg.FireFirework(fg.transform.position,hit.point,100,ExplosionType.Normal,PathType.Straight);
			}
		}
		//print ("There is something in front of the object!");
	}

}