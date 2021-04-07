function SearchMesh()
{
    this.add = (nodeId) => {
        let singleMesh = new THREE.Mesh(this.geometry, this.material);
        singleMesh.position.set(parseInt(nodeId / grid.maxWidth) * CUBE_LENGTH, CUBE_LENGTH / 16, nodeId % grid.maxWidth * -CUBE_LENGTH);
        singleMesh.name = `${[parseInt(nodeId / grid.maxWidth) * grid.width + nodeId % grid.maxWidth]}`;

        let dummyMesh = singleMesh.clone();
        dummyMesh.material = this.material.clone();
        dummyMesh.material.color.setHex(0x4287f5);
        dummyMesh.receiveShadow = true;

        TweenMax.fromTo(dummyMesh.scale, {x: 1, y: 0, z: 1}, {duration: searchAnimationSpeed, x: 1, y: 4, z: 1});
        TweenMax.to(dummyMesh.scale, {delay: searchAnimationSpeed, duration: searchAnimationSpeed, x: 1, y: 1, z: 1});

        TweenMax.fromTo(dummyMesh.position, {y: 0}, {duration: searchAnimationSpeed, y: CUBE_LENGTH / 4});
        TweenMax.to(dummyMesh.position, {delay: searchAnimationSpeed, duration: searchAnimationSpeed, y: CUBE_LENGTH / 16});

        TweenMax.fromTo(dummyMesh.material.color, {r: 54 / 255, g: 174 / 255, b: 235 / 255}, {duration: searchAnimationSpeed, r: 58 / 255, g: 113 / 255, b: 202 / 255});
        TweenMax.to(dummyMesh.material.color, {duration: searchAnimationSpeed, delay: searchAnimationSpeed, r: 44 / 255, g: 60 / 255, b: 70 / 255});    

        scene.add(dummyMesh);

        searchObjects.push(singleMesh);

        setTimeout(() => {
            this.complete.geometry.mergeMesh(singleMesh);
            this.complete.geometry.elementsNeedUpdate = true;
            this.complete.frustumCulled = false;
            scene.add(this.complete);

            scene.remove(dummyMesh);
            dummyMesh.material.dispose();
            dummyMesh.geometry.dispose();
            dummyMesh = undefined;
        }, searchAnimationSpeed * 2 * 1000);
    }

    this.addNonmerge = (nodeId) => {
        if (searchObjects.find( ({ name }) => name === `${parseInt(nodeId / grid.maxWidth) * grid.width + nodeId % grid.maxWidth}`))
        {
            let singleMesh = searchObjects.find( ({ name }) => name === `${parseInt(nodeId / grid.maxWidth) * grid.width + nodeId % grid.maxWidth}`);
    
            TweenMax.fromTo(singleMesh.material.color, {r: 54 / 255, g: 174 / 255, b: 235 / 255}, {duration: searchAnimationSpeed, r: 58 / 255, g: 113 / 255, b: 202 / 255});
            TweenMax.to(singleMesh.material.color, {duration: searchAnimationSpeed, delay: searchAnimationSpeed, r: 44 / 255, g: 60 / 255, b: 70 / 255});    
        }

        else
        {
            let singleMesh = new THREE.Mesh(this.geometry, this.material.clone());
            singleMesh.position.set(parseInt(nodeId / grid.maxWidth) * CUBE_LENGTH, CUBE_LENGTH / 16, nodeId % grid.maxWidth * -CUBE_LENGTH);
            singleMesh.name = `${parseInt(nodeId / grid.maxWidth) * grid.width + nodeId % grid.maxWidth}`;
            singleMesh.receiveShadow = true;
    
            TweenMax.fromTo(singleMesh.scale, {x: 1, y: 0, z: 1}, {duration: searchAnimationSpeed, x: 1, y: 4, z: 1});
            TweenMax.to(singleMesh.scale, {delay: searchAnimationSpeed, duration: searchAnimationSpeed, x: 1, y: 1, z: 1});
    
            TweenMax.fromTo(singleMesh.position, {y: 0}, {duration: searchAnimationSpeed, y: CUBE_LENGTH / 4});
            TweenMax.to(singleMesh.position, {delay: searchAnimationSpeed, duration: searchAnimationSpeed, y: CUBE_LENGTH / 16});
    
            TweenMax.fromTo(singleMesh.material.color, {r: 54 / 255, g: 174 / 255, b: 235 / 255}, {duration: searchAnimationSpeed, r: 58 / 255, g: 113 / 255, b: 202 / 255});
            TweenMax.to(singleMesh.material.color, {duration: searchAnimationSpeed, delay: searchAnimationSpeed, r: 44 / 255, g: 60 / 255, b: 70 / 255});        
            
            scene.add(singleMesh);
    
            searchObjects.push(singleMesh);
        }
    }

    this.mergeAll = () => {
        for (var i = 0; i < searchObjects.length; i++)
        {
            let singleMesh = new THREE.Mesh(searchObjects[i].geometry);
            singleMesh.position.copy(searchObjects[i].position);
            singleMesh.name = searchObjects[i].name;
            singleMesh.receiveShadow = true;

            this.addToMesh(singleMesh);
            
            scene.remove(searchObjects[i]);
            searchObjects[i].material.dispose();
            searchObjects[i].geometry.dispose();
            searchObjects[i] = undefined;

            searchObjects[i] = singleMesh;
        }

        scene.add(this.complete);
    }

    this.addToMesh = (obj) => {
        this.complete.geometry.mergeMesh(obj);   
        this.complete.geometry.elementsNeedUpdate = true;
        this.complete.frustumCulled = false;
    }

    this.init = () => {
        if (this.complete)
        {
            this.complete.geometry.dispose();
            scene.remove(this.complete);
        }

        this.complete = new THREE.Mesh(new THREE.Geometry(), this.material);
        this.complete.receiveShadow = true;
    }

    this.material = new THREE.MeshPhongMaterial( { color: 0x2C3C4D } );
    this.geometry = new THREE.BoxGeometry(CUBE_LENGTH, CUBE_LENGTH / 8, CUBE_LENGTH);

    this.init();
}