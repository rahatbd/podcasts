import Flag from 'react-world-flags';
import styled from 'styled-components';

const StyledPodcastsDiv = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(400px, 100%), 1fr));
    gap: var(--space);
`;

const StyledArticle = styled.article`
    line-height: 1.5;
    contain: content;
`;

const StyledCentreDiv = styled.div`
    display: grid;
    place-content: center;
    border-block-end: var(--border-inline-size) solid ${({ theme }) => theme.accentColour};
    padding-inline: var(--space);
`;

const StyledHeadingsDiv = styled(StyledCentreDiv)`
    text-align: center;
    text-wrap: balance;
    min-block-size: calc(125rem / 16);
`;

const StyledH2 = styled.h2`
    font-size: 1.1rem;
    font-weight: 800;
    letter-spacing: calc(1rem / 16);
`;

const StyledH3 = styled.h3`
    font-size: 1rem;
    font-weight: 500;
`;

const StyledSpan = styled.span`
    font-style: italic;
    font-weight: 200;
    font-variation-settings: 'opsz' 32;
`;

const StyledPodcastImg = styled.img`
    inline-size: calc(300rem / 16);
    aspect-ratio: 1;
`;

const StyledDescriptionDiv = styled(StyledCentreDiv)`
    min-block-size: calc(130rem / 16);
    padding-block: var(--space);
`;

const StyledDescriptionP = styled.p`
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
    max-inline-size: 70ch;
`;

const StyledCountryP = styled.p`
    font-weight: 300;
    text-align: center;
    padding: calc(var(--space) / 2) var(--space);
`;

const StyledFlagImg = styled(Flag)`
    inline-size: 1.25lh;
`;

function Podcasts({ bestPodcasts, options }) {
    function stripHtml(htmlString) {
        const string = new DOMParser().parseFromString(htmlString, 'text/html');
        return string.body.textContent || '';
    }

    function findRegion(country) {
        const { region } = options.find(({ name }) => name === country);
        return region;
    }

    return (
        <StyledPodcastsDiv>
            {bestPodcasts.podcasts.map(({ id, title, publisher, thumbnail, description, country }) => (
                <StyledArticle
                    className="border"
                    key={id}
                >
                    <StyledHeadingsDiv>
                        <StyledH2>{title}</StyledH2>
                        <StyledH3>
                            <StyledSpan>by</StyledSpan> {publisher}
                        </StyledH3>
                    </StyledHeadingsDiv>
                    <StyledCentreDiv>
                        <StyledPodcastImg
                            alt={`${title} podcast thumbnail`}
                            src={thumbnail}
                            width={300}
                            height={300}
                            loading="lazy"
                        />
                    </StyledCentreDiv>
                    <StyledDescriptionDiv>
                        <StyledDescriptionP>{stripHtml(description)}</StyledDescriptionP>
                    </StyledDescriptionDiv>
                    <StyledCountryP>
                        Country: {country}{' '}
                        <StyledFlagImg
                            alt={`${country} flag`}
                            code={findRegion(country)}
                            width={24}
                        />
                    </StyledCountryP>
                </StyledArticle>
            ))}
        </StyledPodcastsDiv>
    );
}

export default Podcasts;
