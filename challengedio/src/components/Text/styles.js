import styled, { css } from 'styled-components';

export const Title = styled.p`
    ${({ as }) => css`

        ${as === 'h1' && css`
            font-size: 30px;
            color: black;
        `}
    `}

`;
