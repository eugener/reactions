import * as React from 'react';

import { ElementFactory } from './ActionTools';
import { Action, ActionGroup } from './Action';
import { ActionButton, ActionGroupButton } from './AntdComponents';

export class AntdElementFactory implements ElementFactory {

    toButton(action: Action, iconOnly: boolean = true ): JSX.Element {
        let button;   
        if ( action instanceof ActionGroup ) {
            button = (<ActionGroupButton action={action as ActionGroup} iconOnly={iconOnly} />);
        } else {
            button = (<ActionButton action={action} iconOnly={iconOnly} /> );
        }
        return button;
    }

}