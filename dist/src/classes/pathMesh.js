function Path () {
    this.addAllVisited = (path) => {
        for (var i = 0; i < path.length; i++)
        {
            var mesh = new THREE.Mesh(this.geometry, this.material.clone());
            mesh.receiveShadow = true;
            mesh.castShadow = true;
            mesh.position.set(parseInt(path[i] / grid.width) * CUBE_LENGTH, CUBE_LENGTH / 16, path[i] % grid.width * -CUBE_LENGTH);
            scene.add(mesh);

            this.all.push(mesh);
        }
    }

    this.animate = (index) => {
        TweenMax.to(this.all[index].scale, {duration: 0.5, x: 1, y: 2, z: 1});
        TweenMax.to(this.all[index].position, {duration: 0.5, y: CUBE_LENGTH / 8});
        TweenMax.fromTo(this.all[index].material.color, {r: 54 / 255, g: 174 / 255, b: 235 / 255}, {duration: 0.5, r: 58 / 255, g: 113 / 255, b: 202 / 255});
    }

    this.init = () => {
        for (var i = 0; i < this.all.length; i++)
        {
            scene.remove(this.all[i]);
            this.all[i].material.dispose();
            this.all[i].geometry.dispose();
            this.all[i] = undefined;
        }

        this.all = [];
    }

    this.geometry = searchMesh.geometry;
    this.material = searchMesh.material;

    this.all = [];
}