import { useState } from 'react'

const Table = () => {
  // 고유한 id를 생성하는 함수
  const createRow = () => ({
    id: Math.random().toString(36).substr(2, 9),
    cells: ['', ''],
  })

  const initialRows = Array.from({ length: 9 }, createRow)
  const [tableRows, setTableRows] = useState(initialRows)

  // 행 추가
  const addRow = () => {
    setTableRows([...tableRows, createRow()])
  }

  // 셀 값 변경
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

  return (
    <div className="rounded-[6px] overflow-hidden border border-[#959595]">
      <table className="table-fixed w-full bg-[#ffffff]">
        <thead>
          <tr>
            <th className="w-1/5 text-center font-normal text-[14px] border-b border-r border-[#959595] tracking-wider">
              회의 날짜
            </th>
            <th className="px-6 py-3 text-center font-normal text-[14px] border-b border-l border-[#959595] tracking-wider">
              회의 제목
            </th>
          </tr>
        </thead>
        <tbody>
          {tableRows.map((row) => (
            <tr key={row.id} className="w-1/5 border-b border-[#959595]">
              {row.cells.map((cell, columnIndex) => (
                // eslint-disable-next-line react/jsx-key
                <td className="w-1/5 border-r border-[#959595] px-6 py-4 whitespace-nowrap">
                  <label
                    htmlFor={`cell-${row.id}-${columnIndex}`}
                    className="sr-only"
                  >
                    {columnIndex === 0 ? '회의 날짜' : '회의 제목'}
                  </label>
                  <input
                    id={`cell-${row.id}-${columnIndex}`}
                    type="text"
                    value={cell}
                    onChange={(e) =>
                      handleChangeCell(row.id, columnIndex, e.target.value)
                    }
                    style={{ width: '100%', backgroundColor: 'transparent' }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
