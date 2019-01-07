import React from 'react'
import PropTypes from 'prop-types'
import { Article } from './Article'


class News extends React.Component {
    renderNews = () => {
        const {data} = this.props; // аналогично const data = this.props.data
        let newsTemplate = null;

        if (data.length > 0) {
            newsTemplate = data.map(function(item) {
                return <Article key={item.id} data={item}/>
            });
        } else {
            newsTemplate = <p>К сожалению, новостей нет</p>
        }

        return newsTemplate;
    }

    render() {
        const {data} = this.props;

        return (
            <div className="news">
                {this.renderNews()}
                {
                    data.length ?
                    <strong>
                    Всего новостей: {data.length}
                    </strong>:
                    null
                }
            </div>
        );
    }                    
};

News.propTypes = {
    data: PropTypes.array.isRequired
};

export { News };
