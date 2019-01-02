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

var TestInput = React.createClass({
    getInitialState: function() {
        return {
            value: ''
        }
    },
    onChange: function(e) {
        e.preventDefault();
        this.setState({value: e.target.value});
    },
    onButtonClick: function(e) {
        e.preventDefault();
        console.log('Send input:', this.state.value);
    },
    render: function() {
        var value = this.state.value;

        return (
            <div>
                <input className='test-input' 
                    value={value} 
                    onChange={this.onChange}
                    placeholder='введите значение'/>
                <button type="button"
                    onClick={this.onButtonClick}
                >
                    Отправить
                </button>
            </div>
        )
    }
});

var App = React.createClass({
    render: function() {
        return (
            <div className="app">
                <h3>Новости</h3>
                <TestInput />
                <News data={my_news} />
            </div>
        );
    }
});

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
