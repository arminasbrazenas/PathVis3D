function StartNode()
{
    this.resetPosition = () => {
        this.mesh.position.set(nodes[0].position.x, CUBE_LENGTH / 4, nodes[0].position.z);
        this.mesh.name = `${nodes[0].id} start`;
        this.nodeId = nodes[0].id;

        this.lastNode = undefined;
    }

    this.changePosition = (intersectObject) => {
        if (isTutorialOpen == false)
        {
            pathMesh.clear();
            if (this.lastNode != undefined)
                walls.addNoAnimation(this.lastNode);
    
            if (intersectObject.name.includes("wall"))
            {
                this.nodeId = intersectObject.name.match(/\d/g);
                this.nodeId = parseInt(this.nodeId.join(""));
                this.mesh.name = `${this.nodeId} start`;
    
                this.lastNode = intersectObject;
                walls.remove(intersectObject);
            }
            else
            {
                this.mesh.name = `${intersectObject.id} start`;
                this.nodeId = intersectObject.id;
                this.lastNode = undefined;
            }
    
            this.mesh.position.set(intersectObject.position.x, CUBE_LENGTH / 4, intersectObject.position.z);
        }
    }

    this.geometry = new THREE.BoxGeometry(CUBE_LENGTH, CUBE_LENGTH / 2, CUBE_LENGTH);
    this.material = new THREE.MeshPhongMaterial( { color: 0xE35234 } );
    
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    this.resetPosition();

    this.nodeId = nodes[0].id;
    this.lastNode = undefined;

    objects.push(this.mesh);
    scene.add(this.mesh);
}
