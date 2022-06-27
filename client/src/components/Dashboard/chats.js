import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { BiSend } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useHttpClient } from "../../hooks/http-hook";
import person from "../../images/person.png";

const Chats = () => {
  const [chats, setChats] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const bottomRef = useRef();
  const { sendRequest } = useHttpClient();
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

  const chatSelectHandler = async (id) => {
    setCurrentChat(id);
    const data = await sendRequest({
      method: "GET",
      url: `/message/${id}`,
      headers: { Authorization: `Bearer ${token}` },
    });
    setMessages(data);
  };

  const sendMessage = (m) => {
    if (m) {
      setMessages((prev) => [
        ...prev,
        { sender: { _id: user._id }, content: m },
      ]);
      setMessage("");
    }
  };

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {chats && (
        <div className="pl-4">
          <h1
            onClick={() => setCurrentChat(null)}
            className="dispaly-1 fw-bold text-center text-lg-left"
          >
            Chats
          </h1>
          <Row className="w-100">
            <Col
              style={{ backgroundColor: "#F0F0FB" }}
              xs={2}
              lg={4}
              xl={3}
              className="border d-flex flex-column p-0"
            >
              {chats.map((chat) => (
                <div
                  className="d-flex justify-content-center align-items-center justify-content-lg-start"
                  key={chat._id}
                  style={{
                    backgroundColor: currentChat === chat._id && "#D6EAF8",
                    cursor: "pointer",
                  }}
                  onClick={() => chatSelectHandler(chat._id)}
                >
                  <img
                    style={{ maxWidth: 80 }}
                    className="w-100 p-2"
                    src={person}
                    alt="dummy"
                  />
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
              style={{ height: "79vh" }}
            >
              {!currentChat ? (
                <h1 className="display-5 text-center">Please Select a Chat.</h1>
              ) : (
                <div className="w-100">
                  <h5 className="fw-bolder border-bottom text-center py-1">
                    {chats.find((chat) => chat._id === currentChat).chatName}{" "}
                    Course Chat
                  </h5>
                  <div
                    style={{
                      height: "68.5vh",
                      overflowY: "scroll",
                    }}
                    className="px-2"
                  >
                    {messages.map((message) => (
                      <>
                        {message.sender && (
                          <div
                            key={message._id}
                            className={`d-flex ${
                              message.sender._id === user._id &&
                              "flex-row-reverse ml-auto"
                            } align-items-center my-4`}
                          >
                            <img
                              className="mx-1"
                              src={person}
                              alt={message.sender._id}
                              style={{ width: 30, height: 30 }}
                            />
                            <p
                              className={`lead rounded px-3 py-2 mb-0 ${
                                message.sender._id === user._id && "text-white"
                              }`}
                              style={{
                                backgroundColor:
                                  message.sender._id === user._id
                                    ? "#8472FC"
                                    : "#F0F0FB",
                              }}
                            >
                              {message.content}
                            </p>
                          </div>
                        )}
                      </>
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
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default Chats;
