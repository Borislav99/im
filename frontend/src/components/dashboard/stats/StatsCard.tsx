import { useNavigate } from "react-router-dom";
import { Button } from "../../common";
import { StatsCardProps } from "./types";
import { useAppDispatch } from "../../../store";
import { changeActiveLink } from "../../../features/dashboardSlice/dashboardSlice";

export const StatsCard = ({ name, number, navigateTo }: StatsCardProps) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate(navigateTo);
        dispatch(changeActiveLink(name));
    };
    return (
        <div className="w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-md duration-300 hover:scale-105 hover:shadow-xl">
            <h1 className="mt-2 text-center text-2xl font-bold text-gray-500">
                {name.toUpperCase()}
            </h1>
            <p className="my-4 text-center text-sm text-gray-500">
                Currently you have created {number} {name}
            </p>
            <Button
                backgroundColor="bg-blue-500"
                hoverColor="hover:bg-blue-400"
                text={`Go to ${name}`}
                onClick={handleNavigate}
            />
        </div>
    );
};
