import { CSSProperties, createTheme } from "@mantine/core";

const themeOverride = createTheme({
    colors: {
        blue: ["#177AE3", "#177AE3", "#177AE3", "#177AE3", "#177AE3", "#177AE3", "#177AE3", "#177AE3", "#177AE3", "#177AE3"],
        violet: [
            "#6E54B5",
            "#6E54B5",
            "#6E54B5",
            "#6E54B5",
            "#6E54B5",
            "#6E54B5",
            "#6E54B5",
            "#6E54B5",
            "#6E54B5",
            "#6E54B5",
        ]
    },
    breakpoints: {
        xs: '30em',
        sm: '48em',
        md: '64em',
        lg: '74em',
        xl: '90em',
    },
    components: {
        Input: {
            styles: {
                input: {
                    borderRadius: 8,
                    border: 0,
                    backgroundColor: "#3B364C",
                    color: "#FFF",
                    height: 45,
                } as CSSProperties
            }
        },
        InputWrapper: {
            styles: {
                root: {
                } as CSSProperties
            }
        },
        Button: {
            styles: {
                root: {
                    borderRadius: 8,
                    height: 45,
                } as CSSProperties
            }
        },
        Pill: {
            styles: {
                inner: {
                    backgroundColor: "#FFF"
                } as CSSProperties
            }
        },
        Checkbox: {
            styles: {
                root: {
                    cursor: "pointer"
                } as CSSProperties
            }
        },
        Switch: {
            styles: {
                track: {
                    cursor: "pointer"
                } as CSSProperties
            }
        }
    },
    primaryColor: "violet",
});

export default themeOverride;