export class BaseLayer {
    static inc = 0;
    constructor(aLayer) {
        this.layer = aLayer;
        this.className = this.constructor.name;
    }


}