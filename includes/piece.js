class Piece{
    constructor(playerObj){
        this.pieceDOM=null;
        this.owner=playerObj;

        // return this.renderPiece();
    }
    renderPiece(divClicked){
        var squareClicked = $(divClicked.target)
        this.pieceDOM = $("<div>",{
            'class':'piece',
            'coord': squareClicked.attr('coord'),
        });
        this.pieceDOM.attr({
            player: this.owner.num,
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
        return piece
    }
}