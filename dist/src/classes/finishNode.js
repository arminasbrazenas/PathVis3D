function FinishNode()
{
    this.resetPosition = () => {
        this.mesh.position.set(nodes[nodes.length - 1].position.x, CUBE_LENGTH / 4, nodes[nodes.length - 1].position.z);
        this.mesh.name = `${nodes[nodes.length - 1].id} finish`;
        this.nodeId = nodes[nodes.length - 1].id;

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
                this.mesh.name = `${this.nodeId} finish`;
    
                this.lastNode = intersectObject;
                walls.remove(intersectObject);
            }
            else
            {
                this.mesh.name = `${intersectObject.id} finish`;
                this.nodeId = intersectObject.id;
                this.lastNode = undefined;
            }
    
            this.mesh.position.set(intersectObject.position.x, CUBE_LENGTH / 4, intersectObject.position.z);
        }
    }

    this.geometry = new THREE.BoxGeometry(CUBE_LENGTH, CUBE_LENGTH / 2, CUBE_LENGTH);
    this.material = new THREE.MeshPhongMaterial( { color: 0x539263 } );

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    this.resetPosition();

    this.nodeId = nodes[nodes.length - 1].id;
    this.lastNode = undefined;

    objects.push(this.mesh);
    scene.add(this.mesh);
}