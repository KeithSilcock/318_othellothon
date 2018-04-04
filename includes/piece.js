class Piece{
    constructor(){
        this.pieceDOM=null;

        // return this.renderPiece();
    }
    renderPiece(){
        this.pieceDOM = $("<div>",{
            'class':'piece',

        });
        return this.pieceDOM
    }

    changeColor(colorToBe, imageToBe){
        if(!colorToBe){
            this.pieceDOM.css({
                'background-img': imageToBe,
            });
        }else {
            this.pieceDOM.css({
                'background-color': colorToBe,
            });
        }
        return this.pieceDOM
    }
}