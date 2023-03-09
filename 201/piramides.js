/**
 * Geometria: Construye una geometria THREEJS y la retorna
 * ENTRADAS: vx = Arreglo de vertices para la geometria (arreglo de arreglos)
 * SALIDA: geom = Geometria generada a partir de vx 
 * @param {*} vx 
 * @returns 
 */
function Geometria(vx){ 
    geom = new THREE.Geometry(); 
        return geom;
    }

/**
 * Traslacion: Construye la matriz de traslacion THREEJS para el vector vt y la retorna
 * ENTRADA: vt = Vector de traslacion (es un arreglo de enteros) 
 * SALIDA: MatrizT = Matriz de traslacion para el vector vt
 */
function Traslacion(vt){
    var matrizT = new THREE.Matrix4();
    vt=int([x,y,z]);
    matrizT.set(1, 0, 0, x,
                0, 1, 0, y,
                0, 0, 1, z,
                0, 0, 0, 1);
    
    Piramide.applyMatrix(matrizT);
    return MatrizT;
}

/**
 * Escalado: Aplica el vector de escalado vs al objeto figura
 * ENTRADA:  figura = Objeto tipo THREE.Line que representa el objeto grafico
 *           posini = Posicion inicial de fig (array de enteros)
 *           vs = Vector de escalado (es un arreglo de enteros) 
 * SALIDA:  = 
 */
function escaladoReal(figura , posini, vs){
    tr = [(-posini[0], -posini[1], -posini[2])]; //Vector para llevar al origen
    figura.applyMatrix(Traslacion(tr));
    figura.applyMatrix(Escalado(vs));
    tr2 = [(posini[0], posini[1], posini[2])];
    figura.applyMatrix(Traslacion(tr2)); //otra forma: figura.applyMatrix(Traslacion(posini));
}

/**
 * Escalado: Construye la matriz de escalado THREEJS para el vector vs y la retorna
 * ENTRADA: vs = Vector de escalado (es un arreglo de enteros) 
 * SALIDA: MatrizT = Matriz de escalado para el vector vs
 */
function Escalado(vs){
    var matrizS = new THREE.Matrix4();
    matrizS.set(vs[0], 0, 0, 0,
                0, vs[1], 0, 0,
                0, 0, vs[2], 0,
                0, 0, 0, 1);

            Piramide.applyMatrix(matrizS);
    return matrizS
}
function init() {

    // Escena
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);    
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);

    var size = 700;
    var arrowSize = 40;
    var divisions = 20;
    var origin = new THREE.Vector3( 0, 0, 0 );
    var x = new THREE.Vector3( 1, 0, 0 );
    var y = new THREE.Vector3( 0, 1, 0 );
    var z = new THREE.Vector3( 0, 0, 1 );
    var color2 = new THREE.Color( 0x333333 );  /// 0x333333
    var colorR = new THREE.Color( 0xAA0000 );
    var colorG = new THREE.Color( 0x00AA00 );
    var colorB = new THREE.Color( 0x0000AA );

    //Crear la Grilla
    var gridHelperXZ = new THREE.GridHelper( size, divisions, color2, color2);

    //Flechas
    var arrowX = new THREE.ArrowHelper( x, origin, arrowSize, colorR );
    var arrowY = new THREE.ArrowHelper( y, origin, arrowSize, colorG );
    var arrowZ = new THREE.ArrowHelper( z, origin, arrowSize, colorB );
		
    //Cámara
    camera.position.x = 000;
    camera.position.y = 100;
    camera.position.z = 400;
    camera.lookAt(scene.position);

    //Creación de las Figuras
    //Geometria de la piramide
    lado=30; //lado de la base de la piramide
    h=45; //altura de la piramide
    [v1, v2, v3, v4, v5] = [[0,0,0],[lado,0,0],[lado,0,lado],[0,0,lado],[lado/2,h,lado/2]];
    var vertices = [v1, v2, v3, v4, v5];
    geoPiramide = Geometria(vertices);

    //Colores
    color=[{color:0xFF0000},{color:0xFF00ff}];

    //Material para las pirámides
    material=[];
    for(i=0; 1<2;i++){
        material.push(new THREE.ParticleBasicMaterial(color[i]));
    }

    //Figuras para las pirámides
    Piramide=[];
    for(i=0; 1<2;i++){
        Piramide.push(new THREE.Line(geomPiramide,material[i]));
    }

    //Girar la segunda piramide
    //piramide[1].app

    /* 
    Geometria4 = new THREE.Geometry();
    var vertices = [[0,0,0],[-40,0,40],[40,0,40],[80,0,0],[0,0,0],
                    [20,80,20],[40,0,40],[-40,0,40],[20,80,20],[80,0,0]
                    ];
    var largoVertice = vertices.length;
    for(i =0; i< largoVertice;i++){
        x = vertices[i][0];
        y = vertices[i][1];
        z = vertices[i][2];
        vector = new THREE.Vector3(x, y, z);
        Geometria4.vertices.push(vector);
    }

    Material4=new THREE.ParticleBasicMaterial({color:0xFF00ff});
    Cuadrado4 = new THREE.Line(Geometria4,Material4);       

    // Matriz de Rotación
    //Eje z
    var matrizR = new THREE.Matrix4();
    var alpha = 0;
	var cs = Math.cos(alpha);
	var ss = Math.sin(alpha);

	matrizR.set(cs, -ss, 0, 0,
    		    ss, cs, 0, 0, 
			    0, 0, 1, 0,
			    0, 0, 0, 1);	

    Cuadrado4.applyMatrix(matrizR);
     */
    // En el documento HTML
    document.body.appendChild(renderer.domElement);

    // Agregar elementos al escenario
    scene.add(gridHelperXZ);
    scene.add(arrowX);
	scene.add(arrowY);
	scene.add(arrowZ);
    for(i=0; i<2; i++){
        scene.add(Piramide[i]);
    }
    
    renderer.render(scene, camera);
}

init();  // otra forma: window.onload = init;