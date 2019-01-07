import React from 'react'
import PropTypes from 'prop-types'


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
        const { author, text, bigText } = this.state;

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

export { Add };