import {Analytics} from "@vercel/analytics/next";
import {Toaster} from "sonner";
import {Add} from "@/components/Add";

export default function Home() {
    return (
        <>
            <Add/>
            <Analytics/>
            <Toaster richColors/> {/* 옵션: richColors 쌈뽕하게! */}
        </>
    );
}
