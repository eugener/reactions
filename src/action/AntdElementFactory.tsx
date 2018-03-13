import * as React from 'react';

import { ElementFactory } from './ActionTools';
import { Action, ActionGroup, ActionRadioGroup } from './Action';
import { ActionButton, ActionGroupButton, ActionRadioButtonGroup } from './AntdComponents';

export class AntdElementFactory implements ElementFactory {

    get newId(): number { 
        // TODO Need better unique ids
        return new Date().getUTCMilliseconds() + Math.random(); 
    }

    toButton(action: Action, iconOnly: boolean ): JSX.Element {
        if ( action instanceof ActionGroup ) {
            return (<ActionGroupButton action={action as ActionGroup} iconOnly={iconOnly} key={this.newId} />);
        } 
        if ( action instanceof ActionRadioGroup ) {
            return (
                <ActionRadioButtonGroup action={action as ActionRadioGroup} iconOnly={iconOnly} key={this.newId} />
            );
        } 
        return (<ActionButton action={action} iconOnly={iconOnly} key={this.newId} /> );
    }

}