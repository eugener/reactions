import * as React from 'react';

import { observer } from 'mobx-react';

import Button from 'antd/lib/button';
import Tooltip from 'antd/lib/tooltip';
import Dropdown from 'antd/lib/dropdown';
import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';

import { Action, ActionGroup } from './Action';

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
            <Tooltip placement="bottom" title={action.description}>
                <Button 
                    disabled={!action.enabled} 
                    icon={action.icon} 
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
        return (
            <Menu.Item key={this.props.key} icon={action.icon} disabled={!action.enabled}>
                <Icon type={action.icon}>
                {action.text}
                </Icon>
            </Menu.Item> 
        );
    }

}

export interface ActionMenuProps<T extends Action>  {
    actions: T[];
}

@observer
export class ActionMenu extends React.Component<ActionMenuProps<Action>> {

    render() {
        let actions = this.props.actions;
        return ( 
            <Menu onClick={e => this.props.actions[+e.key].execute()}>
                {  
                    actions.map( (a, key, arr) => 
                       <ActionMenuItem action={a} key={key + 1} />
                    )
                };
            </Menu>
        );
    }

}

@observer
export class ActionGroupButton extends React.Component<ActionButtonProps<ActionGroup>> {

    render() {

        let action = this.props.action;
        let text   = this.props.iconOnly && action.icon.length > 0 ? null : action.text;
        let menu   = <ActionMenu actions={action.items}/>;

        return (
            <Dropdown overlay={menu} > 
                <Button icon={action.icon} disabled={!action.enabled}>
                    {text}
                    <Icon type="down" />
                </Button>
            </Dropdown>    
        );

    }

}
