import { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Moment from 'react-moment'
import moment from 'moment'
import { v4 as uuid } from 'uuid'

import { Button, InfoBlob, MainContentBlock, ReactLoader } from 'app/components'
import { getClassInfo } from 'utils'
import { useAppDispatch, useAppSelector } from 'store'
import { useHistory } from 'react-router-dom'
import { addChatGlobal, getChatGlobal, getChatRecents } from 'store/user'
import { IChatRecent } from 'typings'
import { socketChatEmitGlobal, SocketIO } from 'store/socket'

interface Props {
  global?: boolean
  onClick: () => void
  active: boolean
  recent?: IChatRecent
}

const Contact: React.FC<Props> = ({ global, onClick, active, recent }) => {
  if (global)
    return (
      <ContactWrapper onClick={onClick} active={active}>
        <ContactIcon image='/images/partials/announcement.gif' global={global} /> Global Chat
      </ContactWrapper>
    )

  const classInfo = getClassInfo(recent!.class)

  return (
    <ContactWrapper onClick={onClick} active={active}>
      <ContactIcon online={recent!.is_online} image={`/images/classes/${classInfo.classImage.short}`} global={global} />{' '}
      {recent!.name}
      {!!recent!.unseen && <Missed>{recent!.unseen}</Missed>}
    </ContactWrapper>
  )
}

export const Chats = () => {
  const [selected, setSelected] = useState<string | null>(null)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const chatEndRef = useRef<HTMLDivElement>(null)
  const { user, chat } = useAppSelector((state) => state.user)
  const history = useHistory()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (user?.main_character) {
      dispatch(getChatRecents())
      dispatch(getChatGlobal())
    }
  }, [dispatch, user?.main_character])

  useEffect(() => {
    SocketIO.on('chat global message', (message) => dispatch(addChatGlobal(message)))
  }, [dispatch])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chat.chats.global])

  const renderChatMessages = useCallback(() => {
    if (!chat.chats.global) return null

    return Object.keys(chat.chats.global).map((day) => {
      let sender: string
      return (
        <div key={day}>
          <ConversationDay>
            <span>{moment(new Date(day)).format('MMMM Do, YYYY')}</span>
          </ConversationDay>
          {chat.chats.global![day].map(({ message, date, author }) => {
            const output: JSX.Element[] = []
            if (sender !== author) {
              output.push(
                <Sender key={uuid()}>
                  <span>{author}</span> <Moment fromNow>{date}</Moment>
                </Sender>,
              )
              sender = author
            }
            output.push(<Message key={uuid()}>{message}</Message>)
            return output
          })}
        </div>
      )
    })
  }, [chat.chats.global])

  const handleMessageSend = () => {
    if (!textAreaRef.current?.value) return

    dispatch(socketChatEmitGlobal(textAreaRef.current.value))
    console.log(`sending`, { message: textAreaRef.current.value })
    textAreaRef.current.value = ''
  }

  if (!user?.main_character) {
    return (
      <MainContentBlock>
        Please set a <button onClick={() => history.push('/character/main')}>main character</button> first.
      </MainContentBlock>
    )
  }

  return (
    <div>
      <InfoBlob style={{ margin: 20 }}>
        Rules
        <ul>
          <li>Bad and disrespectful language in the Global Chat is forbidden .</li>
          <li>Any kind of server advertisment is completely forbidden.</li>
          <li>Any gibberish/unnecessary spam is forbidden. Let's keep it clean.</li>
        </ul>
        Note: Our staff will never ask for your credentials.
      </InfoBlob>
      <MainContentBlock padding={0}>
        <ChatWrapper>
          <Contacts>
            <Contact global onClick={() => setSelected(null)} active={selected === null} />
            <ContactCategory>Admins</ContactCategory>
            {!chat.recents ? (
              <ReactLoader />
            ) : !chat.recents.admins.length ? (
              <div>No admins found</div>
            ) : (
              chat.recents.admins.map((admin) => (
                <Contact
                  key={admin.name}
                  onClick={() => setSelected(admin.name)}
                  active={selected === admin.name}
                  recent={admin}
                />
              ))
            )}
            <ContactCategory>Recent Conversations</ContactCategory>
            {!chat.recents ? (
              <ReactLoader />
            ) : !chat.recents.list.length ? (
              <div>No recents...</div>
            ) : (
              chat.recents.list.map((recent) => (
                <Contact
                  key={recent.name}
                  onClick={() => setSelected(recent.name)}
                  active={selected === recent.name}
                  recent={recent}
                />
              ))
            )}
          </Contacts>
          <ChatBox global={!selected}>
            {selected && (
              <Toolbar>
                <div style={{ width: 100 }}>{selected || 'Global Chat'}</div>
                <div>
                  <input placeholder='Search messages' />
                </div>
                <div style={{ width: 100, display: 'flex', justifyContent: 'flex-end' }}>
                  <button>Block User</button>
                </div>
              </Toolbar>
            )}
            <Conversation>
              {renderChatMessages()}
              <div ref={chatEndRef} />
            </Conversation>
            <TextArea>
              <textarea
                placeholder='Start typing here...'
                minLength={1}
                maxLength={500}
                spellCheck={false}
                ref={textAreaRef}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleMessageSend()
                  }
                }}
              ></textarea>
              <StyledSendButton value='Send' onClick={handleMessageSend} />
            </TextArea>
          </ChatBox>
        </ChatWrapper>
      </MainContentBlock>
    </div>
  )
}

