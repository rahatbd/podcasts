import styled from 'styled-components';

const StyledHeader = styled.header`
    text-align: center;
    border-block-end: 3px solid #ffbd14;
    padding-block: 1rem;
`;

function Header() {
    return (
        <StyledHeader>
            <div className="wrapper">
                <h1>Podcasts</h1>
            </div>
        </StyledHeader>
    );
}

export default Header;
