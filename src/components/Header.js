import React from 'react'

const Header = ({title, job}) => {
    return (
        <header>
            <h1>{job}</h1>
        </header>
    )
}

Header.defaultProps = {
    'title': 'Task Tracker'
}
export default Header