const ChatWrapper = styled.div`
  display: grid;
  width: 100%;
  height: 700px;
  grid-template-rows: 700px;
  grid-template-columns: 170px 1fr;
`

const Contacts = styled.div`
  /* background-color: #08111b; */
  background-color: #08111b;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 10px;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`

const ChatBox = styled.div<{ global: boolean }>`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: 1fr;
  grid-template-rows: ${({ global }) => !global && '50px'} 1fr 170px;
`

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(63, 85, 114, 0.4);
  padding: 0 8px;
`

const Conversation = styled.div`
  padding-top: 5px;
  overflow-x: hidden;
  overflow-y: auto;
  color: #7c94b8;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`

const ConversationDay = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #1b2d42;
  font-size: 12px;
  margin: 5px 0;

  span {
    background-color: #1b2d42;
    padding: 4px 8px;
    color: #b0bbd8;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
`

const Message = styled.div`
  white-space: pre-wrap;
  padding: 2px 15px;
  font-size: 14px;

  &:hover {
    background-color: #1a2631;
  }
`

const Sender = styled.div`
  padding: 2px 15px;
  font-size: 11px;
  color: #5e7292;
  margin-top: 10px;

  span {
    color: #9eb7df;
    font-size: 15px;
    margin-right: 5px;
    font-weight: bold;
  }
`

const TextArea = styled.div`
  position: relative;
  padding: 15px;

  textarea {
    width: 100%;
    height: 100%;
    outline: none;
    resize: none;
    margin: 0;
    padding: 10px;
    border: 0;
    border-radius: 5px;
    background-color: #2c3b47;
    color: #ffffff;
  }
`

const StyledSendButton = styled(Button)`
  position: absolute;
  bottom: 20px;
  right: 20px;
`

const ContactCategory = styled.div`
  text-align: left;
  padding: 10px 0;
  text-transform: uppercase;
`

const ContactWrapper = styled.div<{ active: boolean }>`
  position: relative;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-radius: 4px;
  margin: 4px 0;
  background-color: #0c1a27;
  border: 1px solid ${({ active }) => (active ? '#61738e' : 'transparent')};

  &:first-of-type {
    margin-top: 0;
  }
`

const Missed = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  right: -9px;
  width: 18px;
  height: 18px;
  border-radius: 8px;
  background-color: #af1212;
  color: #e2cece;
  font-size: 10px;
`

const ContactIcon = styled.div<{ online?: boolean; image: string; global?: boolean }>`
  position: relative;
  width: 30px;
  height: 30px;
  background: url('${({ image }) => image}') no-repeat center center/cover;
  border-radius: 15px;
  margin: 0 5px;

  ${({ global, online }) =>
    !global &&
    `
    &:before {
      content: '';
      position: absolute;
      bottom: 0;
      right: 0;
      width: 12px;
      height: 12px;
      border-radius: 6px;
      background-color: #0c1a27;
    }

    &:after {
      content: '';
      position: absolute;
      bottom: 3px;
      right: 3px;
      width: 6px;
      height: 6px;
      border-radius: 4px;
      background-color: ${online ? 'green' : 'red'};
    }
  `}
`
