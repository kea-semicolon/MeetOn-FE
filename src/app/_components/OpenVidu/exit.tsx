'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios' // Assuming React-Bootstrap for tooltip, modify as needed
import { OpenVidu, Session, Publisher } from 'openvidu-browser'
import Image from 'next/image'
import { Exit } from '@/_assets/Icons'

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface RecordingEvent extends SignalEvent {
  data: string // 이제 data는 필수
}

const Leave = () => {
  const sessionName = 'SessionA'
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const [sessionVisible, setSessionVisible] = useState(false)

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

  return (
    <div>
      <Image src={Exit} alt="exit" onClick={leaveSessionClick} />
    </div>
  )
}

export default Leave
