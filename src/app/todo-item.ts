export class TodoItem {

    constructor(
        public title: string, 
        public id: number = null, 
        public done = false) {
    }
        
}