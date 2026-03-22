"use client";

export default function NavBar() {
    return (
        <div className="flex justify-between items-center p-4">
            <h1 className="text-2xl font-bold">buds</h1>
            <div className="flex items-center gap-4">
                <button className="text-sm font-medium">about</button>
            </div>
        </div>
    );
}