import * as React from 'react';

import { observer } from 'mobx-react';
import { enableLogging } from 'mobx-logger';

import Button from 'antd/lib/button';
import Tooltip from 'antd/lib/tooltip';
import Dropdown from 'antd/lib/dropdown';
import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';

import { Action, ActionGroup } from './Action';

const MenuItem = Menu.Item;

enableLogging({});

export interface ActionProps<T extends Action> {
    action: T;
}

export interface ActionButtonProps<T extends Action> extends ActionProps<T> {
    iconOnly?: boolean;
}

/**
 * Action button decorator
 * Allows for binding actions properties to a button
 */
@observer
export class ActionButton extends React.Component<ActionButtonProps<Action>> {

    render() {

        let action = this.props.action;
        let text   = this.props.iconOnly && action.icon.length > 0 ? null : action.text;

        return (
            <Tooltip placement="bottom" title={action.description} key={'action-button-' + new Date().getTime}>
                <Button 
                    icon={action.icon} 
                    disabled={!action.enabled} 
                    onClick={e => { action.execute(); }} 
                > 
                {text}
                </Button>
            </Tooltip>
        );

    }

}

export interface ActionMenuItemProps<T extends Action> extends ActionProps<T> {
    key: number;
}

@observer
export class ActionMenuItem extends React.Component<ActionMenuItemProps<Action>> {

    render() {
        let action = this.props.action;
        // disabled={!action.enabled}
        return (
            <Menu.Item key={this.props.key} icon={action.icon}>
                <Icon type={action.icon}/> {action.text}
            </Menu.Item> 
        );
    }

}

@observer
export class ActionGroupButton extends React.Component<ActionButtonProps<ActionGroup>> {

    render() {

        let action = this.props.action;
        let text   = this.props.iconOnly && action.icon.length > 0 ? null : action.text;
        let actions = action.items;

        // <ActionMenuItem action={a} key={key + 1} />
        let menu = (
            <Menu onClick={e => actions[+e.key].execute()}>
                {
                    actions.map( (a, key, arr) => 
                        <MenuItem key={key} disabled={!a.enabled}>
                            <Icon type={a.icon}/> {a.text}
                        </MenuItem>
                    )
                };
            </Menu>

            // <Button>text</Button>
        );

        return (
            <Dropdown overlay={menu}> 
                <Button icon={action.icon} disabled={!action.enabled}>
                {text} <Icon type="down" />
                </Button>
            </Dropdown>    
        );

    }

}
