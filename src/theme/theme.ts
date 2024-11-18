interface ITheme {
    background: string;
    color: string;
}

const THEME: Record<string, ITheme> = {
    purple: {
        background: '#9370DB',
        color: '#fff'
    },
    red: {
        background: '#ff0000',
        color: '#fff'
    }
};

export default THEME;