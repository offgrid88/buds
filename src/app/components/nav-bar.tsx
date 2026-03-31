"use client";

export default function NavBar() {
    return (
        <div className="flex justify-between items-center my-[1.5rem] mx-[7%] max-w-[80vw]">
            <h1 className="text-[1.8rem] font-bold">buds ✿</h1>
            <div className="flex items-center gap-4">
                <button className="text-[1.35rem] font-medium hover:cursor-pointer">about</button>
            </div>
        </div>
    );
}