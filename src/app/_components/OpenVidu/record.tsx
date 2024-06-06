'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios' // Assuming React-Bootstrap for tooltip, modify as needed
import { Session } from 'openvidu-browser'
import Image from 'next/image'

let session: Session
let token: string

interface HttpRequestParams {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' // HTTP methods you intend to use
  url: string // URLs should be strings
  body: Record<string, string> // Object for the body, allowing any value type
  errorMsg: string // Error messages are strings
  callback: (response: string) => void // Callback function, can be more specific based on expected response
}

interface SignalEvent {
  data?: string
}

const Record = () => {
  const sessionName = 'SessionA'

  // 한 chunks 녹음 유무
  const [isRecording, setIsRecording] = useState(false)

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

  return (
    <div>
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
    </div>
  )
}

export default Record
