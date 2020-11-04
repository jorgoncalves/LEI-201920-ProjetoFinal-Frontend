import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './Searchbar.css';

export default function Searchbar() {
    const [searching, setSearching] = useState(false);

    const focusInput = (el) => {
        setSearching(true);
        document.getElementById('searchResults').style.display = 'block';
    };

    const blurInput = (el) => {
        setTimeout(() => {
            setSearching(false);
            document.getElementById('searchResults').style.display = 'none';
        }, 100);
    };

    return (
        <>
            <div className="searchBarContainer" onClick={focusInput.bind(this)}>
                <form className="uk-search uk-search-default">
                    {searching ? (
                        <span
                            href="#"
                            className="uk-search-icon-flip"
                            uk-icon="close"
                            onClick={blurInput.bind(this)}
                        ></span>
                    ) : (
                        <span href="#" className="uk-search-icon-flip" uk-search-icon="true"></span>
                    )}

                    <input className="uk-search-input" type="search" placeholder="Search..." />
                </form>
                <div className="searchResults" id="searchResults"></div>
            </div>
        </>
    );
}
