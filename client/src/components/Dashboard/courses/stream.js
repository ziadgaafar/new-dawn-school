import { useEffect, useState, useRef } from 'react';

import { Peer } from "peerjs"
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import './stream.css';



function Stream() {

  const { token, user } = useSelector((state) => state.auth);

  const [peerId, setPeerId] = useState('');
  const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
  const remoteVideoRef = useRef(null);
  const currentUserVedioRef = useRef(null);
  const peerInstance = useRef(null);


  useEffect(() => {
    const peer = new Peer();

    peer.on('open', (id) => {
      setPeerId(id)
    }, []);


    peer.on('call', (call) => {
      var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
      getUserMedia({ video: true, audio: true }, (mediaStream) => {
        currentUserVedioRef.current.srcObject = mediaStream;
        currentUserVedioRef.current.play();
        call.answer(mediaStream);
        call.on('stream', function (remoteStream) {
          remoteVideoRef.current.srcObject = remoteStream;
          remoteVideoRef.current.play();
        });
      });
    })
    peerInstance.current = peer;

  }, []);


  const call = (remotePeerId) => {
    var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    getUserMedia({ video: true, audio: true }, (mediaStream) => {
      currentUserVedioRef.current.srcObject = mediaStream;
      currentUserVedioRef.current.play();
      const call = peerInstance.current.call(remotePeerId, mediaStream);

      call.on('stream', (remoteStream) => {

        remoteVideoRef.current.srcObject = remoteStream;
        remoteVideoRef.current.play();
      });

    });
  };



  const [copySuccess, setCopySuccess] = useState('');
  const textAreaRef = useRef(null);

  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand('copy');
    e.target.focus();
    setCopySuccess('Copied!');
  };

  console.log(peerId)
  return (
    <div className='w-100 row justify-content-center p-3'>
      <Row className=' justify-content-center '>
        <Row className=' justify-content-center '>
          {user.role === 'teacher' && <>
            <Col xl={6} xs={12} className="mt-3">
              <h5 className='row justify-content-center '>
                Current User Id is:<input className='col-5 ml-2 id-input' ref={textAreaRef} value={peerId} />
              </h5>
            </Col>
            <Col xl={3} xs={1} className="mt-2">

              <button className='text-white stream-start-btn ' onClick={copyToClipboard}>Copy</button>
              {copySuccess}

            </Col>


          </>}
        </Row>

        {user.role === 'student' && <>
          <input className='p-2 stream-input col-4' type="text" value={remotePeerIdValue} onChange={e => setRemotePeerIdValue(e.target.value)} />
          <button className=' ml-2 text-white stream-start-btn col-2' onClick={() => call(remotePeerIdValue)}>Call</button>
        </>}
      </Row>




      <Row className=' justify-content-center mt-4'>
        <video className='col-lg-3 col-6 stream-video<div>
          <button onClick={copyToClipboard}>Copy</button> 
          {copySuccess}
        </div> bg-white m-1' ref={currentUserVedioRef} />
        <video className='col-lg-8 col-9  stream-video bg-white m-1' ref={remoteVideoRef} />

      </Row>
      <br></br>
      <Row className=' justify-content-center mt-4'>
        <Link className='stream-close-btn col-2 p-1' to={'/dashboard/stream'} onClick={() => {
           Peer.close()
        }}>
          Close
        </Link>
      </Row>

    </div>
  );
}

export default Stream;
