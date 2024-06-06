'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios' // Assuming React-Bootstrap for tooltip, modify as needed
import { OpenVidu, Session, Publisher } from 'openvidu-browser'
import { UnVoice, Voice } from '@/_assets/Icons'
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

interface SignalEvent {
  data?: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface RecordingEvent extends SignalEvent {
  data: string // 이제 data는 필수
}

const Mike = () => {
  const [publishVar, setPublishVar] = useState<Publisher | null>(null)

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

  return (
    <div>
      {mute ? (
        <Image src={UnVoice} alt="unvoice" onClick={muteAudioAndPublish} />
      ) : (
        <Image src={Voice} alt="unvoice" onClick={muteAudioAndPublish} />
      )}
    </div>
  )
}

export default Mike
