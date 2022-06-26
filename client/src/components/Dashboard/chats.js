import React, { useRef, useState, useEffect } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { BiSend } from "react-icons/bi";
import person from "../../images/person.png";

const chats = [
  {
    id: 1,
    image: person,
    members: [{ image: person, name: "Ahmed Khalid" }],
    admin: {},
    messages: [
      {
        sender: { name: "Mohamed Ahmed", image: person },
        message: "Lorem ipsum dolor sit amet consectetur,",
      },
      { sender: { name: "Malisya Ahmed", image: person }, message: "Hi217" },
      { sender: { name: "3aseryo Ahmed", image: person }, message: "Hi316" },
      { sender: { name: "3aseryo Ahmed", image: person }, message: "Hi3126" },
      { sender: { name: "3aseryo Ahmed", image: person }, message: "Hi3154" },
      { sender: { name: "3aseryo Ahmed", image: person }, message: "Hi314" },
      { sender: { name: "3aseryo Ahmed", image: person }, message: "Hi313" },
      { sender: { name: "3aseryo Ahmed", image: person }, message: "Hi312" },
      { sender: { name: "3aseryo Ahmed", image: person }, message: "Hi311" },
      { sender: { name: "3aseryo Ahmed", image: person }, message: "Hi310" },
      { sender: { name: "3aseryo Ahmed", image: person }, message: "Hi39" },
      { sender: { name: "3aseryo Ahmed", image: person }, message: "Hi38" },
      { sender: { name: "3aseryo Ahmed", image: person }, message: "Hi37" },
      { sender: { name: "3aseryo Ahmed", image: person }, message: "Hi36" },
      { sender: { name: "3aseryo Ahmed", image: person }, message: "Hi35" },
      { sender: { name: "3aseryo Ahmed", image: person }, message: "Hi34" },
      { sender: { name: "3aseryo Ahmed", image: person }, message: "Hi33" },
      { sender: { name: "3aseryo Ahmed", image: person }, message: "Hi32" },
      { sender: { name: "3aseryo Ahmed", image: person }, message: "Hi31" },
    ],
    course: "English",
  },
  {
    id: 2,
    image: person,
    members: [{ image: person, name: "Yousef Elmahy" }],
    admin: {},
    messages: [
      { sender: { name: "Sorya Ahmed", image: person }, message: "Hi5" },
      {
        sender: { name: "Mohamed Ahmed", image: person },
        message: "Lorem ipsum dolor sit amet consectetur,",
      },
      {
        sender: { name: "Mohamed Ahmed", image: person },
        message: "Hi6 with lorem upsum ay kalam ygd3an",
      },
      { sender: { name: "Hala Ahmed", image: person }, message: "E4ta" },
    ],
    course: "Science",
  },
  {
    id: 3,
    image: person,
    members: [{ image: person, name: "Osama Abozeft" }],
    admin: {},
    messages: [
      { sender: { name: "Yousef Ahmed", image: person }, message: "Hi8" },
      {
        sender: { name: "Said Ahmed", image: person },
        message: "Lorem ipsum dolor sit amet consectetur,",
      },
      { sender: { name: "Mohamed Ahmed", image: person }, message: "Hi7" },
      { sender: { name: "Mohamed Ahmed", image: person }, message: "Hi12" },
      {
        sender: { name: "Mohamed Ahmed", image: person },
        message: "Lorem ipsum molag sinraut roftop",
      },
    ],
    course: "Mathematics",
  },
];

const Chats = ({ user }) => {
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const bottomRef = useRef();

  const chatSelectHandler = (id) => {
    setCurrentChat(id);
    const chat = chats.find((chat) => chat.id === id);
    setMessages(chat.messages);
  };

  const sendMessage = (m) => {
    if (m) {
      setMessages((prev) => [
        ...prev,
        { sender: { name: user.name, image: person }, message: m },
      ]);
      setMessage("");
    }
  };

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
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
              key={chat.id}
              style={{
                backgroundColor: currentChat === chat.id && "#D6EAF8",
                cursor: "pointer",
              }}
              onClick={() => chatSelectHandler(chat.id)}
            >
              <img
                style={{ maxWidth: 80 }}
                className="w-100 p-2"
                src={chat.members[0].image}
                alt={chat.members[0].name}
              />
              <h4 className="d-none d-lg-block">{chat.course}</h4>
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
                {chats.find((chat) => chat.id === currentChat).course} Course
                Chat
              </h5>
              <div
                style={{
                  height: "68.5vh",
                  overflowY: "scroll",
                }}
                className="px-2"
              >
                {messages.map((message) => (
                  <div
                    key={message.message}
                    className={`d-flex ${
                      message.sender.name === user.name &&
                      "flex-row-reverse ml-auto"
                    } align-items-center my-4`}
                  >
                    <img
                      className="mx-1"
                      src={message.sender.image}
                      alt={message.sender.name}
                      style={{ width: 30, height: 30 }}
                    />
                    <p
                      className={`lead rounded px-3 py-2 mb-0 ${
                        message.sender.name === user.name && "text-white"
                      }`}
                      style={{
                        backgroundColor:
                          message.sender.name === user.name
                            ? "#8472FC"
                            : "#F0F0FB",
                      }}
                    >
                      {message.message}
                    </p>
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
        </Col>
      </Row>
    </div>
  );
};

export default Chats;
