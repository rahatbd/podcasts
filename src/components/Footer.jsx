import styled from 'styled-components';

const StyledFooter = styled.footer`
    text-align: center;
    border-block-start: 2px solid ${({ theme }) => theme.darkTheme.borderColour};
    padding-block: 1rem;
`;

function Footer() {
    return (
        <StyledFooter>
            <p>&copy; Rahat Rahman 2023</p>
            <small>Powered by Listen Notes</small>
        </StyledFooter>
    );
}

export default Footer;
