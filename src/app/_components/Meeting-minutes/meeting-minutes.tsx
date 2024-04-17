import Calendar from "@/_components/Chart/calendar";
import MeetingMinutesList from "@/_components/Meeting-minutes/meetingMinutesList";
import Toggle from "@/_components/Meeting-minutes/toggle";
import Table from "@/_components/Meeting-minutes/table";
import {useState} from "react";

const MeetingMinutes = () => {
    const [isCalendarView, setIsCalendarView] = useState(true);

    const handleToggleView = () => {
        setIsCalendarView(!isCalendarView);
    };

    return (
        <div className="w-3/5 h-full absolute bg-[#F8F9FB] ">
            <p className="flex justify-end px-6 py-4">
                <Toggle onToggle={handleToggleView} />
            </p>
            <div className="pl-4 pr-4 pb-4">
                {isCalendarView ? <Calendar showAddButton={false} />  : <Table /> }
            </div>
            <MeetingMinutesList />
        </div>
    );
};

export default MeetingMinutes;
