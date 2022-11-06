import styled from "styled-components";


export const Container = styled.div`
    padding: 5px;
    margin: 5px 0;

    border: 1px solid #ccc;
    border-radius: 5px;

    display: flex;
    flex-direction: column;
`;

export const TaskArea = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 5px;
`;

export const ButtonArea = styled.div`
        display: flex;
        gap: 5px;
`;

export const MoveArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 5px;
    padding: 10px 0;
`;

