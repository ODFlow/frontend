
import {createTheme} from "@mui/material";

const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#6254B5"
        },
        secondary: {
            main: "#007800",
        },
        background: {
            default: "#121212",
            paper: "#1E1E1E",
        },
        text: {
            primary: {
                main: "#FFFFFF",
                secondary: "#6254b5",
            },
        },

        customValues: {
            safetyRatingColors: {
                excellent: '#6254b5',
                good: '#7165bc',
                average: '#8176c3',
                poor: '#9187cb',
            }
        }

    }
})

export default theme