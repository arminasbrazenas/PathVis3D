function Grid()
{
    this.create = () => {
        //-- Clean Scene --//
        for (var i = 0; i < nodes.length; i++)
            objects.splice(objects.indexOf(nodes[i]), 1);
        nodes = [];
        scene.remove(this.nodeMesh);
        scene.remove(this.borderMesh);

        //-- Create Nodes --//
        this.nodeGeometries = new THREE.Geometry();
        for (var y = 0; y < this.maxHeight; y++)
        {
            for (var x = 0; x < this.maxWidth; x++)
            {
                if (y < this.height && x < this.width)
                {
                    this.nodeGeometries.mergeMesh(this.allNodes[y * this.maxHeight + x]);
                    objects.push(this.allNodes[y * this.maxHeight + x]);
                    nodes.push(this.allNodes[y * this.maxHeight + x]);
                }
            }
        }
        this.nodeMesh = new THREE.Mesh(this.nodeGeometries, this.nodeMaterial);
        
        //-- Create Borders --//
        this.borderGeometries = new THREE.Geometry();
        for (var y = 0; y <= this.height; y++)
        {
            this.borderGeometries.vertices.push(new THREE.Vector3(-CUBE_LENGTH / 2 + y * CUBE_LENGTH, 0, CUBE_LENGTH / 2));
            this.borderGeometries.vertices.push(new THREE.Vector3(-CUBE_LENGTH / 2 + y * CUBE_LENGTH, 0, CUBE_LENGTH / 2 - this.width * CUBE_LENGTH));
        }
    
        for (var x = 0; x <= this.width; x++)
        {
            this.borderGeometries.vertices.push(new THREE.Vector3(y * CUBE_LENGTH - CUBE_LENGTH * 1.5, 0, CUBE_LENGTH / 2 - CUBE_LENGTH * x));
            this.borderGeometries.vertices.push(new THREE.Vector3(-CUBE_LENGTH / 2, 0, CUBE_LENGTH / 2 - CUBE_LENGTH * x));
        }
        this.borderMesh = new THREE.LineSegments(this.borderGeometries, this.borderMaterial);

        //-- Add To Scene --//
        scene.add(this.nodeMesh);
        scene.add(this.borderMesh);
    }

    this.onResize = () => {
        this.reset();
        setLightAndCameraPositions();
    }

    this.reset = () => {
        this.create();
        start.resetPosition();
        finish.resetPosition();
        this.clear();
    }

    this.clear = () => {
        clearPath();
        walls.removeAll();  
    }

    this.nodeGeometry = new THREE.BoxGeometry(CUBE_LENGTH, CUBE_LENGTH, 0);
    this.nodeMaterial = new THREE.MeshBasicMaterial( { transparent: true, opacity: 0 } );
    this.nodeGeometry.rotateX(Math.PI / 2);

    this.borderMaterial = new THREE.LineBasicMaterial( { color: 0xd1d1d1 } );

    this.nodeMesh = new THREE.Mesh(this.nodeGeometries, this.nodeMaterial);

    const HEIGHT_SLIDER = document.getElementById("height-slider");
    this.maxHeight = parseInt(HEIGHT_SLIDER.max);
    document.getElementsByClassName("height-value")[0].innerHTML = parseInt(HEIGHT_SLIDER.value);
    HEIGHT_SLIDER.oninput = () => {
        this.height = parseInt(HEIGHT_SLIDER.value);
        document.getElementsByClassName("height-value")[0].innerHTML = this.height;
        this.onResize();
    }

    const WIDTH_SLIDER = document.getElementById("width-slider")
    this.maxWidth = parseInt(WIDTH_SLIDER.max); 
    document.getElementsByClassName("width-value")[0].innerHTML = parseInt(WIDTH_SLIDER.value);
    WIDTH_SLIDER.oninput = () => {
        this.width = parseInt(WIDTH_SLIDER.value);
        document.getElementsByClassName("width-value")[0].innerHTML = this.width;
        this.onResize();
    }

    this.height = parseInt(HEIGHT_SLIDER.value);
    this.width = parseInt(WIDTH_SLIDER.value);

    this.allNodes = [];
    for (var y = 0; y < this.maxHeight; y++)
    {
        for (var x = 0; x < this.maxWidth; x++)
        {
            this.node = new THREE.Mesh(this.nodeGeometry);
            this.node.position.set(y * CUBE_LENGTH, 0, -x * CUBE_LENGTH);
            this.node.updateMatrixWorld(true);
            this.allNodes.push(this.node);
        }
    }  

    this.create();
}