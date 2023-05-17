import styles from './BoxVideo.module.scss';
import classNames from 'classnames/bind';
import ReactPlayer from 'react-player';

const cx = classNames.bind(styles);

function BoxVideo({ data, index }) {
    return (
        <div className={cx('video-wrap')}>
            <ReactPlayer
                width="auto%"
                height="auto%"
                className={cx('player-wraper')}
                playing={index === 0}
                muted={true}
                url={data && data.wmplay ? data.wmplay : ''}
                controls
            />
        </div>
    );
}

export default BoxVideo;
