export class Main {

    constructor(URL, Data) {

        this.Game = [];

        this.Game[0] = Data;

        this.pX = window.innerWidth / 11;
        this.pY =  window.innerHeight / 7;
        this.sizeBox = window.innerHeight / window.innerWidth * 60;

        this.playerPositionX = this.pX + (1 * this.sizeBox);
        this.playerPositionY = this.pY + (1 * this.sizeBox);

        // Posição do jogador linha(x): 1, coluna(y): 1 
        this.row = 1;
        this.colun = 1;

        this.status_error = document.getElementById('server_status');
        this.status_error.style.display = 'none';

        this.canvas = document.createElement('canvas');
        document.body.appendChild(this.canvas);
        this.canvas.height = window.innerHeight;
        this.canvas.width = window.innerWidth;
        this.canvas.style.backgroundColor = 'black';
        this.ctx = this.canvas.getContext('2d');

        window.addEventListener('resize', () => {

            this.canvas.height = window.innerHeight;
            this.canvas.width = window.innerWidth;

            // Atualizar os valores 
            this.pX = window.innerWidth / 11;
            this.pY = window.innerHeight / 7;
            this.sizeBox = window.innerHeight / window.innerWidth * 60;
            
            this.playerPositionX = this.pX + this.sizeBox;
            this.playerPositionY = this.pY + this.sizeBox;

            this.drawBackground();
            this.drawScore();
            this.drawPlayer();
        });

        Promise.all([this.loadImage(URL)])
            .then(Images => {
                this.Block = Images[0];
                this.drawBackground();
                this.drawScore();
                this.drawPlayer();
            })
            .catch(error => { 
                console.log('Error when loading images: ', error);
            });

            document.addEventListener('keydown', (event) => {

                switch(event.key) {
        
                    case 'CapsLock':
                        alert('CapsLock ativada');
                    break;
                
                    case 'a': 
                        console.log('Key pressed: a');

                        if(this.Game[0][this.row][this.colun - 1] === false) {
                            this.playerPositionX+= -this.sizeBox;
                            this.drawPlayer();
                            this.colun+= -1;
                        }

                    break;
                
                    case 'd': 
                        console.log('Key pressed: d');

                        if(this.Game[0][this.row][this.colun +1] === false) {
                            this.playerPositionX+= this.sizeBox;
                            this.drawPlayer();
                            this.colun+= 1;
                        }

                    break;
                
                    case 'w': 
                        console.log('Key pressed: w');

                        if(this.Game[0][this.row -1][this.colun] === false) {
                            this.playerPositionY+= -this.sizeBox;
                            this.drawPlayer();
                            this.row+= -1;
                        }

                    break;
                
                    case 's':
                        console.log('Key pressed: s');

                        if(this.Game[0][this.row + 1][this.colun] === false) {
                            this.playerPositionY+= this.sizeBox;
                            this.drawPlayer();
                            this.row+= 1;
                        }

                    break;

                    default: 
                        alert("Tecla inválida, utilize: [a] = ◀️, [d] = ▶️, [w] = 🔼, [s] = 🔽");
                }
        
            });

    }

    loadImage(URL) {

        return new Promise((resolve, reject) => {

            const Img = new Image();
            Img.src = URL;
            Img.onload = () => resolve(Img);
            Img.onerror = () => reject(new Error (`Cannot be load the image: ${URL}`));
        });

    }

    drawBackground() {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.Game[0].forEach((array, rowIndex) => {
            array.forEach((value, colIndex) => {
              if (value) {
                this.ctx.drawImage( this.Block, this.pX + (this.sizeBox * colIndex), this.pY + (this.sizeBox * rowIndex), this.sizeBox, this.sizeBox);
              }
            });
        });
    }

    drawPlayer() {
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.drawBackground();

        this.drawScore();

        this.ctx.fillStyle = 'blue';

        this.ctx.fillRect(this.playerPositionX, this.playerPositionY, this.sizeBox, this.sizeBox);
    }

    drawScore() {

        this.ctx.fillStyle = 'blue';

        this.ctx.fillRect(30, 20, 400, 20);

        this.ctx.strokeStyle = 'red';

        this.ctx.lineWidth = 3;

        this.ctx.strokeRect(30, 20, 400, 20);

    }

}




