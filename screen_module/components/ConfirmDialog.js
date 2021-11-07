import { TextBox } from "./TextBox.js";

class ConfirmDialog {

    constructor(screen, msg) {
        this.screen = screen;
        this.msg = msg;
        this.dialog = screen.addTextBox(0, 0, msg + "\n\n\n\n");
        this.confirm = screen.addButton(0, 0, "OK");


        this.dialog.x = this.screen.width/2 - this.dialog.width/2;
        this.dialog.y = this.screen.height/2 - this.dialog.height/2;

        this.confirm.x = this.screen.width/2 - this.confirm.width/2;
        this.confirm.y = this.dialog.y + this.dialog.height - this.confirm.height - 8;

        this.confirm.setMouseUp(() => this.closeDialog());
    }

    closeDialog() {
        this.screen.removeObject(this.dialog);
        this.screen.removeObject(this.confirm);
    }
    
}

export {ConfirmDialog}