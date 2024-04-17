import { useState } from "react";

const Table = () => {
    const initialRows = Array.from({ length: 9 }, () => Array.from({ length: 2 }, () => ""));
    const [tableRows, setTableRows] = useState(initialRows);

    // 행 추가
    const addRow = () => {
        setTableRows([...tableRows, Array.from({ length: 2 }, () => "")]);
    };

    // 셀 값 변경
    const handleChangeCell = (rowIndex:number, columnIndex:number, value:string) => {
        const updatedRows = [...tableRows];
        updatedRows[rowIndex][columnIndex] = value;
        setTableRows(updatedRows);
    };

    return (
        <div className="rounded-[6px] overflow-hidden border border-[#959595]">
            <table className="table-fixed w-full bg-[#D9D9D9]">
                <thead>
                <tr>
                    <th className="w-1/5 text-center font-normal text-[14px] border-b border-r border-[#959595] tracking-wider">회의 날짜</th>
                    <th className="px-6 py-3 text-center font-normal text-[14px] border-b border-l border-[#959595] tracking-wider">회의 제목</th>
                </tr>
                </thead>
                <tbody>
                {tableRows.map((row, rowIndex) => (
                    <tr key={rowIndex} className="w-1/5 border-b border-[#959595]">
                        {row.map((cell, columnIndex) => (
                            <td key={columnIndex} className="w-1/5 border-r border-[#959595] px-6 py-4 whitespace-nowrap">
                                <input
                                    type="text"
                                    value={cell}
                                    onChange={(e) => handleChangeCell(rowIndex, columnIndex, e.target.value)}
                                    style={{ width : '100%',backgroundColor: '#d9d9d9' }}
                                />
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
