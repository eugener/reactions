import * as React from 'react';

import { observer } from 'mobx-react';
import { enableLogging } from 'mobx-logger';

import Button from 'antd/lib/button';
import Tooltip from 'antd/lib/tooltip';
import Dropdown from 'antd/lib/dropdown';
import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';

import { Action, ActionGroup, ActionRadioGroup } from './Action';
import ButtonGroup from 'antd/lib/button/button-group';

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
        return (
            <Menu.Item key={this.props.key} icon={action.icon} disabled={!action.enabled}>
                <Icon type={action.icon}/> {action.text}
            </Menu.Item> 
        );
    }

}

@observer
export class ActionRadioButtonGroup extends React.Component<ActionButtonProps<ActionRadioGroup>> {

    render() {
        return (
            <ButtonGroup>
                { 
                    this.props.action.items.map( a => 
                        <ActionButton 
                           action={a} 
                           iconOnly={this.props.iconOnly} 
                           key={new Date().getUTCMilliseconds() + Math.random()}
                        /> 
                    )
                }
            </ButtonGroup>
        );
    }

}

@observer
export class ActionGroupButton extends React.Component<ActionButtonProps<ActionGroup>> {

    render() {

        let action = this.props.action;
        let text   = this.props.iconOnly && action.icon.length > 0 ? null : action.text;
        let actions = this.props.action.items;

        // <ActionMenuItem action={a} key={key + 1} />
        let menu = (
            <Menu onClick={e => actions[+e.key].execute()}>
                {
                    actions.map( (a, key, arr) => 
                        <Menu.Item key={key} disabled={!a.enabled}>
                            <Icon type={a.icon}/> {a.text}
                        </Menu.Item>
                    )
                };
            </Menu>
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
