function Mouse()
{
    this.initProperties = () => {
        this.isDown = false;
        this.isDownOnStart = false;
        this.isDownOnFinish = false;
        this.isDownOnGrid = false;
        this.isOnSettings = false;
        this.isMiddleDown = false;
    }

    this.findIntersects = (event) => {
        if (isSettingsOpen == true)
            threeMouse.x = (event.clientX / (window.innerWidth - 500)) * 2 - 1;
        else
            threeMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        threeMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(threeMouse, camera);
        this.intersects = raycaster.intersectObjects(objects);
    }

    this.onDown = (event) => {
        this.findIntersects(event);

        this.isDown = true;
        this.isDownOnGrid = false;
        if (event.button == 1) this.isMiddleDown = true;

        if (this.intersects.length > 0 && this.isMiddleDown == false && this.isOnSettings == false && isRunning == false && isTutorialOpen == false)
        {
            this.isDownOnGrid = true;
            controls.rotateSpeed = 0;
    
            const intersectObject = this.intersects[0].object;

            if (intersectObject.name.includes("start"))
                this.isDownOnStart = true;
            else if (intersectObject.name.includes("finish"))
                this.isDownOnFinish = true;
            else if (intersectObject.name.includes("wall"))
                walls.remove(intersectObject);
            else
                walls.add(intersectObject);
        }
    }

    this.onMove = (event) => {
        this.findIntersects(event);

        if (this.intersects.length == 0 && this.isDownOnGrid == false)
            controls.rotateSpeed = 0.8;
        if (((this.intersects.length > 0 && this.isDown == false) || this.isDownOnGrid== true) && isRunning == false && isTutorialOpen == false
        && (this.isOnSettings == false || (this.isDownOnGrid == true && this.isOnSettings == true)))
            document.body.style.cursor = "pointer";
        else
            document.body.style.cursor = "auto";
        
        if (this.isDown == true && this.intersects.length > 0 && this.isMiddleDown == false && this.isOnSettings == false && isRunning == false && isTutorialOpen == false)
        {
            const intersectObject = this.intersects[0].object;

            if (this.isDownOnStart == true || this.isDownOnFinish == true)
            {
                if (this.isDownOnStart == true && intersectObject.id != finish.mesh.id && (intersectObject.position.x != start.mesh.position.x || intersectObject.position.z != start.mesh.position.z))
                    start.changePosition(intersectObject);
                if (this.isDownOnFinish == true && intersectObject.id != start.mesh.id && (intersectObject.position.x != finish.mesh.position.x || intersectObject.position.z != finish.mesh.position.z))
                    finish.changePosition(intersectObject);
            }
    
            else if (intersectObject.name == "" && this.isDownOnGrid == true && keyboard.isDDown == false)
                walls.add(intersectObject);
    
            else if (intersectObject.name.includes("wall") && keyboard.isDDown == true)
                walls.remove(intersectObject);          
        }
    }

    document.getElementsByClassName("settings-overlay")[0].addEventListener("mousemove", () => {
        this.isOnSettings = true;
    });
    
    document.getElementsByClassName("settings-overlay")[0].addEventListener("mouseleave", () => {
        this.isOnSettings = false;
    });

    this.initProperties();

    document.addEventListener("mousemove", this.onMove, false);
    document.addEventListener("mousedown", this.onDown, false);
    document.addEventListener("mouseup", this.initProperties, false);
}