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

    changeColor(piece, colorToBe, imageToBe){
        // debugger
        if(!colorToBe){
            piece.css({
                'background-img': imageToBe,
            });
        }else {
            piece.css({
                'background-color': colorToBe,
            });
        }
        return piece.pieceDOM
    }
}