import React, { useEffect, useState } from 'react'
import MeetingMinutesList from '@/_components/Meeting-minutes/meetingMinutesList'
import MinutesForm from './minutesForm'

type Event = {
  id: string
  title: string
  start: string
  end: string
  content: string
}

interface TableProps {
  events: Event[]
}

const Table: React.FC<TableProps> = ({ events }) => {
  const [tableRows, setTableRows] = useState<{ id: string; cells: string[] }[]>(
    [],
  )
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null) // Add selectedEvent state

  useEffect(() => {
    if (events.length > 0) {
      const rowsWithEvents = events.map((event) => ({
        id: event.id,
        cells: [new Date(event.start).toLocaleDateString(), event.title],
      }))
      console.log('rowsWithevents', rowsWithEvents)
      setTableRows(rowsWithEvents)
    }
  }, [events])

  const handleChangeCell = (
    rowId: string,
    columnIndex: number,
    value: string,
  ) => {
    const updatedRows = tableRows.map((row) =>
      row.id === rowId
        ? {
            ...row,
            cells: row.cells.map((cell, idx) =>
              idx === columnIndex ? value : cell,
            ),
          }
        : row,
    )
    setTableRows(updatedRows)
  }

  const handleTitleClick = (rowId: string) => {
    const clickedEvent = events.find((event) => event.id === rowId)
    console.log('clicked event : ', clickedEvent)
    setSelectedEvent(clickedEvent || null)
  }

  return (
    <div>
      {!selectedEvent && (
        <div className="rounded-[6px] overflow-hidden border border-[#959595]">
          <table className="table-fixed w-full bg-[#ffffff]">
            <thead>
              <tr>
                <th className="w-1/5 bg-[#000000] text-center font-normal text-[14px] text-[#ffffff] tracking-wider border-r border-[#959595]">
                  회의 날짜
                </th>
                <th className="bg-[#000000] px-6 py-3 text-center font-normal text-[14px] text-[#ffffff] tracking-wider">
                  회의 제목
                </th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, rowIndex) => (
                <tr
                  key={row.id}
                  className={`w-1/5 border-b border-[#959595] ${rowIndex === tableRows.length - 1 ? 'border-none' : ''}`}
                >
                  {row.cells.map((cell, columnIndex) => (
                    <td
                      key={`${row.id}-${columnIndex}`}
                      className={`w-1/5 px-6 py-4 whitespace-nowrap text-[14px] ${
                        columnIndex === 0 ? 'border-r' : ''
                      }`}
                    >
                      <label
                        htmlFor={`cell-${row.id}-${columnIndex}`}
                        className="sr-only"
                      >
                        {columnIndex === 0 ? '회의 날짜' : '회의 제목'}
                      </label>
                      <button
                        onClick={
                          () =>
                            columnIndex === 0 ? null : handleTitleClick(row.id) // Handle title click
                        }
                        className="w-full bg-transparent text-left"
                      >
                        {cell}
                      </button>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {selectedEvent && <MinutesForm eventDetails={selectedEvent} />}{' '}
    </div>
  )
}

export default Table
