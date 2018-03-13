import { observable, computed } from 'mobx';

type ActionHandler = () => void;

export class Action {

    @observable text:        string  = '';
    @observable description: string  = '';
    @observable icon:        string  = '';
    @observable enabled:     boolean = true;
    @observable selected:    boolean = false;

    private handler: ActionHandler;

    constructor( text: string, icon?: string, description?: string, handler?: ActionHandler ) {
        this.text        = text ? text : '';
        this.description = description ? description : '';
        this.icon        = icon ? icon : '';
        if (handler) { this.handler = handler; }
    }

    execute(): void {
        if ( this.enabled && this.handler) { this.handler(); }
    }
}

class ActionContainer<T extends Action> extends Action {
    items: T[];
}

export class ActionGroup extends ActionContainer<Action> {

    readonly items: Action[];

    constructor( text: string, icon?: string, description?: string, ...actions: Action[] ) {
        super(text, icon, description);
        this.items = actions;
    }

    execute(): void { /* no-op */ }

}

export class ActionRadioGroup extends ActionContainer<Action> {

    @observable
    readonly items: Action[];

    constructor( ...actions: Action[] ) {
        super('');
        this.items = actions;
    }

    @computed get selection(): Action[] {
        let selection = this.items.find(i =>  i.selected);
        return selection ? [selection] : [];
    }

    execute(): void { /* no-op */ }

}