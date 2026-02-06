import { commonConstants } from "@/constants";

export const App = () => (
    <div
        className="
            flex
            min-h-screen
            items-center
            justify-center
            bg-gray-50
        "
    >
        <h1 className="text-3xl font-bold text-blue-600">{commonConstants.appName}</h1>
    </div>
);
