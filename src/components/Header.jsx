import styled from 'styled-components';

const StyledHeader = styled.header`
    text-align: center;
    border-block-end: 2px solid #ffbd14;
    padding-block: 1rem;
`;

function Header() {
    return (
        <StyledHeader>
            <h1>Podcasts</h1>
        </StyledHeader>
    );
}

export default Header;
