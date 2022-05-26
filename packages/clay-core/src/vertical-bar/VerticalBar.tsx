/**
 * SPDX-FileCopyrightText: © 2022 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {InternalDispatch, useInternalState} from '@clayui/shared';
import classNames from 'classnames';
import React from 'react';

import {Bar} from './Bar';
import {Content} from './Content';
import {Item} from './Item';
import {Panel} from './Panel';
import {VerticalBarContext} from './context';

type Props = {
	/**
	 * The VerticalBar content.
	 */
	children: React.ReactNode;

	/**
	 * Sets the CSS className for the component.
	 */
	className?: string;

	/**
	 * Sets the position of the vertical bar.
	 */
	position?: 'left' | 'right';

	/**
	 * Sets the current active panel (controlled).
	 */
	active?: React.Key | null;

	/**
	 * Sets the default active panel (uncontrolled).
	 */
	defaultActive?: React.Key | null;

	/**
	 * Callback is called when the active state changes (controlled).
	 */
	onActiveChange?: InternalDispatch<React.Key | null>;
};

export function VerticalBar(props: Props): JSX.Element & {
	Item: typeof Item;
	Content: typeof Content;
	Panel: typeof Panel;
	Bar: typeof Bar;
};

export function VerticalBar({
	active = null,
	children,
	className,
	defaultActive = null,
	onActiveChange,
	position = 'right',
}: Props) {
	const [activePanel, setActivePanel] = useInternalState({
		defaultName: 'defaultItems',
		defaultValue: defaultActive,
		handleName: 'onActiveChange',
		name: 'active',
		onChange: onActiveChange,
		value: active,
	});

	return (
		<div
			className={classNames(
				'c-slideout c-slideout-fixed c-slideout-shown',
				className,
				{
					'c-slideout-end': position === 'right',
					'c-slideout-start': position === 'left',
				}
			)}
		>
			<VerticalBarContext.Provider
				value={{
					activePanel,
					onActivePanel: setActivePanel,
				}}
			>
				{children}
			</VerticalBarContext.Provider>
		</div>
	);
}

VerticalBar.Bar = Bar;
VerticalBar.Content = Content;
VerticalBar.Item = Item;
VerticalBar.Panel = Panel;
