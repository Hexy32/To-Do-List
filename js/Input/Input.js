const input = document.getElementById('input');
const emptyStarSVG = document.querySelectorAll('.input-star')[0];
const starSVG = document.querySelectorAll('.input-star')[1];
export default class Input {
    element;
    isStarred;
    constructor() {
        this.element = input;
        this.isStarred = false;
        emptyStarSVG.addEventListener('click', () => {
            this.star();
        });
        starSVG.addEventListener('click', () => {
            this.unStar();
        });
    }
    get value() {
        return this.element.value;
    }
    clear() {
        this.element.value = '';
        this.unStar();
    }
    star() {
        emptyStarSVG.style.display = 'none';
        starSVG.style.display = 'block';
        this.isStarred = true;
    }
    unStar() {
        starSVG.style.display = 'none';
        emptyStarSVG.style.display = 'block';
        this.isStarred = false;
    }
}
