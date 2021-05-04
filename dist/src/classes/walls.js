function Walls()
{
    this.add = (intersectObject) => {
        pathMesh.clear();
        let wallMesh = new THREE.Mesh(this.geometry);
        wallMesh.position.set(intersectObject.position.x, CUBE_LENGTH / 2, intersectObject.position.z);
        wallMesh.name = `${intersectObject.id} wall`;
        wallMesh.updateMatrixWorld(true);

        wallGeometries.push(wallMesh);    
        objects.push(wallMesh);        

        let dummyMesh = wallMesh.clone();
        dummyMesh.material = this.material;
        dummyMesh.name = wallMesh.id;
        dummyMesh.castShadow = true;
        dummyMesh.receiveShadow = true;

        scene.add(dummyMesh);

        TweenMax.fromTo(dummyMesh.scale, {y: 0}, {duration: this.animationSpeed, y: 1.25});
        TweenMax.fromTo(dummyMesh.position, {y: 0}, {duration: this.animationSpeed, y: CUBE_LENGTH / 2 + CUBE_LENGTH / 8});
        TweenMax.to(dummyMesh.scale, {duration: this.animationSpeed, y: 1, z: 1, x: 1, delay: this.animationSpeed});
        TweenMax.to(dummyMesh.position, {duration: this.animationSpeed, y: CUBE_LENGTH / 2, delay: this.animationSpeed});
        setTimeout(() => {
            if (dummyMesh.parent != null)
            {
                scene.remove(dummyMesh);
                
                this.walls.geometry.mergeMesh(wallMesh);
                this.addToScene();
            }
        }, this.animationSpeed * 2000)
    }

    this.addNoAnimation = (intersectObject) => {
        let wallMesh = new THREE.Mesh(this.geometry);
        wallMesh.position.set(intersectObject.position.x, CUBE_LENGTH / 2, intersectObject.position.z);
        wallMesh.castShadow = true;
        wallMesh.receiveShadow = true;

        this.nodeId = intersectObject.name.match(/\d/g);
        this.nodeId = parseInt(this.nodeId.join(""));

        wallMesh.name = `${this.nodeId} wall`;
        wallMesh.updateMatrixWorld(true);

        wallGeometries.push(wallMesh);    
        objects.push(wallMesh); 
        
        this.walls.geometry.mergeMesh(wallMesh);
        this.addToScene();
    }

    this.addNonmerge = (object) => {
        let wallMesh = new THREE.Mesh(this.geometry, this.material);
        wallMesh.position.set(object.position.x, CUBE_LENGTH / 2, object.position.z);     

        wallMesh.castShadow = true;
        wallMesh.receiveShadow = true;
        wallMesh.name = `${object.id} wall`;

        this.nonmerge.push(wallMesh);
        scene.add(wallMesh);

        TweenMax.fromTo(wallMesh.scale, {y: 0}, {duration: this.animationSpeed, y: 1.25});
        TweenMax.fromTo(wallMesh.position, {y: 0}, {duration: this.animationSpeed, y: CUBE_LENGTH / 2 + CUBE_LENGTH / 8});
        TweenMax.to(wallMesh.scale, {duration: this.animationSpeed, y: 1, z: 1, x: 1, delay: this.animationSpeed});
        TweenMax.to(wallMesh.position, {duration: this.animationSpeed, y: CUBE_LENGTH / 2, delay: this.animationSpeed});

        return this.nonmerge.length - 1;
    }

    this.remove = (intersectObject) => {
        pathMesh.clear();
        scene.remove(scene.getObjectByName(intersectObject.id));
        
        wallGeometries.splice(wallGeometries.indexOf(intersectObject), 1);
        objects.splice(objects.indexOf(intersectObject), 1);
        
        this.init();

        for (var i = 0; i < wallGeometries.length; i++)
            this.walls.geometry.mergeMesh(wallGeometries[i]);
        this.addToScene();      
    }
    
    this.removeAll = () => {
        for (var i = 0; i < wallGeometries.length; i++)
            objects.splice(objects.indexOf(wallGeometries[i]), 1);
        wallGeometries = [];

        this.init();

        this.addToScene();
    }

    this.removeNonmerge = (index) => {
        scene.remove(this.nonmerge[index]);
        this.nonmerge[index] = undefined;
    }

    this.mergeAll = () => {
        for (var i = 0; i < this.nonmerge.length; i++)
        {
            if (this.nonmerge[i] != undefined)
            {
                var wallMesh = new THREE.Mesh(this.nonmerge[i].geometry);
                wallMesh.position.copy(this.nonmerge[i].position);
                wallMesh.name = this.nonmerge[i].name;
                wallMesh.updateMatrixWorld(true);

                wallGeometries.push(wallMesh);    
                objects.push(wallMesh); 
    
                this.walls.geometry.mergeMesh(wallMesh);
    
                scene.remove(this.nonmerge[i]);
                this.nonmerge[i].geometry.dispose();
                this.nonmerge[i].material.dispose();
                this.nonmerge[i] = undefined;
            }
        }
        this.nonmerge = [];
        this.addToScene();
    }

    this.init = () => {
        if (this.walls)
        {
            this.walls.geometry.dispose();
            this.walls.material.dispose();
            scene.remove(this.walls);
            this.walls = undefined;
        }

        this.animationSpeed = 0.4;
        this.walls = new THREE.Mesh(new THREE.Geometry(), this.material);
        this.walls.castShadow = true;
        this.walls.receiveShadow = true;  
    }

    this.addToScene = () => {
        this.walls.frustumCulled = false;
        this.walls.geometry.elementsNeedUpdate = true;
        if (wallGeometries.length != 0)
            scene.add(this.walls)
    }

    this.geometry = new THREE.BoxGeometry(CUBE_LENGTH, CUBE_LENGTH, CUBE_LENGTH);
    this.material = new THREE.MeshPhongMaterial( { color: 0xD5A353 } );
    this.nonmerge = [];

    this.init();
}