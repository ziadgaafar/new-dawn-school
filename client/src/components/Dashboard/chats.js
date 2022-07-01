import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import {
  Row,
  Col,
  Form,
  Spinner,
  OverlayTrigger,
  Button,
  Tooltip,
} from "react-bootstrap";
import { BiSend } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useHttpClient } from "../../hooks/http-hook";
import person from "../../images/person.png";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:3001";

const Chats = () => {
  const [chats, setChats] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [recievedMessage, setRecievedMessage] = useState(null);
  const bottomRef = useRef();
  const { sendRequest } = useHttpClient();
  const selectChat = useHttpClient();
  const { token, user } = useSelector((state) => state.auth);

  useLayoutEffect(() => {
    const fetch = async () => {
      const data = await sendRequest({
        method: "GET",
        url: "/chat",
        headers: { Authorization: `Bearer ${token}` },
      });
      setChats(data.result);
    };
    if (token) {
      fetch();
    }
  }, [token]);

  useEffect(() => {
    if (!socket) {
      setSocket(io(ENDPOINT));
    }

    if (socket) {
      socket.emit("setup", user);
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.on("messageRecieved", (newMessage) => {
        if (!currentChat || currentChat !== newMessage.chat._id) {
          // give notification
        } else {
          if (
            recievedMessage === null ||
            recievedMessage._id !== newMessage._id
          ) {
            setRecievedMessage(newMessage);
          }
        }
      });
    }
  });

  useEffect(() => {
    if (recievedMessage !== null) {
      setMessages((prev) => [...prev, recievedMessage]);
    }
  }, [recievedMessage]);

  const chatSelectHandler = async (id) => {
    if (id === currentChat) return;
    setCurrentChat(id);
    const data = await selectChat.sendRequest({
      method: "GET",
      url: `/message/${id}`,
      headers: { Authorization: `Bearer ${token}` },
    });
    setMessages(data);
    console.log(data);
    socket.emit("joinChat", id);
  };

  const sendMessage = async (m) => {
    if (m) {
      setMessage("");
      const message = await sendRequest({
        method: "POST",
        url: "/message",
        headers: { Authorization: `Bearer ${token}` },
        body: { content: m, chatId: currentChat },
      });
      socket.emit("newMessage", message);
      setMessages((prev) => [...prev, message]);
    }
  };

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {chats ? (
        <div className="pl-4">
          <h1 className="dispaly-1 fw-bold text-center text-lg-left">Chats</h1>
          <Row className="w-100">
            <Col
              style={{
                backgroundColor: "#F0F0FB",
                height: "78.5vh",
                overflowY: "scroll",
              }}
              xs={2}
              lg={4}
              xl={3}
              className="border d-flex flex-column p-0"
            >
              {chats.map((chat) => (
                <div
                  key={chat._id}
                  className="d-flex justify-content-center align-items-center justify-content-lg-start"
                  style={{
                    backgroundColor: currentChat === chat._id && "#D6EAF8",
                    cursor: "pointer",
                  }}
                  onClick={() => chatSelectHandler(chat._id)}
                >
                  <img
                    style={{ maxWidth: 80 }}
                    className="w-100 p-2 rounded-circle"
                    src={person}
                    alt="dummy"
                  />
                  {/* <div
                    className="my-2 mr-lg-2 d-flex justify-content-center align-items-center rounded-circle bg-info w-100"
                    style={{ maxWidth: 80, height: 80 }}
                  >
                    <h3 className="fw-bold mt-1">
                      {chat.chatName?.charAt(0).toUpperCase() +
                        chat.chatName?.charAt(1).toUpperCase()}
                    </h3>
                  </div> */}
                  <h4 className="d-none d-lg-block">{chat.chatName}</h4>
                </div>
              ))}
            </Col>
            <Col
              xs={10}
              lg={8}
              xl={9}
              className={`px-0 d-flex flex-column ${
                !currentChat && "justify-content-center align-items-center"
              } bg-white align-items-start`}
              style={{ height: "78.5vh" }}
            >
              {!currentChat ? (
                <h1 className="display-5 text-center">Please Select a Chat.</h1>
              ) : (
                <>
                  {selectChat.isLoading ? (
                    <div
                      style={{ height: "79vh" }}
                      className="w-100 d-flex justify-content-center align-items-center"
                    >
                      <Spinner animation="border" />
                    </div>
                  ) : (
                    <div className="w-100">
                      <h5 className="fw-bolder border-bottom text-center py-1">
                        {
                          chats.find((chat) => chat._id === currentChat)
                            .chatName
                        }{" "}
                        Course Chat
                      </h5>
                      <div
                        style={{
                          height: "67.2vh",
                          overflowY: "scroll",
                        }}
                        className="px-2"
                      >
                        {messages.map((message) => (
                          <div key={message._id}>
                            {message.sender && (
                              <div
                                className={`d-flex ${
                                  message.sender.id === user._id &&
                                  "flex-row-reverse ml-auto"
                                } align-items-center my-4`}
                              >
                                <OverlayTrigger
                                  placement="top"
                                  overlay={
                                    <Tooltip>
                                      <div>{message.sender.name}</div>
                                      <div>
                                        {new Date(
                                          message.createdAt
                                        ).toLocaleString()}
                                      </div>
                                    </Tooltip>
                                  }
                                >
                                  <img
                                    className="mx-1 rounded-circle"
                                    src={
                                      message.sender.image
                                        ? `${process.env.REACT_APP_SERVER_URL}/${message.sender.image}`
                                        : person
                                    }
                                    alt={message.sender.id}
                                    style={{ width: 30, height: 30 }}
                                  />
                                </OverlayTrigger>

                                <p
                                  className={`lead rounded px-3 py-2 mb-0 ${
                                    message.sender.id === user._id &&
                                    "text-white"
                                  }`}
                                  style={{
                                    backgroundColor:
                                      message.sender.id === user._id
                                        ? "#8472FC"
                                        : "#F0F0FB",
                                  }}
                                >
                                  {message.content}
                                </p>
                              </div>
                            )}
                          </div>
                        ))}
                        <div ref={bottomRef} />
                      </div>
                      <form
                        className="d-flex"
                        onSubmit={(e) => {
                          e.preventDefault();
                          sendMessage(message);
                        }}
                      >
                        <Form.Control
                          placeholder="Enter your message"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                        />
                        <BiSend
                          size="40"
                          style={{ cursor: "pointer" }}
                          onClick={() => sendMessage(message)}
                        />
                      </form>
                    </div>
                  )}
                </>
              )}
            </Col>
          </Row>
        </div>
      ) : (
        <div className="p-5 d-flex justify-content-center">
          <Spinner animation="border" />
        </div>
      )}
    </>
  );
};

export default Chats;
