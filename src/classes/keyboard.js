function Keyboard()
{
    this.onKeyDown = (event) => {
        var keyCode = event.which;
        if (keyCode == 68)
            this.isDDown = true;
    }

    this.onKeyUp = (event) => {
        var keyCode = event.which;
        if (keyCode == 68)
            this.isDDown = false;
    }

    this.isDDown = false;

    document.addEventListener("keydown", this.onKeyDown, false);
    document.addEventListener("keyup", this.onKeyUp, false);
}