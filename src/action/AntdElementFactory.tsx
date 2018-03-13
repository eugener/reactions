import * as React from 'react';

import { ElementFactory } from './ActionTools';
import { Action, ActionGroup } from './Action';
import { ActionButton, ActionGroupButton } from './AntdComponents';

export class AntdElementFactory implements ElementFactory {

    toButton(action: Action, iconOnly: boolean ): JSX.Element {
        if ( action instanceof ActionGroup ) {
            return (<ActionGroupButton action={action as ActionGroup} iconOnly={iconOnly} />);
        } 
        return (<ActionButton action={action} iconOnly={iconOnly} /> );
    }

}