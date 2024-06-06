'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios' // Assuming React-Bootstrap for tooltip, modify as needed
import { OpenVidu, Session, Publisher } from 'openvidu-browser'
import Image from 'next/image'
import openvidu from '@/_assets/Images/openvidu.png'

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

const Join = () => {
  const sessionName = 'SessionA'
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let numVideos = 0

  const [sessionVisible, setSessionVisible] = useState(false)
  // publisheVar 마이크만 사용
  const [publishVar, setPublishVar] = useState<Publisher | null>(null)

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
        localStorage.setItem('isRecording', 'true')
        localStorage.setItem('recordId', res)
      },
    })
  }, [])

  // jwt토큰 얻기
  useEffect(() => {
    const jwtToken = localStorage.getItem('token')
    if (jwtToken) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      joinSession()
      // join()
      setSessionVisible(true)
    }
  }, [])

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
          // removeUser()
        }
        if (event.reason !== 'sessionClosedByServer') {
          numVideos = 0
        }
      })

      session.on('exception', (exception) => {
        console.warn(exception)
      })

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

  function updateNumVideos(i: number) {
    numVideos += i
  }

  return <Image src={openvidu} alt="openvidu" onClick={joinSession} />
}

export default Join
