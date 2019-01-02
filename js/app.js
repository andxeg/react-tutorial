var my_news = [
    {
        author: 'Саша Печкин',
        text: 'В четверг, четвертого числа...',
        bigText: 'в четыре с четвертью часа четыре \
                  черненьких чумазеньких чертенка \
                  чертили черными чернилами чертеж'
    },
    {
        author: 'Просто Вася',
        text: 'Считаю, что $ должен стоить 35 рублей!',
        bigText: 'А евро 42!'
    },
    {
        author: 'Гость',
        text: 'Бесплатно. Скачать. Лучший сайт - http://localhost:3000',
        bigText: 'На самом деле платно, просто \
                  нужно прочитать очень длинное \
                  лицензионное соглашение'
    }
]


var Article = React.createClass({
    propTypes: {
        data: React.PropTypes.shape({
            author: React.PropTypes.string.isRequired,
            text: React.PropTypes.string.isRequired,
            bigText: React.PropTypes.string.isRequired
        })
    },
    getInitialState: function() {
        return {
            visible: false
        };
    },
    readmoreClick: function(e) {
        e.preventDefault();
        this.setState({visible: !this.state.visible},
            function() {
                // console.log('State was changed')
        });
    },
    render: function() {
        var author = this.props.data.author;
        var text = this.props.data.text;
        var bigText = this.props.data.bigText;
        var visible = this.state.visible;

        // console.log('render', this);

        return (
            <div className="article">
                <p className="news__author">{author}:</p>
                <p className="news__text">{text}</p>
                <a href="#"
                    onClick={this.readmoreClick}
                    className='news__readmore'>
                    {!visible ? 'Подробнее': 'Скрыть'}
                </a>
                <p className={'news__big-text ' + (visible ? '': 'none')}>{bigText}</p>
            </div>
        )
    }
});

var News = React.createClass({
    propTypes: {
        data: React.PropTypes.array.isRequired
    },
    getInitialState: function() {
        return {
            counter: 0
        }
    },
    render: function() {
        var data = this.props.data;
        var newsTemplate;

        if (data.length > 0) {
            newsTemplate = data.map(function(item, index) {
                return (
                    <div key={index}>
                        <Article data={item} />
                    </div>
                )
            });
        } else {
            newsTemplate = <p>К сожалению новостей нет</p>
        }

        return (
            <div className="news">
                {newsTemplate}
                <strong 
                    className={'news__count ' + (data.length > 0 ? '':'none') }>
                    Всего новостей: {data.length}
                </strong>
            </div>
        );
    }
});

var Add = React.createClass({
    getInitialState: function() {
        return {
            checkRule: false,
            authorFill: false,
            textFill: false
        }
    },
    componentDidMount: function() {
        ReactDOM.findDOMNode(this.refs.author).focus();
    },
    onButtonClick: function(e) {
        e.preventDefault();
        var author = ReactDOM.findDOMNode(this.refs.author).value;
        var text = ReactDOM.findDOMNode(this.refs.text).value;
        console.log('author:', author);
        console.log('text:', text);
    },
    onCheckRuleClick: function(e) {
        this.setState({checkRule: !this.state.checkRule});
    },
    authorChange: function(e) {
        console.log('author was changed:', e.target.value)
        this.setState({authorFill: e.target.value.trim()});
    },
    textChange: function(e) {
        console.log('text was changed', e.target.value)
        this.setState({textFill: e.target.value.trim()});
    },
    render: function() {
        return (
            <form className='add cf'>
                <input
                    type='text'
                    className='add__author' 
                    defaultValue='' 
                    placeholder='Ваше имя'
                    ref='author'
                    onChange={this.authorChange}
                />
                <textarea
                    className='add__text'
                    defaultValue=''
                    placeholder='Текст новости'
                    ref='text'
                    onChange={this.textChange}
                ></textarea>
                <label className='add__checkrule'>
                    <input
                        type='checkbox'
                        ref='checkrule'
                        onChange={this.onCheckRuleClick}
                    />
                    Я согласен с правилами
                </label>
                <button
                    className='add__btn'
                    onClick={this.onButtonClick}
                    ref='alert_button'
                    disabled={!this.state.checkRule || !this.state.authorFill || !this.state.textFill}
                >
                    Отправить
                </button>
            </form>
        )
    }
});

var App = React.createClass({
    render: function() {
        return (
            <div className="app">
                <h3>Новости</h3>
                <Add />
                <News data={my_news} />
            </div>
        );
    }
});

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
