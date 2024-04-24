'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios' // Assuming React-Bootstrap for tooltip, modify as needed
// eslint-disable-next-line import/no-extraneous-dependencies
import { OpenVidu, Session, SignalEvent, Publisher } from 'openvidu-browser'
// eslint-disable-next-line import/named
import { Setting, UnVoice, Voice, Exit } from '@/_assets/Icons'
import Image from 'next/image'

let session = null
let OV
let token = null

function OpenViduFile() {
  const [users, setUsers] = useState([])

  const sessionName = 'SessionA'
  let numVideos = 0

  const [sessionVisible, setSessionVisible] = useState(false)
  const [publishVar, setPublishVar] = useState(null)
  const [isRecording, setIsRecording] = useState(false)
  const [exitSrc, setExitSrc] = useState(Exit)
  const [settingSrc, setSettingSrc] = useState(Setting)
  const [voiceSrc, setVoiceSrc] = useState(Voice)
  const [unVoiceSrc, setUnVoiceSrc] = useState(UnVoice)

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (session !== null) {
      const recordingHandler = (event) => {
        if (event.data === 'recording-started') {
          setIsRecording(true)
        } else if (event.data === 'recording-stopped') {
          setIsRecording(false)
        }
      }

      session.on('signal:recording', recordingHandler)

      // 반환 함수에서 session이 null인지 확인
      return () => {
        if (session) {
          session.off('signal:recording', recordingHandler)
        }
      }
    }
  }, [session]) // session이 변경될 때마다 useEffect 실행

  const joinSession = () => {
    setSessionVisible(!sessionVisible)

    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    getToken(function () {
      OV = new OpenVidu()

      session = OV.initSession()

      session.on('connectionCreated', (event) => {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        pushEvent(event)
        setUsers((prevUsers) => [
          ...prevUsers,
          {
            connectionId: event.connection.connectionId,
            data: event.connection.connectionId,
          },
        ])
      })

      session.on('connectionDestroyed', (event) => {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        pushEvent(event)
        setUsers((prevUsers) =>
          prevUsers.filter(
            (user) => user.connectionId !== event.connection.connectionId,
          ),
        )
      })

      session.on('streamCreated', (event) => {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        pushEvent(event)

        const subscriber = session.subscribe(event.stream, 'video-container')

        // eslint-disable-next-line @typescript-eslint/no-shadow
        subscriber.on('videoElementCreated', (event) => {
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          pushEvent(event)
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          updateNumVideos(1)
        })

        // eslint-disable-next-line @typescript-eslint/no-shadow
        subscriber.on('videoElementDestroyed', (event) => {
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          pushEvent(event)
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          updateNumVideos(-1)
        })

        // eslint-disable-next-line @typescript-eslint/no-shadow
        subscriber.on('streamPlaying', (event) => {
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          pushEvent(event)
        })
      })

      session.on('streamDestroyed', (event) => {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        pushEvent(event)
      })

      session.on('sessionDisconnected', (event) => {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        pushEvent(event)
        if (event.reason !== 'disconnect') {
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          removeUser()
        }
        if (event.reason !== 'sessionClosedByServer') {
          session = null
          numVideos = 0
        }
      })

      session.on('recordingStarted', (event) => {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        pushEvent(event)
      })

      session.on('recordingStopped', (event) => {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        pushEvent(event)
      })

      // On every asynchronous exception...
      session.on('exception', (exception) => {})

      session
        .connect(token)
        .then(() => {
          const publisher = OV.initPublisher('video-container', {
            audioSource: undefined, // The source of audio. If undefined default microphone
            videoSource: undefined, // The source of video. If undefined default webcam
            publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
            publishVideo: true, // Whether you want to start publishing with your video enabled or not
            resolution: '640x480', // The resolution of your video
            frameRate: 30, // The frame rate of your video
            insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
            mirror: false, // Whether to mirror your local video or not
          })

          publisher.on('accessAllowed', (event) => {
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            pushEvent({
              type: 'accessAllowed',
            })
          })

          publisher.on('accessDenied', (event) => {
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            pushEvent(event)
          })

          publisher.on('accessDialogOpened', (event) => {
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            pushEvent({
              type: 'accessDialogOpened',
            })
          })

          publisher.on('accessDialogClosed', (event) => {
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            pushEvent({
              type: 'accessDialogClosed',
            })
          })

          publisher.on('streamCreated', (event) => {
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            pushEvent(event)
          })

          publisher.on('videoElementCreated', (event) => {
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            pushEvent(event)
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            updateNumVideos(1)
            // $(event.element).prop('muted', true) // Mute local video
          })

          publisher.on('videoElementDestroyed', (event) => {
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            pushEvent(event)
            // Add a new HTML element for the user's name and nickname over its video
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            updateNumVideos(-1)
          })

          publisher.on('streamPlaying', (event) => {
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            pushEvent(event)
          })

          session.publish(publisher)
          setPublishVar(publisher)
        })
        .catch(() => {})

      return false
    })
  }

  const [mute, setMute] = useState(false)
  const muteAudioAndPublish = () => {
    setMute((prevMute) => {
      const newMuteState = !prevMute
      if (publishVar) {
        publishVar.publishAudio(!newMuteState) // Toggle the audio publishing
      }
      return newMuteState
    })
  }

  // 나혼자 나가기
  const leaveSession = () => {
    setSessionVisible(!sessionVisible)
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    removeUser()
    session.disconnect()
  }

  // eslint-disable-next-line consistent-return
  const getToken = (callback) => {
    // sessionName = $('#sessionName').val() // Video-call chosen by the user
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    httpRequest(
      'POST',
      'https://localhost:5000/recording-java/api/get-token',
      {
        sessionName,
      },
      'Request of TOKEN gone WRONG:',
      (res) => {
        // eslint-disable-next-line prefer-destructuring
        token = res[0] // Get token from response
        callback(res[0]) // Continue the join operation\
      },
    )
  }

  const removeUser = () => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    httpRequest(
      'POST',
      'https://localhost:5000/recording-java/api/remove-user',
      {
        sessionName,
        token,
      },
      "User couldn't be removed from session",
      () => {},
    )
  }

  // 채널 폭파
  // function closeSession() {
  //   setSessionVisible(!sessionVisible)
  //   // eslint-disable-next-line @typescript-eslint/no-use-before-define
  //   httpRequest(
  //     'DELETE',
  //     'https://localhost:5000/recording-java/api/close-session',
  //     {
  //       sessionName,
  //     },
  //     "Session couldn't be closed",
  //     () => {},
  //   )
  // }

  function listRecordings() {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    httpRequest(
      'GET',
      `https://localhost:5000/recording-java/api/recording/get/${session.sessionId}`,
      {},
      'List recordings WRONG',
      (res) => {},
    )
  }

  const httpRequest = (method, url, body, errorMsg, callback) => {
    const http = new XMLHttpRequest()
    http.open(method, url, true)
    http.setRequestHeader('Content-type', 'application/json')
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    http.addEventListener('readystatechange', processRequest, false)
    http.send(JSON.stringify(body))

    function processRequest() {
      if (http.readyState === 4) {
        if (http.status === 200) {
          try {
            callback(JSON.parse(http.responseText))
          } catch (e) {
            callback(e)
          }
        }
      }
    }
  }

  const startRecording = () => {
    const outputMode = 'COMPOSED'
    const hasAudio = 'true'
    const hasVideo = 'true'

    axios
      .post(`https://localhost:5000/recording-java/api/recording/start`, {
        session: session.sessionId,
        outputMode,
        hasAudio,
        hasVideo,
      })
      .then((response) => {
        setIsRecording(true) // Set the local state to reflect recording started
        session.signal({
          data: 'recording-started', // Any necessary data
          to: [], // Sending to everyone in the session
          type: 'recording',
        })
      })
      .catch(() => {})
  }

  function stopRecording() {
    httpRequest(
      'POST',
      'https://localhost:5000/recording-java/api/recording/stop',
      {
        recording: session.sessionId,
      },
      'Stop recording WRONG',
      (res) => {
        setIsRecording(false) // Reset recording state
        session.signal({
          data: 'recording-stopped', // Any necessary data
          to: [], // Sending to everyone in the session
          type: 'recording',
        })
      },
    )
    listRecordings()
  }

  window.onbeforeunload = function () {
    // Gracefully leave session
    if (session) {
      removeUser()
      leaveSession()
    }
  }

  function updateNumVideos(i) {
    numVideos += i
  }

  function pushEvent(event) {}

  return (
    <div className="flex justify-between items-center">
      <div
        id="main-container"
        className="flex justify-between items-center"
        style={{ display: sessionVisible ? 'none' : 'block' }}
      >
        <div id="join" className="flex justify-between items-center">
          <form
            className="form-group flex justify-between items-center"
            onSubmit={(e) => e.preventDefault()}
          >
            {/* eslint-disable-next-line react/button-has-type */}
            <button onClick={joinSession}>참가</button>
          </form>
        </div>
      </div>

      <div
        id="session"
        style={{ display: sessionVisible ? 'block' : 'none' }}
        className="flex justify-between items-center"
      >
        <div id="session-header" className="flex justify-between items-center">
          {mute ? (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
            <Image src={unVoiceSrc} alt="" onClick={muteAudioAndPublish} />
          ) : (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
            <Image src={voiceSrc} alt="" onClick={muteAudioAndPublish} />
          )}

          {isRecording ? (
            <input
              className="btn btn-md btn-danger"
              type="button"
              value="녹화 중지"
              onMouseUp={stopRecording}
            />
          ) : (
            <input
              className="btn btn-md btn-success"
              type="button"
              value="녹화 시작"
              onMouseUp={startRecording}
            />
          )}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
          <Image src={exitSrc} alt="" onClick={leaveSession} />
        </div>
        <div
          id="video-container"
          className="col-md-12"
          style={{ width: '1px', height: '1px' }}
        />
      </div>
    </div>
  )
}

export default OpenViduFile
