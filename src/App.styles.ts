import styled from "styled-components";


export const Container = styled.div`
    background-color: #17181F;
    color: #fff;
    min-height: 100vh;
`;

export const Area = styled.div`
    margin: auto;
    max-width: 980px;
    padding: 10px;

    h1 {
        text-align: center;
    }
`;

export const Header = styled.h1`
    color: #fff;
    text-align: center;
    border-bottom: 1px solid #444;
    padding-bottom: 10px;
`;

export const Board = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
`;