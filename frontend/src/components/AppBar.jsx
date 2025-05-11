// components/Appbar.jsx
import { SignOutMenu } from "./SignOutMenu";

export const Appbar = () => {
    return (
        <div className="shadow h-14 flex justify-between items-center px-4">
            <div className="text-lg font-semibold">
                PayTM App
            </div>
            <SignOutMenu />
        </div>
    );
};
