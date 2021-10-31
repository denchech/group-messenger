import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import ChatButton from './ChatButton'
import client from '../../../libs/client'
import Router from 'next/router'

const ChatsStyled = styled.div`
  background-color: #121212;
  opacity: 90%;
  max-height: 100vh;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  margin-top: 15%;

  ::-webkit-scrollbar {
    display: none;
  }
`

const SearchForm = styled.input`
  top: 0;
  min-height: 10%;
  max-height: 10%;
  width: calc(100%/3 - 24px);
  position: fixed;
  font-size: large;
`

export default class ChatsNavigation extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      chats: [],
      isLoaded: false
    }

    this.handleFavoriteClick = this.handleFavoriteClick.bind(this)
    this.getChats = this.getChats.bind(this)
    this.updatedSearch = this.updatedSearch.bind(this)
  }

  componentDidMount () {
    this.getChats("");
  }

  render () {
    return (
      <ChatsStyled>
        <SearchForm onChange={this.updatedSearch}/>
        {this.renderChats()}
      </ChatsStyled>
    )
  }

  updatedSearch(event) {
    this.getChats(event.target.value);
  }

  renderChats () {
    const { chats, isLoaded } = this.state
    const { activeChatId, showFavorite } = this.props

    if (!isLoaded) {
      return
    }

    const chatKeys = Object.keys(chats)

    const displayedChatKeys = showFavorite ? chatKeys.filter((key) => chats[key].isFavorite || chats[key].id === activeChatId) : chatKeys

    return displayedChatKeys.map((key) => {
      const chat = chats[key]

      return (
        <ChatButton
          key={chat.id}
          id={chat.id}
          isActive={chat.id === activeChatId}
          handleClick={this.props.handleChatButtonClick}
          name={chat.name}
          isFavorite={chat.isFavorite}
          handleFavoriteClick={this.handleFavoriteClick}
        />
      )
    }
    )
  }

  getChats (search) {
    client.all([
      client.get(`/api/chats?search=${search}`),
      client.get('/api/favorite')
    ])
      .then(client.spread((chatResponse, favoriteResponse) => {
        return [chatResponse.data, favoriteResponse.data]
      }))
      .then(client.spread((chats, favorite) => {
        this.setState({
          isLoaded: true,
          chats: Object.assign({}, ...chats.map((chat) => {
            chat.isFavorite = favorite.chats.includes(chat.id)
            return {
              [chat.id]: chat
            }
          }))
        })
      }))
      .catch((error) => {
        switch (error.response.status) {
          case 403:
            if (process.browser) {
              Router.push('/login')
            }
            break
          default:
            break
        }
      })
  }

  handleFavoriteClick (chatId) {
    const { chats } = this.state

    client.put('/api/favorite/' + chatId)
      .then((response) => response.data.chat)
      .then((chat) => {
        chats[chat.id].isFavorite = chat.isFavorite
        this.setState({ chats: chats })
      })
      .catch((error) => console.log(error))
  }
}

ChatsNavigation.propTypes = {
  handleChatButtonClick: PropTypes.func.isRequired,
  activeChatId: PropTypes.string,
  showFavorite: PropTypes.bool.isRequired
}
