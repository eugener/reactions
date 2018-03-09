import { Action } from './Action';
import { AntdElementFactory } from './AntdElementFactory';

export interface ElementFactory {
    toButton(action: Action, iconOnly: boolean ): JSX.Element;
    // toMenuItem( action: Action, key: number ): JSX.Element;
    // toMenu( actions: Action[] ): JSX.Element;
}

export class ActionTools {

    private static elementFactory: ElementFactory = new AntdElementFactory();

    // TODO Add an ability to switch factories

    /**
     * Converts action into button
     * @param action action to convert 
     * @param iconOnly show only icon if one exists
     */
    static toButton(action: Action, iconOnly: boolean = false ) { 
        return this.elementFactory.toButton(action, iconOnly);
    }

    // static toMenuItem( action: Action, key: number ) {
    //     return this.elementFactory.toMenuItem(action, key);
    // }

    // static toMenu( actions: Action[] ) {
    //     return this.elementFactory.toMenu(actions);
    // }

}