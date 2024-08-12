import {Typography} from "@mui/material";

const ItemText = ({ children, color }: { children: any, color: string }) => {
    return (
        <div className={`px-2 py-1 rounded-full ${color}`}>
            <Typography variant="body2" fontWeight={'400'}>{children}</Typography>
        </div>
    );
}

export default ItemText;
