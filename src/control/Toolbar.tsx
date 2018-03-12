import * as React from 'react';

import './Toolbar.css';

import { Action } from '../action/Action';
import { ActionTools } from '../action/ActionTools';

export interface ToolbarProps {
    actions: Action[];  // actions shown on the toolbar
    iconOnly?: boolean; // defines if only icon is shown
}

// TODO Check action
// TODO Radio action
export class Toolbar extends React.Component<ToolbarProps> {

    render() {
        // show icons only by default
        let iconOnly = this.props.iconOnly ? this.props.iconOnly : true;
        return (
            <div className="toolbar">
                {this.props.actions.map( a => ActionTools.toButton(a, iconOnly))}
            </div>
        );
    }

}
