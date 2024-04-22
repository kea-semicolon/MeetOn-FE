const MeetingMinutesList = () => {
    const today = new Date();
    const weekdays = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    const weekday = weekdays[today.getDay()];
    const month = today.toLocaleString('default', { month: 'long' });
    const day = today.getDate();

    return (
        <div className="px-6 pl-4 pr-4 mt-4">
            <p className="text-[18px] font-normal ml-1">{`${month} ${day}일 ${weekday}`}</p>
            <div
                className="my-8 mt-2 justify-center rounded-[6px] text-[16px] text-[#959595] flex items-center pl-3 pr-2 pt-2 pb-2 w-full h-[56px] bg-white border border-1">
                회의록이 존재하지 않습니다.
            </div>

        </div>
    );
}

export default MeetingMinutesList;
