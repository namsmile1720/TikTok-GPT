import styles from './Button.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Button({
    to,
    href,
    children,
    primary = false,
    onClick,
    outline = false,
    medium = false,
    small = false,
    large = false,
    className,
    iconLeft,
    iconRight,
    ...passProps
}) {
    let Comp = 'button';
    const props = {
        onClick,
        ...passProps,
    };

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        Comp = 'a';
        props.href = href;
    } else {
        Comp = 'button';
    }
    const classes = cx('wrapper', {
        [className]: className,
        primary,
        outline,
        medium,
        small,
        large,
        iconLeft,
        iconRight,
    });
    return (
        <Comp className={classes} {...props}>
            {iconLeft && <span className={cx('iconLeft')}> {iconLeft}</span>}
            <span> {children}</span>
            {iconRight && <span className={cx('iconRight')}> {iconRight}</span>}
        </Comp>
    );
}

export default Button;
