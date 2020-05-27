import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { Card, CardText, Button } from 'reactstrap';

import messageLocationURL from './message_location.svg';
import userLocationURL from './user_location.svg';
import './App.css';
import { getMessages, getLocation, sendMessage } from './api';
import MessageCardForm from './MessageCardForm';

const myIcon = L.icon({
  iconUrl: userLocationURL,
  iconSize: [50, 82],
});

const messageIcon = L.icon({
  iconUrl: messageLocationURL,
  iconSize: [50, 82],
});

function App() {
  const [location, setLocation] = useState({
    lat: 51.505,
    lng: -0.09,
  });
  const [haveUsersLocation, setHaveUsersLocation] = useState(false);
  const [zoom, setZoom] = useState(2);
  const [userName, setUserName] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [sentMessage, setSentMessage] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getMessages().then((messages) => setMessages(messages));
  }, []);

  const handleShowMessageForm = () => {
    setShowMessageForm(true);
    getLocation().then((location) => {
      setLocation(location);
      setHaveUsersLocation(true);
      setZoom(13);
    });
  };

  const cancelMessage = () => {
    setShowMessageForm(false);
  };

  const formIsValid = () => {
    let name = userName.trim();
    let message = userMessage.trim();

    const validMessage =
      name.length > 0 &&
      name.length <= 500 &&
      message.length > 0 &&
      message.length <= 500;

    return validMessage && haveUsersLocation ? true : false;
  };

  const formSubmitted = (event) => {
    event.preventDefault();

    if (formIsValid()) {
      setSendingMessage(true);

      const message = {
        name: userName,
        message: userMessage,
        latitude: location.lat,
        longitude: location.lng,
      };

      sendMessage(message).then((result) => {
        setTimeout(() => {
          setSendingMessage(false);
          setSentMessage(true);
        }, 4000);
      });
    }
  };

  const position = [location.lat, location.lng];
  return (
    <div className='map'>
      <Map className='map' worldCopyJump={true} center={position} zoom={zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors and Chat location by Iconika from the Noun Project'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {haveUsersLocation ? (
          <Marker position={position} icon={myIcon}></Marker>
        ) : (
          ''
        )}
        {messages.map((message) => (
          <Marker
            key={message._id}
            position={[message.latitude, message.longitude]}
            icon={messageIcon}
          >
            <Popup>
              <p>
                <em>{message.name}:</em> {message.message}
              </p>
              {message.otherMessages
                ? message.otherMessages.map((message) => (
                    <p key={message._id}>
                      <em>{message.name}:</em> {message.message}
                    </p>
                  ))
                : ''}
            </Popup>
          </Marker>
        ))}
      </Map>
      {!showMessageForm ? (
        <Button
          className='message-form'
          onClick={handleShowMessageForm}
          color='info'
        >
          Add a Message
        </Button>
      ) : !sentMessage ? (
        <MessageCardForm
          cancelMessage={cancelMessage}
          showMessageForm={showMessageForm}
          sendingMessage={sendingMessage}
          sentMessage={sentMessage}
          haveUsersLocation={haveUsersLocation}
          formSubmitted={formSubmitted}
          setUserMessage={setUserMessage}
          setUserName={setUserName}
          formIsValid={formIsValid}
        />
      ) : (
        <Card body className='thanks-form'>
          <CardText>Thanks for submitting a message!</CardText>
        </Card>
      )}
    </div>
  );
}

export default App;
