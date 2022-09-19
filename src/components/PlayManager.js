export default class Game {
    
    static getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    static generateTabAlt(numb, list){
        const tempList = [...list]
        const finalTable = [null, null, null,null,null, null, null,null,null];

        for (let index = 0; index < numb; index++) {
            let myIndex = this.getRandomInt(finalTable.length)
            while (finalTable[myIndex]) {
                myIndex = this.getRandomInt(finalTable.length)
            }
            const indexElement = this.getRandomInt(tempList.length)
            finalTable[myIndex] = tempList[indexElement] 
            tempList.splice(indexElement, 1);
        }
        return finalTable
    }

    static comparTabs(t1, t2, param = undefined){
        let result = true;

        if (param){
            for(const [index, item] of t2.entries()){
                if (item){
                    if (!t1[index] || item[param] !== t1[index][param]) {
                        result = false;
                        break;
                    }
                }
            }
        }else{

            for(const [index, item] of t2.entries()){
                if (item && t1[index]){
                    if (item != t1[index]){
                        result = false;
                        break;
                    } 
                }
            }
        }
        return result;
    }
}