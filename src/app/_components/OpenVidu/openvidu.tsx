'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios' // Assuming React-Bootstrap for tooltip, modify as needed
import { OpenVidu, Session, Publisher } from 'openvidu-browser'
// import './openvidu-browser-2.29.0'
import { Setting, UnVoice, Voice, Exit } from '@/_assets/Icons'
import Image from 'next/image'

let session: Session
let OV: OpenVidu
let token: string

interface HttpRequestParams {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' // HTTP methods you intend to use
  url: string // URLs should be strings
  body: Record<string, string> // Object for the body, allowing any value type
  errorMsg: string // Error messages are strings
  callback: (response: string) => void // Callback function, can be more specific based on expected response
}
// interface RecordingEvent {
//   data: string | undefined
// }
interface SignalEvent {
  data?: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface RecordingEvent extends SignalEvent {
  data: string // 이제 data는 필수
}

const Openvidu = () => {
  const sessionName = 'SessionA'
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let numVideos = 0

  // 이미지
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [exitSrc, setExitSrc] = useState(Exit)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [settingSrc, setSettingSrc] = useState(Setting)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [voiceSrc, setVoiceSrc] = useState(Voice)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [unVoiceSrc, setUnVoiceSrc] = useState(UnVoice)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [recording, setRecording] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>()

  const [sessionVisible, setSessionVisible] = useState(false)
  const [publishVar, setPublishVar] = useState<Publisher | null>(null)
  // 한 chunks 녹음 유무
  const [isRecording, setIsRecording] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isRecording2, setIsRecording2] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [base64Audio, setBase64Audio] = useState('')

  const httpRequest = ({ method, url, body, callback }: HttpRequestParams) => {
    const http = new XMLHttpRequest()
    http.open(method, url, true)
    http.setRequestHeader('Content-type', 'application/json')
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    http.addEventListener('readystatechange', processRequest, false)
    http.send(JSON.stringify(body))

    function processRequest() {
      if (http.readyState === 4) {
        if (http.status !== 200) {
          /* empty */
        } else {
          try {
            const response = JSON.parse(http.responseText)
            callback(response)
          } catch (error) {
            /* empty */
          }
        }
      }
    }
  }

  // 페이지 새로고침 시 녹음 상태 확인
  useEffect(() => {
    const recordingStatus = localStorage.getItem('recording')
    setIsRecording(recordingStatus === 'true')
  }, [])

  // 녹음 전체 시작 및 종료 적용
  useEffect(() => {
    httpRequest({
      method: 'GET',
      url: `https://localhost:5000/redis/${sessionName}`,
      body: {
        sessionName,
      },
      errorMsg: 'Request of session gone WRONG:',
      callback: (res: string) => {
        setIsRecording(true)
        localStorage.setItem('isRecording', 'true')
        localStorage.setItem('recordId', res)
      },
    })
  }, [])

  // jwt토큰 얻기
  useEffect(() => {
    const jwtToken = localStorage.getItem('token')
    if (jwtToken) {
      console.log('join')
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      joinSession()
      // join()
      setSessionVisible(true)
    }
  }, [])

  const removeUser = () => {
    const value = localStorage.getItem('token')
    token = value || ''
    httpRequest({
      method: 'POST',
      url: 'https://localhost:5000/recording-java/api/remove-user',
      body: {
        sessionName,
        token,
      },
      errorMsg: "User couldn't be removed from session",
      callback: () => {},
    })
  }

  const getToken = (callback: (res: string) => boolean) => {
    // sessionName = $('#sessionName').text() // Video-call chosen by the user
    httpRequest({
      method: 'POST',
      url: 'https://localhost:5000/recording-java/api/get-token',
      body: {
        sessionName,
      },
      errorMsg: 'Request of TOKEN gone WRONG:',
      // callback: (res: any) => {
      //   token = res.token as string
      //   console.warn(`Request of TOKEN gone WELL (TOKEN:${token})`)
      //   callback(token)
      // },
      callback: (res: string) => {
        // eslint-disable-next-line prefer-destructuring
        token = res[0] // Get token from response
        localStorage.setItem('token', res[0])
        callback(res[0]) // Continue the join operation\
      },
    })
  }

