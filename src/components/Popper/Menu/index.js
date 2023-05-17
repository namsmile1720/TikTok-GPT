import Tippy from '@tippyjs/react';
import style from './Menu.module.scss';

import { Wrapper as PopperWraper } from '~/components/Popper';
import classNames from 'classnames/bind';
import MenuItem from '~/components/Layout/MenuItem';
import { useState } from 'react';
import Header from './Header';

const cx = classNames.bind(style);

function Menu({ children, items = [] }) {
    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1];

    const renderItem = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children;
            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, item.children]);
                        }
                    }}
                />
            );
        });
    };

    return (
        <Tippy
            interactive
            // delay={[100, 700]}
            placement="bottom-end"
            render={(attrs) => (
                <div className={cx('menu-items')} tabIndex="-1" {...attrs}>
                    <PopperWraper>
                        {history.length > 1 && (
                            <Header
                                title="Languages"
                                onBack={() => {
                                    setHistory((prev) => prev.slice(0, prev.length - 1));
                                }}
                            />
                        )}
                        {renderItem()}
                    </PopperWraper>
                </div>
            )}
        >
            {children}
        </Tippy>
    );
}

export default Menu;
