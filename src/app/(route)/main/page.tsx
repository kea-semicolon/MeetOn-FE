// src/app/(route)/main/page.tsx

import Calendar from '@/_components/Chart/calendar';

export default function MainPage() {
    return (
        <div>
            { /*
            <header className="h-20 p-5 bg-gray-900 mx-10 my-10">헤더</header>
            <main className="flex h-screen">
                <div className="w-1/5 p-4">메모</div>
                <div className="w-3/5 flex flex-col">
                    <div className="h-full m-5">
                        <Calendar />
                    </div>
                </div>
                <div className="w-1/5 p-4">채팅</div>
            </main>
            */ }

            <Calendar />




        </div>
    );
}
