import React from 'react';
import PropTypes from 'prop-types'
import './App.css';

const myNews = [
    {
        id: 1,
        author: 'Саша Печкин',
        text: 'В четверг, четвертого числа...',
        bigText: 'в четыре с четвертью часа четыре чёрненьких чумазеньких чертёнка чертили чёрными чернилами чертёж.'
    },
    {
        id: 2,
        author: 'Просто Вася',
        text: 'Считаю, что $ должен стоить 35 рублей!',
        bigText: 'А евро 42!'
    },
    {
        id: 3,
        author: 'Max Frontend',
        text: 'Прошло 2 года с прошлых учебников, а $ так и не стоит 35',
        bigText: 'А евро опять выше 70!'
    },
    {
        id: 4,
        author: 'Гость',
        text: 'Бесплатно. Без смс, про реакт, заходи - https://maxfrontend.ru',
        bigText: 'Еще есть группа VK, telegram и канал на youtube! Вся инфа на сайте, не реклама!'
    }
];

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
                    href='#'
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

class Add extends React.Component {
    constructor(props) {
        super(props);
        this.input = React.createRef();
    }

    state = {
        author: '',
        text: '',
        bigText: '',
        agree: false
    }

    handleChange = (e) => {
        const { id, value } = e.currentTarget;
        this.setState({[id]: value});
    }

    onClickButton = (e) => {
        e.preventDefault();
        const { author, text, bigText} = this.state;

        this.props.onAddNews({
            id: + new Date(),
            author,
            text,
            bigText
        });
    }

    onRuleChange = (e) => {
        this.setState({agree: e.currentTarget.checked});
    }

    validate = () => {
        return !(!this.state.agree || 
               !this.state.author.trim() || 
               !this.state.text.trim() ||
               !this.state.bigText.trim())
    }

    render() {
        const { author, text, bigText, agree } = this.state;

        return (
            <form className='add'>
                <input
                id='author'
                type='text'
                onChange={this.handleChange}
                className='add__author' 
                placeholder='Ваше имя'
                value={author}
                />
                <textarea
                id='text'
                onChange={this.handleChange}
                className='add__text'
                placeholder='Краткий текст новости'
                value={text}
                ></textarea>
                <textarea
                id='bigText'
                onChange={this.handleChange}
                className='add__text'
                placeholder='Полный текст новости'
                value={bigText}
                ></textarea>
                <label
                className='add__checkrule'>
                    <input
                    type='checkbox'
                    onChange={this.onRuleChange}
                    />
                    Я согласен с правилами
                </label>
                <button
                className='add__btn'
                onClick={this.onClickButton}
                disabled={!this.validate()}
                >
                    Добавить новость
                </button>
            </form>
        )
    }
};

Add.propTypes = {
    onAddNews: PropTypes.func.isRequired
}

class App extends React.Component {
    state = {
        news: myNews
    }

    handleAddNews = (data) => {
        const nextNews = [data, ...this.state.news];
        this.setState({news: nextNews});
    }

    render() {
        return (
            <React.Fragment>
                <Add onAddNews={this.handleAddNews}/>
                <h3>Новости</h3>
                <News data={this.state.news}/>
            </React.Fragment>
        )
    }
};

export default App;
