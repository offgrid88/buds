"use client";

export default function NavBar() {
    return (
        <div className="flex justify-between items-center my-[1.5rem] mx-[7%] max-w-[80vw]">
            <h1 className="text-2xl font-bold">buds ✿</h1>
            <div className="flex items-center gap-4">
                <button className="text-lg font-medium hover:cursor-pointer">about</button>
            </div>
        </div>
    );
}