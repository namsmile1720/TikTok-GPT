import { default as BoxVideo } from '~/components/BoxVideo';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import Image from '~/components/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import ChatBoxGPT from '~/components/ChatGPT-box';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Home() {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const handleButtonChatClick = () => {
        setIsChatOpen(!isChatOpen);
    };
    // Gọi API để lấy thông tin video từ máy chủ
    const [videos, setVideos] = useState([]);
    useEffect(() => {
        const fetchVideos = () => {
            const options = {
                method: 'GET',
                url: 'https://tiktok-video-no-watermark2.p.rapidapi.com/feed/list',
                params: {
                    region: 'VN',
                    count: '5',
                },
                headers: {
                    'X-RapidAPI-Key': '30af2a3413msh210fec5dfd50b19p17955bjsn6c236f20722d',
                    'X-RapidAPI-Host': 'tiktok-video-no-watermark2.p.rapidapi.com',
                },
            };
            axios.request(options).then(function (response) {
                // console.log(response.data.data);
                const newVideos = response.data.data;
                setVideos((prevVideos) => [...prevVideos, ...newVideos]);
            });
            console.log('Fetch');
        };

        const handleScroll = () => {
            const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.offsetHeight;

            if (isAtBottom) {
                fetchVideos();
            }
        };
        window.addEventListener('scroll', handleScroll);

        fetchVideos();
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div>
            {videos.map((item, index) => {
                return (
                    <div className={cx('Wraper')} key={index}>
                        <Image className={cx('avatar')} src={item.author.avatar} alt={null} />
                        <div className={cx('Box-wraper')}>
                            <div className={cx('Header')}>
                                <div className={cx('info')}>
                                    <div className={cx('name')}>
                                        <span>{item.author.nickname}</span>
                                        {item.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                                    </div>
                                    <span className={cx('username')}>{item.author.unique_id}</span>
                                </div>
                            </div>
                            <div className={cx('Description')}>
                                <span>{item.title}</span>
                                <span>
                                    {<FontAwesomeIcon className={cx('musicIcon')} icon={faMusic} />}
                                    {item.music_info.title}
                                </span>
                            </div>

                            <BoxVideo data={item} index={index}></BoxVideo>
                        </div>
                    </div>
                );
            })}

            <div className={cx('chat-gpt-box')}>
                {isChatOpen && <ChatBoxGPT />}
                <Button primary={true} onClick={handleButtonChatClick}>
                    chat
                </Button>
            </div>
        </div>
    );
}

export default Home;