  const joinSession = () => {
    setSessionVisible(true)

    getToken(function () {
      OV = new OpenVidu()

      session = OV.initSession()

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      session.on('connectionCreated', (event) => {})
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      session.on('connectionDestroyed', (event) => {})

      session.on('streamCreated', (event) => {
        const subscriber = session.subscribe(event.stream, 'video-container')

        subscriber.on('videoElementCreated', () => {
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          updateNumVideos(1)
        })

        subscriber.on('videoElementDestroyed', () => {
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          updateNumVideos(-1)
        })

        subscriber.on('streamPlaying', () => {})
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      session.on('streamDestroyed', (event) => {})

      session.on('sessionDisconnected', (event) => {
        if (event.reason !== 'disconnect') {
          removeUser()
        }
        if (event.reason !== 'sessionClosedByServer') {
          numVideos = 0
        }
      })

      // session.on('recordingStarted', (event) => {
      //   // eslint-disable-next-line @typescript-eslint/no-use-before-define
      //   pushEvent(event)
      // })
      //
      // session.on('recordingStopped', (event) => {
      //   // eslint-disable-next-line @typescript-eslint/no-use-before-define
      //   pushEvent(event)
      // })

      // On every asynchronous exception...
      session.on('exception', (exception) => {
        console.warn(exception)
      })

      session
        .connect(token)
        .then(() => {
          //   $('#session-title').text(sessionName)
          //   $('#join').hide()
          //   $('#session').show()

          // --- 6) Get your own camera stream ---

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

          publisher.on('accessAllowed', () => {})

          publisher.on('accessDenied', () => {})
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          publisher.on('accessDialogOpened', (event) => {})
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          publisher.on('accessDialogClosed', (event) => {})
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          publisher.on('streamCreated', (event) => {})
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          publisher.on('videoElementCreated', (event) => {
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            updateNumVideos(1)
            // $(event.element).prop('muted', true) // Mute local video
          })
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          publisher.on('videoElementDestroyed', (event) => {
            // Add a new HTML element for the user's name and nickname over its video
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            updateNumVideos(-1)
          })

          publisher.on('streamPlaying', () => {})
          session.publish(publisher)
          setPublishVar(publisher)
        })
        .catch((error) => {
          console.warn(
            'There was an error connecting to the session:',
            error.code,
            error.message,
          )
          // enableBtn();
        })

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

  // 나혼자 나가기 클릭
  const leaveSessionClick = () => {
    setSessionVisible(!sessionVisible)
    removeUser()
    session.disconnect()
    localStorage.clear()
    // stopRecordingDown()
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const leaveSession = () => {
    setSessionVisible(!sessionVisible)
    removeUser()
    session.disconnect()
  }

  // 채널 폭파
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function closeSession() {
    setSessionVisible(!sessionVisible)
    httpRequest({
      method: 'DELETE',
      url: 'https://localhost:5000/recording-java/api/close-session',
      body: {
        sessionName,
      },
      errorMsg: "Session couldn't be closed",
      callback: () => {},
    })
  }

  // 새로고침전 유저 제거를 해야 유저가 늘어나지 않음
  window.onbeforeunload = function () {
    if (session) {
      removeUser()
      leaveSession()
    }
  }
  if (typeof window !== 'undefined') {
    window.onbeforeunload = function () {
      if (session) {
        removeUser()
        leaveSession()
      }
    }
  }

  // openvidu 전체 녹음
  const startRecordingSignal = () => {
    const outputMode = 'COMPOSED'
    const hasAudio = 'true'
    const hasVideo = 'true'
    setIsRecording(true) // Set the local state to reflect recording started
    axios
      .post(`https://localhost:5000/recording-java/api/recording/start`, {
        session: session.sessionId,
        outputMode,
        hasAudio,
        hasVideo,
        sessionName,
      })
      .then((response) => {
        setIsRecording(true) // Set the local state to reflect recording started
        localStorage.setItem('recordId', response.data.sessionId)
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch((error) => {
        console.log('start-record-api fail')
      })
  }

  function upload() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const recordId = localStorage.getItem('recordId').toString()
    console.log(`recordId : ${recordId}`)
    httpRequest({
      method: 'GET',
      url: `https://localhost:5000/recording-java/api/recording/get/${recordId}`,
      body: {},
      errorMsg: 'Stop recording WRONG',
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      callback: (res: unknown) => {},
    })
  }

  // openvidu 전체 녹음
  function stopRecording() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const recordId = localStorage.getItem('recordId').toString()
    console.log(`recordId : ${recordId}`)
    axios
      .post(`https://localhost:5000/recording-java/api/recording/stop`, {
        recording: recordId,
      })
      .then((response) => {
        setIsRecording(false)
        localStorage.setItem('url', response.data.url)
        upload()
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch((error) => {
        console.log('start-record-api fail')
      })
  }

  if (typeof window !== 'undefined') {
    window.onbeforeunload = function () {
      if (session) {
        removeUser()
        // leaveSession();
      }
    }
  }

  function updateNumVideos(i: number) {
    numVideos += i
  }

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
            <Image src={unVoiceSrc} alt="" onClick={muteAudioAndPublish} />
          ) : (
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
              onMouseUp={startRecordingSignal}
            />
          )}
          <input
            className="btn btn-md btn-danger"
            type="button"
            value="업로드"
            onMouseUp={upload}
          />
          <Image src={exitSrc} alt="" onClick={leaveSessionClick} />
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

export default Openvidu
