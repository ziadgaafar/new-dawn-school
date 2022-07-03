import { useEffect, useState, useRef } from 'react';

import {Peer} from "peerjs"






function Stream() {


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




  console.log(peerId)
  return (
    <div className="App">
      <h5>
        Current User Id is : {peerId}
      </h5>
      <input type="text" value={remotePeerIdValue} onChange={e => setRemotePeerIdValue(e.target.value)} />
      <button onClick={() => call(remotePeerIdValue)}>Call</button>
      <div> <video ref={currentUserVedioRef} /> </div>
      <div> <video ref={remoteVideoRef} /> </div>
 
    </div>
  );
}

export default Stream;
