import React from 'react'
import PropTypes from 'prop-types'


class Article extends React.Component {
    state = {
        visible: false
    }
    onClickHander = (e) => {
        e.preventDefault();
        this.setState({visible: !this.state.visible});
    }
    render() {
        const { author, text, bigText } = this.props.data;
        const { visible } = this.state;

        return (
            <div className="article">
                <p className="news__author">{author}:</p>
                <p className="news__text">{text}</p>
                
                {
                    <a 
                    onClick={this.onClickHander}     
                    href='#readmore'
                    className='news_readmore'>{!visible ? 'Подробнее' : 'Скрыть'}</a>
                }

                {
                    visible && <p className="news__big-text">{bigText}</p>
                }
            </div>
        )
    }
};

Article.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.number.isRequired,
        author: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        bigText: PropTypes.string.isRequired,
    })
};

export { Article };
