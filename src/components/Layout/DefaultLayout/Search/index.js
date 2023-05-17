import { faCircleXmark, faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';
import HealessTippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// hook
import { useState, useEffect, useRef } from 'react';
import { default as AccountItem } from '../../../AccountItem';
import { useDebounce } from '~/hooks';
import axios from 'axios';
//styles
import classNames from 'classnames/bind';
import style from './Search.module.scss';
// components
import { Wrapper as PopperWraper } from '~/components/Popper';

const cx = classNames.bind(style);
function Search() {
    const [searchValue, setSearchValue] = useState('');

    const [searchResult, setsearchResult] = useState([]);

    const [loading, setLoading] = useState(false);

    const inputRef = useRef();

    const [showResult, setShowResult] = useState(true);

    const debounced = useDebounce(searchValue, 500);

    const handleClearInput = () => {
        setSearchValue('');
        inputRef.current.focus();
        setsearchResult([]);
    };

    useEffect(() => {
        if (!debounced.trim()) {
            return;
        }
        setLoading(true);

        const options = {
            method: 'GET',
            url: 'https://tiktok-video-no-watermark2.p.rapidapi.com/user/search',
            params: { keywords: encodeURIComponent(debounced), count: '10', cursor: '0' },
            headers: {
                'X-RapidAPI-Key': '30af2a3413msh210fec5dfd50b19p17955bjsn6c236f20722d',
                'X-RapidAPI-Host': 'tiktok-video-no-watermark2.p.rapidapi.com',
            },
        };

        axios
            .request(options)
            .then(function (response) {
                console.log(response.data);
                setsearchResult(response.data.data.user_list);
                setLoading(false);
            })
            .catch(() => setLoading(false));

        // axios
        //     .get(`https://tiktok.fullstack.edu.vn/api/users/search`, {
        //         params: {
        //             q: debounced,
        //             type: 'less',
        //         },
        //     })

        // .then(function (response) {
        //     console.log(response.data);
        //     setsearchResult(response.data.data.user_list);
        //     setLoading(false);
        // })
        // .catch(() => setLoading(false));
    }, [debounced]);
    return (
        <HealessTippy
            visible={showResult && searchResult.length > 0}
            render={(attrs) => (
                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                    <PopperWraper>
                        <h4 className={cx('search-result')}>Accounts</h4>
                        {searchResult.map((item, index) => {
                            return <AccountItem key={index} data={item} />;
                        })}
                    </PopperWraper>
                </div>
            )}
            onClickOutside={() => {
                setShowResult(false);
            }}
        >
            <div className={cx('search')}>
                <input
                    ref={inputRef}
                    className={cx('search-input')}
                    placeholder="Tìm kiếm"
                    value={searchValue}
                    onChange={(e) => {
                        setSearchValue(e.target.value);
                    }}
                    onClick={() => {
                        setShowResult(true);
                    }}
                ></input>

                {!!searchValue && !loading && (
                    <button
                        className={cx('clear')}
                        onClick={() => {
                            handleClearInput();
                        }}
                    >
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}

                {loading && (
                    <button className={cx('loading')}>
                        <FontAwesomeIcon icon={faSpinner} />
                    </button>
                )}

                <button className={cx('search-icon')}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>
        </HealessTippy>
    );
}

export default Search;
