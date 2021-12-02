import { Button } from "../screen_module/components/Button";

class DeleteButton extends Button {

    constructor(editor) {
        super(editor.screen, editor.testButton.x+editor.testButton.width, editor.testButton.y, 'Delete');

        this.delete = false;

        this.setMouseUp(() => {this.delete = !this.delete});
    }

    drawForeground() {

        if (this.delete) {
            this.bgColor = 'red';
        }

        super.drawForeground();
    }

}

export {DeleteButton}